"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FooterCTA() {
  const year = new Date().getFullYear();

  return (
    /* 🛠️ FIXED: position 'relative' aur 'w-full' lagaya taaki element upar na bhaage */
    <footer className="w-full relative bg-[#000000] text-white pt-24 pb-12 border-t border-white/5 overflow-hidden antialiased select-none block clear-both">
      
      {/* BACKGROUND DECK GLOW */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-white/[0.01] blur-[100px] rounded-full pointer-events-none" />

      {/* CTA SECTION */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-start justify-start w-full">

          {/* LEFT CARD - Classic Clean Balanced Look */}
          <div className="bg-white text-black rounded-3xl p-8 sm:p-10 shadow-2xl w-full max-w-xl text-left border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-black/[0.01] rounded-full translate-x-6 -translate-y-6 pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight leading-tight">
              Let’s get started.
            </h2>

            <p className="text-xs sm:text-sm mb-6 text-black/80 font-medium leading-relaxed">
              Grow your business with premium websites, custom apps, and intelligent digital marketing. We help startups and companies scale online with next-gen systems.
            </p>

            {/* Premium Black Button with Arrow Redirection */}
            <Link 
              href="/dashboard"
              className="group inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 transition-all active:scale-95 shadow-md"
            >
              Let's Chat
              <ArrowUpRight size={14} strokeWidth={3} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>

        </div>
      </div>

      {/* FOOTER LINKS */}
      <div className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        
        {/* Navigation row aligned left */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-neutral-500 text-xs font-black uppercase tracking-widest w-full md:w-auto text-left justify-start">
          <Link href="#home" className="hover:text-white transition-colors duration-150">Home</Link>
          <Link href="#about" className="hover:text-white transition-colors duration-150">About</Link>
          <Link href="#services" className="hover:text-white transition-colors duration-150">Services</Link>
          <Link href="/dashboard/digital-plans" className="hover:text-white transition-colors duration-150">Plans</Link>
          <Link href="#contact" className="hover:text-white transition-colors duration-150">Contact</Link>
        </div>

        {/* Technical Metadata copyright aligned right */}
        <div className="w-full md:w-auto text-left md:text-right shrink-0">
          <p className="text-neutral-600 text-[10px] font-medium tracking-wide">
            © {year} Stonenox IT Solutions. Lahre Brothers Venture.
          </p>
        </div>

      </div>

    </footer>
  );
}