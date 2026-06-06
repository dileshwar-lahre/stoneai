'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, ChevronDown, Code, Shield, Globe, TrendingUp
} from 'lucide-react';

// --- FOUNDERS DATA ---
const founders = [
  {
    initials: "DL",
    name: "DILESHWAR LAHRE",
    role: "Founder & Managing Director",
    quote: "My mission is to empower businesses and startup founders in Chhattisgarh with global-scale technology.",
    bio: "Dileshwar is the visionary behind Stonenox. With a deep understanding of the digital ecosystem, he leads the agency's mission to transform ideas into scalable tech realities for emerging startups.",
    skills: ["App Development", "Web Development", "Cyber Security"],
    image: "/images/ranu.png",
    socials: {
      instagram: "https://www.instagram.com/cg_rapper_0?igsh=ZDlmMDdxczJudzhu",
      linkedin: "https://www.linkedin.com/in/dileshwar-lahre-530039273",
      facebook: "https://www.facebook.com/share/17m8dR7miy/"
    }
  },
  {
    initials: "AL",
    name: "ADITYA LAHRE",
    role: "Founder & Technical Director",
    quote: "Flawless code, unbreakable security, and next-gen innovation define our standard of work.",
    bio: "The tech mastermind of the Lahre Brothers. Aditya ensures that every application, website, and digital infrastructure built by Stonenox meets world-class quality and security benchmarks.",
    skills: ["App Architecture", "Web Development", "Cyber Security"],
    image: "/images/aditya.png",
    socials: {
      instagram: "https://www.instagram.com/aditya__lahre?igsh=cWxkMmswMzJlZzA0",
      linkedin: "https://www.linkedin.com/in/aditya-lahre-742516261",
      facebook: "https://www.facebook.com/share/1EryfHw3LF/"
    }
  },
  {
    initials: "AM",
    name: "AMIT LAHRE",
    role: "Founder & Sales Director",
    quote: "Every business has unique needs, and we deliver bespoke solutions that drive tangible growth.",
    bio: "Amit drives business expansion and client relationships. He specializes in understanding market needs and mapping them with Stonenox's high-end digital marketing and IT solutions.",
    skills: ["B2B Sales", "Client Relations", "Digital Strategy"],
    image: "/images/amit.png",
    socials: {
      instagram: "https://www.instagram.com/amit_lahre.28?igsh=MWpoY3JmbWR0dHlsNg==",
      linkedin: "https://www.linkedin.com/in/amit-lahre-2194202b0",
      facebook: "https://www.facebook.com/share/17m8dR7miy/"
    }
  }
];

// --- ANIMATIONS ---
const slideVariants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 30 } },
  exit: { x: -100, opacity: 0, transition: { duration: 0.5 } }
};

// Word-by-word animation for Main Title
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play Logic for Mobile
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Main Heading Text
  const headingText = "STONENOX IS A DIGITAL MARKETING & IT SOLUTION COMPANY";
  const words = headingText.split(" ");

  // Colors for the dynamic background animation
  const bgColors = ["#ea580c", "#d97706", "#16a34a"]; // Tailwind Orange-600, Amber-600, Green-600

  return (
    <section className="bg-slate-50 font-sans selection:bg-black selection:text-white overflow-hidden">
      
      {/* --- MOODY DYNAMIC COLOR HERO SECTION --- */}
      <motion.div 
        className="relative w-full py-28 md:py-40 text-center px-6 overflow-hidden"
        // Applying the dynamic background color animation
        animate={{ backgroundColor: bgColors }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        
        {/* Abstract Background Elements for Premium Look */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Badge: About Us */}
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

          {/* H1 Title with Mast Animation (Word by Word) and subtle dynamic text shadow */}
          <motion.h1 
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] uppercase flex flex-wrap justify-center gap-x-4 gap-y-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          >
            {words.map((word, idx) => (
              <motion.span key={idx} variants={titleWord} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Short & Crisp Services Tags */}
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
            <span>Meta Ads</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>SEO</span>
          </motion.div>

        </div>
      </motion.div>

      {/* --- FOUNDERS SECTION --- */}
      <div className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          
          {/* Lahre Brothers Heading (Ek Line Bas) */}
          <div className="text-center mb-16 flex flex-col items-center">
            {/* Darker line to match the transition away from specific brand colors */}
            <span className="w-16 h-1 bg-slate-800 mb-6 rounded-full"></span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Lahre Brothers
            </h2>
          </div>
          
          {/* DESKTOP VIEW: Grid of 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {founders.map((founder, idx) => (
              <FounderCard 
                key={`desktop-${idx}`}
                founder={founder}
                setGlobalPause={() => {}} 
              />
            ))}
          </div>

          {/* MOBILE VIEW: Auto-Playing Slider */}
          <div className="block md:hidden relative w-full overflow-hidden pb-12">
            <div className="relative h-auto min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full absolute top-0 left-0"
                >
                  <FounderCard 
                    founder={founders[currentIndex]} 
                    setGlobalPause={setIsPaused} 
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots for Mobile Slider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 mt-8">
              {founders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-8 bg-slate-800" : "w-2 bg-slate-200"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

// --- FOUNDER CARD COMPONENT ---
function FounderCard({ founder, setGlobalPause }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (setGlobalPause) {
      setGlobalPause(newState); 
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-slate-300 group h-full">
      
      {/* 1. IMAGE SECTION */}
      <div className="w-full aspect-[4/5] relative bg-slate-100 overflow-hidden">
        {founder.image ? (
          <img 
            src={founder.image} 
            alt={founder.name} 
            className="w-full h-full object-cover object-top transition-all duration-700 hover:scale-105 filter grayscale group-hover:grayscale-0" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700 font-black text-6xl">
            {founder.initials}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-wide">{founder.name}</h3>
          <p className="text-slate-300 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2">{founder.role}</p>
        </div>
      </div>

      {/* 2. TEXT CONTENT */}
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
        
        <div className="relative mb-6 pb-2 border-b border-slate-50">
          <Quote size={20} className="text-slate-200 absolute -top-2 -left-2 transform -scale-x-100" />
          <p className="text-slate-600 font-medium italic text-sm leading-relaxed pl-5 z-10 relative">
            "{founder.quote}"
          </p>
        </div>

        <div className="flex-grow"></div>

        {/* 3. LEARN MORE & TECH PROFILE */}
        <div className="mt-2 pt-6 border-t border-slate-100">
          <button 
            onClick={handleToggle}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-slate-600 transition-colors w-full justify-between group/btn outline-none"
          >
            <span>{isOpen ? "Close Profile" : "View Tech Profile"}</span>
            <div className={`p-2 rounded-full border border-slate-200 group-hover/btn:border-slate-500 group-hover/btn:bg-slate-50 transition-all ${isOpen ? 'rotate-180 bg-slate-900 text-white border-slate-900' : ''}`}>
               <ChevronDown size={14} />
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-slate-500 text-sm leading-relaxed mt-6">
                  {founder.bio}
                </p>

                {/* TECH SKILLS */}
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Core Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-md text-[10px] md:text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        {skill.includes("Web") && <Globe size={12} className="text-slate-500" />}
                        {skill.includes("App") && <Code size={12} className="text-slate-500" />}
                        {skill.includes("Security") && <Shield size={12} className="text-slate-500" />}
                        {skill.includes("Sales") && <TrendingUp size={12} className="text-slate-500" />}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SOCIAL MEDIA - 🛠️ Fixed to Custom SVG Icons */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-dashed border-slate-200">
                  
                  {/* Instagram Custom SVG */}
                  <a href={founder.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  {/* Linkedin Custom SVG */}
                  <a href={founder.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all duration-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* Facebook Custom SVG */}
                  <a href={founder.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all duration-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                    </svg>
                  </a>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}