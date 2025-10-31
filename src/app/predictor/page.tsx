'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PredictorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to college-predictor page
    router.replace('/college-predictor');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
        <p className="text-[#606060]">Redirecting to College Predictor...</p>
      </div>
    </div>
  );
}
