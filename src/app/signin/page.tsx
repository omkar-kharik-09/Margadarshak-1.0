"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.name);
      } else {
        await signIn(formData.email, formData.password);
      }
      router.push("/"); // Redirect to home page after successful auth
    } catch (err: any) {
      console.error("Authentication error:", err);
      
      // User-friendly error messages
      const errorCode = err.code;
      let errorMessage = "An error occurred during authentication";
      
      if (errorCode === "auth/invalid-credential" || errorCode === "auth/wrong-password") {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (errorCode === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up first.";
      } else if (errorCode === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists. Please sign in instead.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use at least 6 characters.";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "Invalid email address format.";
      } else if (errorCode === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    
    try {
      await signInWithGoogle();
      router.push("/"); // Redirect to home page after successful auth
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      
      // User-friendly error messages for Google sign-in
      const errorCode = err.code;
      let errorMessage = "An error occurred during Google sign-in";
      
      if (errorCode === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup was closed. Please try again.";
      } else if (errorCode === "auth/cancelled-popup-request") {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (errorCode === "auth/popup-blocked") {
        errorMessage = "Sign-in popup was blocked by your browser. Please allow popups for this site.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[640px]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
              {/* Toggle Tabs */}
              <div className="flex gap-2 mb-8 bg-[#f0f0f0] p-1 rounded-lg">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    !isSignUp
                      ? "bg-[#2563eb] text-white shadow-lg"
                      : "text-[#606060] hover:text-[#333333]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isSignUp
                      ? "bg-[#2563eb] text-white shadow-lg"
                      : "text-[#606060] hover:text-[#333333]"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-[#606060]">
                  {isSignUp
                    ? "Sign up to start your college journey"
                    : "Sign in to continue to your account"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <button 
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-[#d0d0d0] rounded-lg hover:bg-[#f5f5f5] hover:border-[#2563eb] transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#d0d0d0]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#606060]">Or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#d0d0d0] rounded-lg focus:border-[#2563eb] focus:outline-none transition-colors duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#d0d0d0] rounded-lg focus:border-[#2563eb] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#333333] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#d0d0d0] rounded-lg focus:border-[#2563eb] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {isSignUp && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#333333] mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#d0d0d0] rounded-lg focus:border-[#2563eb] focus:outline-none transition-colors duration-300"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#2563eb] border-[#d0d0d0] rounded focus:ring-[#2563eb]"
                      />
                      <span className="ml-2 text-sm text-[#606060]">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-[#2563eb] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                {isSignUp && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 mt-1 text-[#2563eb] border-[#d0d0d0] rounded focus:ring-[#2563eb]"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-[#606060]">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#2563eb] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#2563eb] hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
                </button>
              </form>

              {/* Footer Text */}
              <p className="mt-6 text-center text-sm text-[#606060]">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#2563eb] font-semibold hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
        </div>
      </main>
    </div>
  );
}

