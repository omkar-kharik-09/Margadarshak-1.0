"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

/**
 * User menu component with profile dropdown
 * Shows sign in/get started buttons when not authenticated
 * Shows profile menu with dropdown when authenticated
 */
export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show sign in/get started buttons when not authenticated
  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/signin" 
          className="relative text-[#333333] font-medium transition-all duration-300 hover:text-[#2563eb] hover:scale-110 group"
        >
          Sign In
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          href="/signin" 
          className="px-6 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#2563eb] hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95"
        >
          Get Started
        </Link>
      </div>
    );
  }

  // Get user initials for avatar
  const getInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  // Show profile dropdown when authenticated
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#f0f0f0] transition-all duration-300 group"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-semibold text-sm group-hover:scale-110 transition-transform">
          {getInitials()}
        </div>
        
        {/* User Name */}
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-[#333333]">
            {user.displayName || 'User'}
          </div>
          <div className="text-xs text-[#606060]">
            {user.email}
          </div>
        </div>

        {/* Chevron Icon */}
        <svg 
          className={`w-4 h-4 text-[#606060] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#d0d0d0] py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-[#d0d0d0]">
            <div className="font-semibold text-[#1a1a1a]">
              {user.displayName || 'User'}
            </div>
            <div className="text-sm text-[#606060] truncate">
              {user.email}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0f0f0] transition-colors"
            >
              <svg className="w-5 h-5 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[#333333] font-medium">My Profile</span>
            </Link>

            <Link
              href="/college-predictor"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0f0f0] transition-colors"
            >
              <svg className="w-5 h-5 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-[#333333] font-medium">College Predictor</span>
            </Link>

            <Link
              href="/comparator"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0f0f0] transition-colors"
            >
              <svg className="w-5 h-5 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="text-[#333333] font-medium">Compare Colleges</span>
            </Link>

            <Link
              href="/chatbot"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0f0f0] transition-colors"
            >
              <svg className="w-5 h-5 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-[#333333] font-medium">AI Counselor</span>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="border-t border-[#d0d0d0] pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-50 transition-colors text-left"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-red-600 font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

