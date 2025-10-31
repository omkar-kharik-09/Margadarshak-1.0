'use client';

import { useState, useEffect } from 'react';
import { CollegeComparator } from '@/components/CollegeComparator';
import { ComparisonResults } from '@/components/ComparisonResults';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/services/profileService';
import { UserProfile } from '@/types/profile';
import { UserCircle, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ComparatorPage() {
  const { user } = useAuth();
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    const userProfile = await ProfileService.getProfile(user.uid);
    setProfile(userProfile);
  };

  const handleComparison = (data: any) => {
    setComparisonData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                College Comparator
              </h1>
              <p className="text-muted-foreground text-lg">
                Compare 700+ Maharashtra colleges based on facilities, location, and more
              </p>
            </div>
            
            {user && (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-md transition-colors border border-border"
              >
                <Settings size={18} />
                <span className="hidden sm:inline">
                  {profile?.isProfileComplete ? 'Edit Profile' : 'Complete Profile'}
                </span>
              </Link>
            )}
          </div>

          {/* Profile Status Banner */}
          {user && !profile?.isProfileComplete && (
            <div className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <UserCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    Get Personalized Recommendations
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete your profile to see results tailored to your reservation category, budget, and preferences.
                  </p>
                  <Link
                    href="/profile"
                    className="inline-block mt-2 text-sm text-primary hover:underline"
                  >
                    Complete Profile →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {user && profile?.isProfileComplete && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <UserCircle className="text-green-600 dark:text-green-400" size={16} />
                <span className="text-green-800 dark:text-green-200">
                  Showing personalized results for <strong>{profile.reservationCategory}</strong> category
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-8">
          <CollegeComparator
            onComparisonComplete={handleComparison}
            onLoadingChange={handleLoadingChange}
            userProfile={profile}
          />

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {comparisonData && !isLoading && (
            <ComparisonResults data={comparisonData} />
          )}
        </div>
      </div>
    </div>
  );
}

