"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// MAIN LINKS
const mainLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "For Startup", href: "/startup", tag: "NEW" }
];

// MORE LINKS
const moreLinks = [
  { name: "Career", href: "/career" },
  { name: "Contact", href: "#contact" }, 
  { name: "Support", href: "/support" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms" }
];

const menuVariants = {
  initial: { clipPath: "inset(0% 0% 100% 0%)" },
  animate: { 
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: { 
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
  }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
};

const slideUpVars = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const handleScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    }
  };

  return (
    <>
      {/* Navbar Top Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl text-black border-b border-gray-100/50">
        <div className="max-w-[90rem] mx-auto flex items-center justify-between px-6 md:px-12 py-4 md:py-5 lg:py-6">

          {/* LOGO */}
          <Link
            href="#home"
            onClick={(e) => handleScroll(e, "#home")}
            className="flex items-center"
          >
            <img 
              src="/images/Tex.png" 
              alt="Stonenox Logo" 
              className="h-14 md:h-14 lg:h-16 w-auto object-contain transition-all" 
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="relative text-[13px] font-bold uppercase tracking-[0.1em] text-black hover:text-gray-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {link.name}
                  {link.tag && (
                    <span className="text-[9px] px-2 py-[2px] bg-black text-white font-bold tracking-widest">
                      {link.tag}
                    </span>
                  )}
                </span>
              </Link>
            ))}

            {/* MORE DROPDOWN */}
            <div
              className="relative py-2"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="text-[13px] font-bold uppercase tracking-[0.1em] text-emerald-500 hover:text-emerald-400 transition-colors">
                More
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full right-0 w-52 bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.05)] py-4"
                  >
                    <div className="flex flex-col">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleScroll(e, link.href)}
                          className="text-[13px] font-medium tracking-wide text-gray-500 hover:text-black hover:bg-gray-50 px-6 py-2.5 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACTION BUTTONS: Login & Get Started */}
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="/login"
                className="text-[12px] font-[1000] uppercase tracking-[0.15em] text-black hover:text-blue-600 transition-colors"
              >
                Login //
              </Link>
              <Link
                href="/login"
                className="px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] bg-black text-white hover:bg-gray-900 transition-all duration-300 shadow-md active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-black p-1 z-50"
          >
            <Menu size={30} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-white z-50 flex flex-col justify-center px-8 sm:px-16 overflow-hidden"
          >
            {/* Top Bar inside Fullscreen Menu */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-5 sm:px-12 sm:py-6">
              <span className="flex items-center">
                <img 
                  src="/images/Tex.png" 
                  alt="Stonenox Logo" 
                  className="h-12 sm:h-14 w-auto object-contain" 
                />
              </span>
              <button 
                onClick={() => setOpen(false)} 
                className="text-black p-1 hover:rotate-90 transition-transform duration-500"
              >
                <X size={34} strokeWidth={1.5} />
              </button>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-10 mt-12"
            >
              <div className="flex flex-col gap-4 sm:gap-6">
                {mainLinks.map((link) => (
                  <motion.div key={link.name} variants={slideUpVars} className="overflow-hidden">
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black hover:text-emerald-500 transition-colors duration-300"
                    >
                      {link.name}
                      {link.tag && (
                        <span className="text-[10px] sm:text-xs px-2 py-1 bg-black text-white font-bold tracking-widest align-middle mt-2">
                          {link.tag}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Sidebar Secondary Actions */}
              <div className="flex flex-col gap-3 pb-2">
                <motion.div variants={slideUpVars} className="overflow-hidden mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">
                    Explore More
                  </span>
                </motion.div>
                
                {moreLinks.map((link) => (
                  <motion.div key={link.name} variants={slideUpVars} className="overflow-hidden">
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-base sm:text-lg font-medium text-gray-500 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Direct Buttons Setup */}
                <motion.div variants={slideUpVars} className="overflow-hidden mt-6 flex flex-col gap-4">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center text-sm font-black uppercase tracking-widest text-black hover:text-blue-600 transition-colors py-2"
                  >
                    Login //
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="inline-block text-center px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] border border-black bg-black text-white hover:bg-transparent hover:text-black transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}