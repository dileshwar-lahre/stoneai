'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronDown } from 'lucide-react';

// --- FOUNDER DATA ---
const founder = {
  initials: "DL",
  name: "DILESHWAR LAHRE",
  role: "Founder & CEO",
  quote: "My mission is to empower businesses and startup founders in Chhattisgarh with global-scale technology.",
  bio: "Dileshwar is the visionary behind Stonenox. With a deep understanding of the digital ecosystem, he leads the agency's mission to transform ideas into scalable tech realities for emerging startups, focusing on innovation, security, and tangible business growth.",
  skills: ["App Development", "Web Development", "Cyber Security", "Strategic Planning", "Team Leadership"],
  image: "/images/ranu.png",
  socials: {
    instagram: "https://www.instagram.com/cg_rapper_0?igsh=ZDlmMDdxczJudzhu",
    linkedin: "https://www.linkedin.com/in/dileshwar-lahre-530039273",
    facebook: "https://www.facebook.com/share/17m8dR7miy/",
    twitter: "https://x.com/Ranubhai777"
  }
};

// --- ANIMATIONS ---
const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const titleWord = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
};

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const headingText = "STONENOX IS A DIGITAL MARKETING & IT SOLUTION COMPANY";
  const words = headingText.split(" ");
  const bgColors = ["#ea580c", "#d97706", "#16a34a"];

  return (
    <section className="bg-slate-50 font-sans selection:bg-orange-600 selection:text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        className="relative w-full py-28 md:py-40 text-center px-6 overflow-hidden"
        animate={{ backgroundColor: bgColors }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-black tracking-[0.3em] uppercase shadow-lg">
              About Us
            </span>
          </motion.div>

          <motion.h1 
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] uppercase flex flex-wrap justify-center gap-x-4 gap-y-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          >
            {words.map((word, idx) => (
              <motion.span key={idx} variants={titleWord} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-white/90 font-bold uppercase tracking-widest text-xs md:text-sm drop-shadow-md"
          >
            <span>Web</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>App</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>Cyber Security</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>SEO</span>
          </motion.div>

        </div>
      </motion.div>

      {/* --- LEADERSHIP / FOUNDER SECTION --- */}
      <div className="py-24 md:py-32 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="w-16 h-1 bg-slate-900 mb-4 rounded-full inline-block"></span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Leadership
            </h2>
          </div>

          {/* DESKTOP VIEW: Left Image, Right Text (Hidden on Mobile) */}
          <div className="hidden lg:grid bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden grid-cols-12 gap-12 p-12 lg:p-16 items-center max-w-7xl mx-auto">
            
            {/* Left Image Column */}
            <div className="col-span-5 w-full aspect-[4/5] relative bg-slate-100 rounded-2xl overflow-hidden group">
              {founder.image ? (
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white font-black text-6xl">
                  {founder.initials}
                </div>
              )}
            </div>

            {/* Right Content Column */}
            <div className="col-span-7 flex flex-col justify-center">
              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{founder.name}</h3>
                <p className="text-orange-600 font-bold text-sm uppercase tracking-[0.2em] mt-2">{founder.role}</p>
              </div>

              <div className="relative my-6 p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-600">
                <Quote size={20} className="text-orange-300 absolute top-4 right-4" />
                <p className="text-slate-700 font-semibold italic text-base leading-relaxed">
                  "{founder.quote}"
                </p>
              </div>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {founder.bio}
              </p>

              <div className="mb-8">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Core Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-700 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <a href={founder.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                  <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href={founder.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={founder.socials.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={founder.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                </a>
              </div>
            </div>

          </div>

          {/* MOBILE VIEW: Clean Image on top, Text & More dropdown below */}
          <div className="block lg:hidden bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden p-6">
            
            {/* Pure Clean Image (No text over it) */}
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-6 shadow-inner">
              {founder.image ? (
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover object-top" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white font-black text-6xl">
                  {founder.initials}
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-black text-slate-900 uppercase">{founder.name}</h3>
              <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mt-1">{founder.role}</p>
            </div>

            {/* Short Quote */}
            <p className="text-slate-600 text-sm italic text-center mb-6 px-2">
              "{founder.quote}"
            </p>

            {/* Read More Toggle Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-between transition-colors"
            >
              <span>{isExpanded ? "Show Less" : "Read More & Skills"}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            {/* Expandable Section */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-600 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-100">
                    {founder.bio}
                  </p>

                  <div className="mt-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Core Expertise</p>
                    <div className="flex flex-wrap gap-1.5">
                      {founder.skills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-50 rounded-md text-[11px] font-bold text-slate-700 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center gap-3 mt-6 pt-5 border-t border-slate-100">
              <a href={founder.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all">
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={founder.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={founder.socials.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white hover:border-transparent transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={founder.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </a>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}