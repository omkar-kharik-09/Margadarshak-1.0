'use client';

import { ProfileForm } from '@/components/ProfileForm';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import Link from 'next/link';

export default function ProfilePage() {
  const { loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-[#606060]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Navigation */}
      <nav className="bg-white border-b border-[#d0d0d0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#606060] flex items-center justify-center transition-all duration-300 group-hover:bg-[#2563eb] group-hover:rotate-6 group-hover:scale-110">
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-[#333333] transition-colors duration-300 group-hover:text-[#2563eb]">Margadarshak</span>
            </Link>

            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#1e40af] transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <ProfileForm />
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e0e0e0]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#e6f2ff] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
                Why do we need this information?
              </h3>
              <ul className="space-y-2.5 text-sm text-[#606060]">
                <li className="flex items-start gap-3">
                  <span className="text-[#2563eb] mt-1 flex-shrink-0">•</span>
                  <span><strong className="text-[#333333]">Reservation Category:</strong> Shows quota-specific cutoffs and seat availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2563eb] mt-1 flex-shrink-0">•</span>
                  <span><strong className="text-[#333333]">Budget:</strong> Filters colleges within your financial range</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2563eb] mt-1 flex-shrink-0">•</span>
                  <span><strong className="text-[#333333]">Location:</strong> Prioritizes colleges in your preferred cities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2563eb] mt-1 flex-shrink-0">•</span>
                  <span><strong className="text-[#333333]">Preferences:</strong> Personalizes recommendations based on your priorities</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-[#606060] italic bg-[#f9fafb] p-3 rounded-lg">
                🔒 Your data is securely stored and only used to improve your college recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

