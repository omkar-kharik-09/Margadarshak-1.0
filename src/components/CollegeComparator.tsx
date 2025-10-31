'use client';

import { useState } from 'react';
import { Plus, X, GitCompare } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { ProfileService } from '@/services/profileService';
import { CollegeAutocomplete } from './CollegeAutocomplete';

interface CollegeComparatorProps {
  onComparisonComplete: (data: any) => void;
  onLoadingChange: (loading: boolean) => void;
  userProfile: UserProfile | null;
}

export function CollegeComparator({
  onComparisonComplete,
  onLoadingChange,
  userProfile,
}: CollegeComparatorProps) {
  const [colleges, setColleges] = useState<string[]>(['', '']);
  const [error, setError] = useState<string>('');

  const addCollege = () => {
    if (colleges.length < 5) {
      setColleges([...colleges, '']);
    }
  };

  const removeCollege = (index: number) => {
    if (colleges.length > 2) {
      const newColleges = colleges.filter((_, i) => i !== index);
      setColleges(newColleges);
    }
  };

  const updateCollege = (index: number, value: string) => {
    const newColleges = [...colleges];
    newColleges[index] = value;
    setColleges(newColleges);
    setError('');
  };

  const handleCompare = async () => {
    // Validate inputs
    const filledColleges = colleges.filter(c => c.trim() !== '');
    
    if (filledColleges.length < 2) {
      setError('Please enter at least 2 colleges to compare');
      return;
    }

    console.log('[DEBUG] Comparing colleges:', filledColleges);
    setError('');
    onLoadingChange(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      console.log('[DEBUG] API URL:', API_URL);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      const requestBody: any = {
        colleges: filledColleges,
      };

      // Add personalization factors if profile is complete
      if (userProfile?.isProfileComplete) {
        requestBody.personalization = ProfileService.getComparisonFactors(userProfile);
      }

      const response = await fetch(`${API_URL}/api/colleges/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      console.log('[DEBUG] Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        console.error('[ERROR] API error:', errorData);
        throw new Error(errorData.detail || 'Failed to compare colleges');
      }

      const data = await response.json();
      console.log('[DEBUG] Received data:', data);
      onComparisonComplete(data);
    } catch (err) {
      console.error('[ERROR] Comparison failed:', err);
      
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. The backend may be slow or not responding.');
      } else if (err instanceof TypeError) {
        setError('Cannot connect to backend. Make sure it is running on http://localhost:8000');
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to compare colleges. Check console for details.'
        );
      }
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Select Colleges to Compare
      </h2>
      
      <p className="text-sm text-muted-foreground mb-6">
        Start typing to see suggestions (e.g., "MIT", "VJTI", "Symbiosis")
      </p>

      <div className="space-y-4">
        {colleges.map((college, index) => (
          <div key={index} className="flex gap-3 items-center">
            <CollegeAutocomplete
              value={college}
              onChange={(value) => updateCollege(index, value)}
              placeholder={`Search college ${index + 1} (e.g., MIT, VJTI, Pune)`}
              index={index}
            />
            {colleges.length > 2 && (
              <button
                onClick={() => removeCollege(index)}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors flex-shrink-0"
                aria-label="Remove college"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}

        {colleges.length < 5 && (
          <button
            onClick={addCollege}
            className="flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md transition-colors"
          >
            <Plus size={20} />
            <span>Add another college (max 5)</span>
          </button>
        )}

        {error && (
          <div className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleCompare}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium shadow-sm"
        >
          <GitCompare size={20} />
          <span>Compare Colleges</span>
        </button>
      </div>
    </div>
  );
}

