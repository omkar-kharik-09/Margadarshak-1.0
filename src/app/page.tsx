"use client";

import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#d0d0d0]">
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

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="relative text-[#333333] font-medium transition-all duration-300 hover:text-[#2563eb] hover:scale-110 group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/college-predictor" className="relative text-[#333333] font-medium transition-all duration-300 hover:text-[#2563eb] hover:scale-110 group">
                College Predictor
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/comparator" className="relative text-[#333333] font-medium transition-all duration-300 hover:text-[#2563eb] hover:scale-110 group">
                Compare Colleges
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="https://career-compass-test1.web.app/" target="_blank" rel="noopener noreferrer" className="relative text-[#333333] font-medium transition-all duration-300 hover:text-[#2563eb] hover:scale-110 group">
                Career Compass
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/chatbot" className="relative text-[#333333] font-medium transition-all duration-300 hover:text-[#2563eb] hover:scale-110 group">
                AI Counselor
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex">
                <span className="px-4 py-2 bg-[#e6f2ff] text-[#2563eb] rounded-full text-sm font-medium">
                  Your MHT-CET College Predictor
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
                  Your Trusted{" "}
                  <span className="text-[#2563eb]">
                    Guide to Success..
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-xl text-[#606060] font-medium">
                Find Best Colleges for Your MHT-CET Rank
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/predict" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333333] transition-colors font-medium text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Predict Colleges
                </Link>
                <Link 
                  href="/comparator" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#333333] border-2 border-[#d0d0d0] rounded-lg hover:bg-[#f5f5f5] transition-colors font-medium text-lg"
                >
                  Compare Colleges
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-[#1a1a1a]">90%</div>
                  <div className="text-sm text-[#606060]">Positive Responses</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-[#1a1a1a]">500+</div>
                  <div className="text-sm text-[#606060]">Colleges Listed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-[#1a1a1a]">83-87%</div>
                  <div className="text-sm text-[#606060]">Accuracy Rate</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
                  src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"
                  alt="Modern college building at sunset"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Decorative blur effect */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6">
                Everything You Need to{" "}
                <span className="text-[#2563eb]">Choose Right College</span>
              </h2>
              <p className="text-lg text-[#606060]">
                Comprehensive tools and resources to help MHT-CET students make informed decisions about their college admissions and career path.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* College Predictor Card */}
              <div className="group p-8 bg-white border border-[#e0e0e0] rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-[#2563eb]">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-[#e6f2ff] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                  College Predictor
                </h3>
                <p className="text-[#606060] leading-relaxed">
                  Enter your MHT-CET rank and percentile to discover colleges you can get into based on previous year cutoffs and trends.
                </p>
              </div>

              {/* College Comparator Card */}
              <div className="group p-8 bg-white border border-[#e0e0e0] rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-[#2563eb]">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-[#e6f2ff] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                  College Comparator
                </h3>
                <p className="text-[#606060] leading-relaxed">
                  Compare multiple colleges side-by-side based on placements, infrastructure, faculty, fees, and other important parameters.
                </p>
              </div>

              {/* Career Compass Card */}
              <Link href="https://career-compass-test1.web.app/" target="_blank" rel="noopener noreferrer" className="group p-8 bg-white border border-[#e0e0e0] rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-[#2563eb] block">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-[#e6f2ff] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                  Career Compass
                </h3>
                <p className="text-[#606060] leading-relaxed">
                  Take our comprehensive aptitude test to understand your strengths and get personalized career guidance for your future.
                </p>
              </Link>

              {/* Query Chatbot Card */}
              <Link href="/chatbot" className="group p-8 bg-white border border-[#e0e0e0] rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-[#2563eb] block">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-[#e6f2ff] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                  AI Counselor
                </h3>
                <p className="text-[#606060] leading-relaxed">
                  Get instant answers to all your college-related queries through our intelligent AI counselor available 24/7.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-0 bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#a855f7] rounded-3xl overflow-hidden shadow-2xl">
              {/* Left Content */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to Find Your Perfect College?
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Enter your MHT-CET rank now and discover the best colleges matched to your profile. Start your journey towards your dream college today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/predict" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2563eb] rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
                  >
                    Start College Prediction
                  </Link>
                  <Link 
                    href="https://career-compass-test1.web.app/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg"
                  >
                    Take Career Compass
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative h-[400px] lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  alt="Student studying and planning college admission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 rounded-lg bg-[#2563eb] flex items-center justify-center transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <svg 
                    className="w-6 h-6 text-white" 
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
                <span className="text-xl font-semibold">Margadarshak</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your trusted guide to finding the perfect college. Helping MHT-CET students make informed decisions about their future.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link href="#" className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center hover:bg-[#2563eb] transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center hover:bg-[#2563eb] transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center hover:bg-[#2563eb] transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center hover:bg-[#2563eb] transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/college-predictor" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    College Predictor
                  </Link>
                </li>
                <li>
                  <Link href="/comparator" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Compare Colleges
                  </Link>
                </li>
                <li>
                  <Link href="https://career-compass-test1.web.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Career Compass
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/colleges" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    College Database
                  </Link>
                </li>
                <li>
                  <Link href="/cutoffs" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Previous Cutoffs
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-4"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@margadarshak.com
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 123-456-7890
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Margadarshak. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/sitemap" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 text-sm">
                  Sitemap
                </Link>
                <Link href="/accessibility" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 text-sm">
                  Accessibility
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-[#2563eb] transition-colors duration-300 text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
