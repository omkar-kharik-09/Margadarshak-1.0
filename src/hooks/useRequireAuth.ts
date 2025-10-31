"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Custom hook to protect routes that require authentication
 * Usage: Add `useRequireAuth()` at the top of any page component that requires authentication
 * 
 * Example:
 * ```tsx
 * export default function ProtectedPage() {
 *   useRequireAuth();
 *   // ... rest of your component
 * }
 * ```
 */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  return { user, loading };
}

