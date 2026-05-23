"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiArrowRight, FiGrid, FiArrowLeft } from "react-icons/fi";
import { FcGoogle as GoogleIcon } from "react-google-button"; // Google brand icon

export default function AbsoluteLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Agle step mein NextAuth provider yahan seedha link karenge [cite: 463]
    console.log("Submitting:", email, password);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Subtle Background 3D Dot Grid for Premium Look [cite: 255] */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 z-0" />

      {/* Back to Home Text Link */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
          <FiArrowLeft size={14} /> Back to Dashboard
        </Link>
      </div>

      {/* Floating Design Component Card [cite: 475] */}
      <div className="w-full max-w-md bg-white border border-gray-100 p-10 rounded-[2.5rem] 
        shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] 
        transition-all duration-500 relative z-10">
        
        {/* Brand Identity Branding Header [cite: 485] */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-md shadow-blue-100">
            <FiGrid size={24} />
          </div>
          <h2 className="text-2xl font-[1000] text-black tracking-tighter uppercase">Stonenox CRM_</h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Scale Your Legacy</p>
        </div>

        {/* MANUAL LOGIN FORM CREDENTIALS [cite: 466, 482] */}
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bhai@example.com" 
                required
                className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white px-11 py-3.5 rounded-xl text-sm font-medium text-black outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white px-11 py-3.5 rounded-xl text-sm font-medium text-black outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-6 shadow-md"
          >
            {loading ? "Verifying..." : "Continue"} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* DIVIDER ACCORDING TO BRAND SYSTEM */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-100" />
          <span className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-wider">OR</span>
          <div className="flex-1 h-[1px] bg-gray-100" />
        </div>

        {/* GOOGLE OAUTH COMPONENT BUTTON [cite: 466, 482] */}
        <button 
          type="button"
          onClick={() => console.log("Google OAuth Clicked")}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.6 14.97 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3c.9-2.7 3.4-4.66 6.64-4.66z"/>
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.57l3.73 2.9c2.19-2.02 3.7-5 3.7-8.62z"/>
            <path fill="#FBBC05" d="M5.36 14.5c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.5 6.9C.54 8.82 0 10.95 0 13.2s.54 4.38 1.5 6.3l3.86-3z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.73-2.9c-1.1.74-2.52 1.18-4.23 1.18-3.24 0-5.74-1.96-6.64-4.66L1.5 16.7C3.4 20.35 7.35 23 12 23z"/>
          </svg>
          Sign In with Google
        </button>

      </div>
    </div>
  );
}