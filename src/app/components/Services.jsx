'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Smartphone, Megaphone, TrendingUp, PenTool, ArrowUpRight, Sparkles 
} from 'lucide-react';

// --- SERVICES DATA ---
const servicesData = [
  {
    id: "01",
    title: "Web Development",
    short: "High-Performance Websites",
    desc: "We build lightning-fast, secure, and scalable web platforms. From corporate sites to complex e-commerce ecosystems, we engineer digital experiences that convert.",
    tags: ["React", "Next.js", "E-Commerce", "Custom Web"],
    icon: <Globe size={36} strokeWidth={1.5} />,
    bgGradient: "from-blue-600 to-indigo-900",
    shadow: "hover:shadow-[0_20px_60px_rgba(37,99,235,0.3)]",
    colSpan: "lg:col-span-2" 
  },
  {
    id: "02",
    title: "App Development",
    short: "iOS & Android Apps",
    desc: "Transform your ideas into powerful, native, and cross-platform mobile applications designed to dominate the app stores.",
    tags: ["iOS", "Android", "React Native"],
    icon: <Smartphone size={36} strokeWidth={1.5} />,
    bgGradient: "from-orange-500 to-red-700",
    shadow: "hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)]",
    colSpan: "lg:col-span-1"
  },
  {
    id: "03",
    title: "Meta & Google Ads",
    short: "Performance Marketing",
    desc: "Stop wasting ad spend. We create data-driven, hyper-targeted campaigns that maximize ROI and flood your business with leads.",
    tags: ["Facebook Ads", "Google PPC"],
    icon: <Megaphone size={36} strokeWidth={1.5} />,
    bgGradient: "from-purple-600 to-violet-900",
    shadow: "hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)]",
    colSpan: "lg:col-span-1"
  },
  {
    id: "04",
    title: "SEO Mastery",
    short: "Rank #1 on Google",
    desc: "Dominate search engine results. Through technical SEO and strategic content planning, we ensure customers find you first.",
    tags: ["Technical SEO", "Backlinks"],
    icon: <TrendingUp size={36} strokeWidth={1.5} />,
    bgGradient: "from-emerald-500 to-teal-800",
    shadow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)]",
    colSpan: "lg:col-span-1"
  },
  {
    id: "05",
    title: "Logo & Branding",
    short: "Brand Identity",
    desc: "Your brand is your empire's face. We craft unforgettable logos and complete visual identities that leave a lasting legacy.",
    tags: ["Logo Design", "UI/UX", "Posters"],
    icon: <PenTool size={36} strokeWidth={1.5} />,
    bgGradient: "from-rose-500 to-pink-800",
    shadow: "hover:shadow-[0_20px_60px_rgba(225,29,72,0.3)]",
    colSpan: "lg:col-span-1"
  }
];

// --- ANIMATION VARIANTS ---
const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 } 
  }
};

const titleLetter = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 15, stiffness: 120 } }
};

const subTagsVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 1.2, duration: 0.8, ease: "easeOut" } }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

export default function Services() {
  const headingText = "DIGITAL SOLUTIONS THAT SCALE YOUR EMPIRE";
  const bgColors = ["#ea580c", "#d97706", "#16a34a"];

  return (
    <section id="services" className="bg-slate-50 font-sans selection:bg-zinc-900 selection:text-white overflow-hidden">
      
      {/* --- MOODY DYNAMIC COLOR HERO SECTION --- */}
      <motion.div 
        className="relative w-full py-28 md:py-40 text-center px-6 overflow-hidden flex flex-col items-center"
        animate={{ backgroundColor: bgColors }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] mix-blend-overlay animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] mix-blend-multiply"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-black tracking-[0.3em] uppercase shadow-lg flex items-center gap-2">
              <Sparkles size={14} /> Our Services
            </span>
          </motion.div>

          <motion.h1 
            variants={titleContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] uppercase flex flex-wrap justify-center gap-x-2 gap-y-1 perspective"
          >
            {headingText.split("").map((letter, idx) => (
              <motion.span 
                key={idx} 
                variants={titleLetter} 
                className={`inline-block origin-bottom drop-shadow-md ${letter === " " ? "w-3 md:w-5" : ""}`}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            variants={subTagsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-white/95 font-black uppercase tracking-[0.2em] text-[10px] md:text-sm pt-4 drop-shadow-lg"
          >
            <span>Web</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>App</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>Meta Ads</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>SEO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>Logo & Poster</span>
          </motion.div>
        </div>
      </motion.div>

      {/* --- BENTO GRID CARDS SECTION --- */}
      <div className="py-24 bg-slate-50 relative">
        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          
          <div className="text-left md:text-center mb-16 flex flex-col md:items-center">
            <span className="w-16 h-1 bg-zinc-900 mb-6 rounded-full hidden md:block"></span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
              What We Do Best
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto tracking-wide text-sm md:text-base leading-relaxed">
              We provide end-to-end digital solutions tailored for startups and visionary founders. Click on any service to start building your digital empire.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesData.map((service, idx) => (
              <ServiceCard 
                key={idx}
                service={service}
                delay={idx * 0.1}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}

// --- DETAILED SERVICE CARD (Now Clickable with WhatsApp redirect) ---
function ServiceCard({ service, delay }) {
  
  // WhatsApp Link Generation
  // 91 (Country Code) + 9131460470 (Your Number)
  const phoneNumber = "919131460470"; 
  const defaultMessage = `Hello Lahre Brothers! I am interested in your *${service.title}* service. Can we discuss this?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <motion.a 
      href={whatsappUrl}
      target="_blank" // Opens WhatsApp in a new tab
      rel="noopener noreferrer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUpVariants}
      transition={{ delay: delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-500 overflow-hidden group cursor-pointer ${service.shadow} ${service.colSpan} bg-gradient-to-br ${service.bgGradient}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className={`text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
          {service.icon}
        </div>
        
        {/* Call to action arrow */}
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-transparent shadow-lg">
          <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-3 text-white/60">
          {service.short}
        </p>
        
        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tighter mb-5">
          {service.title}
        </h3>
        
        <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-[90%]">
          {service.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto border-t border-white/10 pt-6 relative z-10">
        {service.tags.map((tag, i) => (
          <span 
            key={i} 
            className="px-3 py-1.5 bg-white/10 border border-white/10 backdrop-blur-md rounded-lg text-[10px] md:text-xs font-bold text-white transition-colors group-hover:bg-white/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}