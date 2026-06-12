"use client";

import { useState } from "react";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import SupportChat from "./chat/SupportChat";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  // --- Framer Motion Animation Variants ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">

      {/* 1. DESKTOP SOCIAL BAR */}
      <div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-10 md:flex">
        <FaLinkedinIn className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-cyan-400" />
        <FaTwitter className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-cyan-400" />
        <FaInstagram className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-pink-500" />
        <FaFacebookF className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-blue-500" />
        <div className="h-24 w-[1px] bg-white/30" />
      </div>

      {/* 2. MOBILE SOCIAL BAR */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute right-[30px] top-[32%] -translate-y-1/2 z-30 flex flex-col items-center gap-6 md:hidden"
      >
        <FaLinkedinIn className="text-[26px] text-white/80 hover:text-cyan-400 transition" />
        <FaTwitter className="text-[26px] text-white/80 hover:text-cyan-400 transition" />
        <FaInstagram className="text-[26px] text-white/80 hover:text-pink-500 transition" />
        <FaFacebookF className="text-[26px] text-white/80 hover:text-blue-500 transition" />
      </motion.div>

      {/* 3. TOP RIGHT ACTION ACCENT */}
      <div className="absolute right-6 top-6 z-30 flex items-center gap-6">
        <Link href="/dashboard" className="text-lg font-medium text-white transition hover:text-cyan-400 hidden sm:block">
          Let’s Start
        </Link>
        <div className="flex cursor-pointer flex-col gap-1 group">
          <span className="h-[2px] w-8 bg-white group-hover:bg-cyan-400 transition" />
          <span className="h-[2px] w-8 bg-white group-hover:bg-cyan-400 transition" />
          <span className="h-[2px] w-8 bg-white group-hover:bg-cyan-400 transition" />
        </div>
      </div>

      {/* 4. DESKTOP MODEL */}
      <div className="absolute right-[2%] top-[58%] -translate-y-1/2 z-20 hidden md:flex h-[750px] w-[750px] max-w-[45vw] items-center justify-center overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <div className="absolute right-16 top-36 z-50 animate-pulse pointer-events-none">
            <span className="rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-sm tracking-wide text-cyan-300 backdrop-blur-xl">
              any qna • double click
            </span>
          </div>
          {/* Double Click Interaction Core */}
          <div
            onDoubleClick={() => setChatOpen(true)}
            className="absolute inset-0 z-40 cursor-pointer"
          />
          <Spline
            scene="https://prod.spline.design/wp1uEIxK9qdr8hip/scene.splinecode"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* 5. MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex flex-col md:flex-row min-h-screen max-w-7xl px-6 md:px-10">

        {/* MOBILE MODEL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 0.95 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full flex justify-center items-center mt-10 md:hidden relative z-0 pointer-events-none"
        >
          <div className="w-[500px] h-[450px] shrink-0 relative flex justify-center items-center translate-x-[7%] pointer-events-auto">
            <Spline
              scene="https://prod.spline.design/wp1uEIxK9qdr8hip/scene.splinecode"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </motion.div>

        {/* CONTENT BLOCK WITH STAGGERED ANIMATIONS */}
        <section className="w-full max-w-2xl flex flex-col pt-0 pb-20 md:pb-0 md:pt-24 min-h-[40vh] md:min-h-screen text-left md:justify-center">
          
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show" 
            className="w-full"
          >
            {/* TAG */}
            <motion.div variants={fadeUp} className="mb-4 flex items-center justify-start gap-3">
              <div className="h-[2px] w-8 bg-cyan-400" />
              <span className="text-sm font-bold text-cyan-400 tracking-widest uppercase">
                Innovation
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h1 variants={fadeUp} className="text-[40px] font-extrabold leading-[1.15] sm:text-5xl md:text-7xl tracking-tight text-left">
              Scale Your <br />
              <span className="font-light text-white block mt-1 md:inline md:mt-0">
                Business Digitally.
              </span>
            </motion.h1>

            {/* PARAGRAPH - MOBILE */}
            <motion.p variants={fadeUp} className="mt-4 max-w-[90%] text-[15px] leading-6 text-gray-400 text-left md:hidden">
              Grow your brand faster with AI and modern digital systems.
            </motion.p>

            {/* PARAGRAPH - DESKTOP */}
            <motion.p variants={fadeUp} className="hidden md:block mt-6 max-w-xl text-base leading-7 text-gray-300 md:mt-8 md:text-lg md:leading-8 text-left">
              Stonenox AI helps brands grow faster with intelligent automation,
              creative digital experiences, and high-performing marketing
              systems built for modern businesses.
            </motion.p>

            {/* START BUILDING BUTTON LINKED TO DASHBOARD */}
            <motion.div variants={fadeUp} className="mt-8 flex justify-center md:justify-start w-full">
              <Link href="/dashboard" className="outline-none group flex items-center justify-between w-[220px] md:w-auto gap-4 rounded-full bg-white/10 p-1.5 pr-6 md:px-5 md:py-4 backdrop-blur-md transition duration-300 hover:bg-white/20 active:scale-98 border border-white/5 hover:border-white/20">
                <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45 shrink-0">
                  <ArrowUpRight size={24} strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg font-bold text-white mx-auto md:mx-0">
                  Start Building
                </span>
              </Link>
            </motion.div>

          </motion.div>
        </section>

      </div>

      {/* 📱 COMPACT MOBILE FLOATING AI BUTTON - REDUCED SIZE WITH TRIGGERS */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setChatOpen(true)}
          className="h-12 w-12 rounded-full bg-white text-black font-black border border-white/10 flex items-center justify-center text-xs shadow-[0_8px_24px_rgba(255,255,255,0.12)] active:scale-90 transition-all outline-none"
          aria-label="Open AI Chatbot"
        >
          AI
        </button>
      </div>

      {/* SECURE SUPPORT CHAT POPUP LAYOUT */}
      {chatOpen && (
        <SupportChat onClose={() => setChatOpen(false)} />
      )}

    </main>
  );
}