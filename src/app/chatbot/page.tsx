'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI College Counselor. I can help you with:\n\n• College selection and comparison\n• MHT-CET cutoff information\n• Admission procedures and eligibility\n• Reservation categories and quotas\n• Course details and career guidance\n• Scholarship information\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          history: messages.slice(-6), // Send last 6 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to explore the College Comparator feature for detailed college information.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What's the cutoff for VJTI?",
    "Tell me about reservation quotas",
    "Compare government vs private colleges",
    "How do I apply for MHT-CET?",
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bot className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">AI College Counselor</h1>
              <p className="text-muted-foreground">
                Get instant answers to your college and admission queries
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="flex-1">
                  <div className="inline-block rounded-lg px-4 py-3 bg-secondary">
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 bg-secondary/30 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-3">
                Quick Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border bg-card"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about colleges, admissions, or careers..."
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={20} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-primary" size={20} />
              <h3 className="font-semibold text-foreground">AI-Powered</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Get instant, intelligent responses to all your college-related questions
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="text-primary" size={20} />
              <h3 className="font-semibold text-foreground">24/7 Available</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Available anytime to help with admissions, courses, and career guidance
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Also Try</h3>
            <Link
              href="/comparator"
              className="text-sm text-primary hover:underline"
            >
              College Comparator →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

