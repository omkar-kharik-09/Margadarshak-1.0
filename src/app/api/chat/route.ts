import { NextRequest, NextResponse } from 'next/server';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// College counselor system prompt
const SYSTEM_PROMPT = `You are an AI College Counselor for Margadarshak, a college guidance platform for MHT-CET students in Maharashtra, India.

Your expertise includes:
- Maharashtra colleges (700+ colleges including VJTI, MIT, COEP, VNIT, etc.)
- MHT-CET admission process and cutoffs
- Reservation categories (General, OBC, SC, ST, EWS, NT-A/B/C/D, VJ-A, SBC, SEBC)
- Government vs Private colleges
- Fees, facilities, placements
- Course selection and career guidance
- Scholarship and financial aid

Guidelines:
1. Be helpful, friendly, and informative
2. Provide accurate information about Maharashtra colleges
3. Mention specific college names when relevant (VJTI, MIT, COEP, etc.)
4. Explain reservation quotas clearly
5. Suggest using the College Comparator feature for detailed comparisons
6. Keep responses concise but informative (2-4 paragraphs max)
7. If you don't know something, admit it and suggest alternatives

Current context: You're helping students choose the right college for their MHT-CET rank and preferences.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Free API fallback responses for common questions
const FALLBACK_RESPONSES: Record<string, string> = {
  'cutoff': "MHT-CET cutoffs vary by college, branch, and category. Top colleges like VJTI, COEP, and MIT typically have cutoffs in the range of 500-5000 ranks for open category students. Government colleges generally have lower cutoffs than private ones. For personalized cutoff information, I recommend using our College Comparator to see detailed data for specific colleges.",
  
  'reservation': "Maharashtra follows reservation policies with SC (13%), ST (7%), VJDT (3%), NT (3.5%), OBC/SEBC (19%), and EWS (10%) quotas. Additionally, there's a 50% reservation for students with Maharashtra domicile. Each category has separate cutoffs, typically lower than the open category. Reserved category students also get fee concessions in government colleges.",
  
  'government': "Government colleges like VJTI, COEP, VNIT, and Government College of Engineering offer excellent education at lower fees (₹80,000-₹2L annually). Benefits include: lower fees, better ROI, strong alumni network, good placements, and reservation benefits. Private colleges like MIT, Vishwakarma, and Symbiosis offer modern infrastructure, industry connections, but have higher fees (₹3-10L annually).",
  
  'admission': "MHT-CET admission process: 1) Register for MHT-CET exam, 2) Take the exam (PCM/PCB), 3) Check results and calculate percentile, 4) Participate in CAP rounds (Centralized Admission Process), 5) Fill choice form with preferred colleges, 6) Document verification, 7) Seat allotment, 8) Accept seat and pay fees. Important: Keep all certificates ready (Domicile, Caste, Income, etc.).",
  
  'vjti': "VJTI (Veermata Jijabai Technological Institute) is one of Mumbai's premier government engineering colleges. Key features: Established 1887, Government college with low fees (₹80K/year), Strong placements (average 8-12 LPA), Top branches: Computer, IT, Electronics. Typical cutoff: 500-3000 rank for Computer Science (Open category). Great ROI and strong alumni network. Use our College Comparator to compare VJTI with other colleges!",
  
  'mit': "MIT College of Engineering, Pune is a top private college. Features: Established 1983, Private college (₹3.5-4L/year), Excellent infrastructure and facilities, Good placements (average 6-8 LPA), Strong industry connections. Popular branches: Computer, IT, Mechanical, Electronics. Cutoff ranges from 5000-20000 depending on branch and category.",
  
  'scholarship': "Scholarships available: 1) Post-Matric Scholarship for SC/ST/OBC students (income < ₹8L), 2) EBC Scholarship for economically backward students, 3) Minority scholarships, 4) Merit-based college scholarships, 5) National Scholarships Portal (NSP) schemes, 6) State government schemes. Most government colleges also offer fee waivers for reserved categories.",
  
  'career': "Popular engineering career paths: 1) Software Engineering (highest demand, 5-15 LPA), 2) Data Science/AI/ML (growing field, 6-20 LPA), 3) Core Engineering (Mechanical, Civil, Electrical, 4-8 LPA), 4) Higher studies (M.Tech/MBA/MS abroad), 5) Government jobs (GATE/PSU/ESE), 6) Entrepreneurship. Consider your interests, aptitude, and market demand when choosing.",
};

async function getHuggingFaceResponse(messages: Message[]): Promise<string> {
  if (!HUGGINGFACE_API_KEY) {
    console.log('[Chatbot] No Hugging Face API key found, using fallback');
    return getFallbackResponse(messages[messages.length - 1].content);
  }

  try {
    console.log('[Chatbot] Calling Hugging Face API...');
    
    // Use Google's FLAN-T5 - reliable and fast on free tier
    const userMessage = messages[messages.length - 1].content;
    const promptText = `You are a helpful college counselor for Maharashtra students. Answer this question concisely:\n\nQuestion: ${userMessage}\n\nAnswer:`;
    
    const response = await fetch(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: promptText,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chatbot] Hugging Face API error:', response.status, errorText);
      
      // Model might be loading - check the error
      if (errorText.includes('loading') || errorText.includes('currently loading')) {
        console.log('[Chatbot] Model is loading, using fallback for now');
      }
      
      return getFallbackResponse(messages[messages.length - 1].content);
    }

    const data = await response.json();
    console.log('[Chatbot] Hugging Face API success');
    
    // Handle different response formats
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    } else if (data.generated_text) {
      return data.generated_text;
    } else if (typeof data === 'string') {
      return data;
    }
    
    console.log('[Chatbot] Unexpected response format, using fallback');
    return getFallbackResponse(messages[messages.length - 1].content);
  } catch (error) {
    console.error('[Chatbot] Hugging Face API error:', error);
    return getFallbackResponse(messages[messages.length - 1].content);
  }
}

async function getGeminiResponse(messages: Message[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.log('[Chatbot] No Gemini API key found, using fallback');
    return getFallbackResponse(messages[messages.length - 1].content);
  }

  try {
    console.log('[Chatbot] Calling Gemini API with new key...');
    
    // Build conversation context
    const userMessage = messages[messages.length - 1].content;
    const conversationHistory = messages.slice(-6).map(m => 
      `${m.role === 'user' ? 'Student' : 'Counselor'}: ${m.content}`
    ).join('\n\n');
    
    // Try multiple model versions for compatibility
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro',
    ];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`[Chatbot] Trying model: ${modelName}`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${SYSTEM_PROMPT}\n\nConversation History:\n${conversationHistory}\n\nProvide a helpful, detailed response to the student's question (2-4 paragraphs). Be specific about colleges, cutoffs, and procedures when relevant.`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
                topP: 0.95,
                topK: 40,
              },
              safetySettings: [
                {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_NONE"
                },
                {
                  category: "HARM_CATEGORY_HATE_SPEECH",
                  threshold: "BLOCK_NONE"
                },
                {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_NONE"
                },
                {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_NONE"
                }
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`[Chatbot] ✅ ${modelName} API success!`);
          
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return generatedText;
          }
        } else {
          const errorText = await response.text();
          console.log(`[Chatbot] ❌ ${modelName} failed:`, response.status);
          // Try next model
          continue;
        }
      } catch (modelError) {
        console.log(`[Chatbot] ❌ ${modelName} error, trying next...`);
        continue;
      }
    }
    
    // If all models failed, use fallback
    console.log('[Chatbot] All Gemini models failed, using fallback');
    return getFallbackResponse(messages[messages.length - 1].content);
    
  } catch (error) {
    console.error('[Chatbot] Gemini API error:', error);
    return getFallbackResponse(messages[messages.length - 1].content);
  }
}

function buildPrompt(messages: Message[]): string {
  let prompt = SYSTEM_PROMPT + '\n\n';
  
  messages.forEach((msg) => {
    if (msg.role === 'user') {
      prompt += `User: ${msg.content}\n`;
    } else {
      prompt += `Assistant: ${msg.content}\n`;
    }
  });
  
  prompt += 'Assistant: ';
  return prompt;
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for keywords and return appropriate response
  for (const [keyword, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Default response
  return `Thank you for your question! I can help you with:

• College comparisons and recommendations
• MHT-CET cutoffs and admission procedures
• Information about top colleges (VJTI, MIT, COEP, VNIT, etc.)
• Reservation categories and quotas
• Career guidance and course selection

For detailed college comparisons, I recommend using our College Comparator feature where you can compare fees, facilities, placements, and more across 700+ Maharashtra colleges.

Could you please be more specific about what you'd like to know? For example:
- "What's the cutoff for Computer Science at VJTI?"
- "Tell me about OBC reservation quotas"
- "Compare government and private colleges"`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Build message history
    const messages: Message[] = [
      ...(history || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    // Log which API we're using
    console.log('[Chatbot] API Status:', {
      hasGemini: !!GEMINI_API_KEY,
      hasHuggingFace: !!HUGGINGFACE_API_KEY,
      huggingFaceKeyPrefix: HUGGINGFACE_API_KEY ? HUGGINGFACE_API_KEY.substring(0, 6) + '...' : 'none'
    });

    // Try Gemini first (better quality), then Hugging Face, then fallback
    let response: string;
    
    if (GEMINI_API_KEY) {
      console.log('[Chatbot] Using Gemini API');
      response = await getGeminiResponse(messages);
    } else if (HUGGINGFACE_API_KEY) {
      console.log('[Chatbot] Using Hugging Face API');
      response = await getHuggingFaceResponse(messages);
    } else {
      console.log('[Chatbot] Using fallback responses (no API keys configured)');
      response = getFallbackResponse(message);
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('[Chatbot] Chat API error:', error);
    return NextResponse.json(
      { 
        response: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment, or use our College Comparator feature for detailed college information." 
      },
      { status: 200 } // Return 200 with error message to keep chat flowing
    );
  }
}

