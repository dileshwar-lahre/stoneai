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
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 }
  }
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
      {/* Navbar Main Wrapper */}
      <header className="fixed top-0 left-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl">

        {/* Subtle Cyber Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        <div className="relative mx-auto flex max-w-[90rem] items-center justify-between px-6 py-4 md:px-12 md:py-5 lg:py-6">

          {/* BRAND LOGO - Configured King Size */}
          <Link
            href="#home"
            onClick={(e) => handleScroll(e, "#home")}
            className="flex items-center"
          >
            <img
              src="/images/Tex.png"
              alt="Stonenox Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP CORE NAVIGATION MENU */}
          <nav className="hidden items-center gap-10 lg:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="group relative text-[13px] font-bold uppercase tracking-[0.14em] text-white transition hover:text-cyan-400"
              >
                <span className="flex items-center gap-2">
                  {link.name}
                  {link.tag && (
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-[3px] text-[9px] tracking-widest text-cyan-300">
                      {link.tag}
                    </span>
                  )}
                </span>
                <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* SECONDARY MORE NAVIGATION DROPDOWN */}
            <div
              className="relative py-2"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="text-[13px] font-bold uppercase tracking-[0.14em] text-cyan-400 transition hover:text-cyan-300 outline-none">
                More
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-full mt-4 w-56 overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-2xl"
                  >
                    <div className="flex flex-col py-3">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleScroll(e, link.href)}
                          className="px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DIRECT SYSTEM ROUTING ACTIONS */}
            <div className="ml-4 flex items-center gap-4">
              <Link
                href="/login"
                className="text-[12px] font-black uppercase tracking-[0.15em] text-white transition hover:text-cyan-400"
              >
                Login //
              </Link>

              <Link
                href="/dashboard"
                className="rounded-full border border-cyan-400/30 bg-cyan-400 px-7 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-105 hover:bg-cyan-300"
              >
                Start Growing
              </Link>
            </div>
          </nav>

          {/* MOBILE VIEW NAVIGATION TOGGLE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="z-50 p-1 text-white lg:hidden outline-none"
          >
            <Menu size={30} strokeWidth={1.5} />
          </button>

        </div>
      </header>

      {/* FULLSCREEN MOBILE EXTENDED DRAWER PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col justify-center overflow-hidden bg-black px-8 sm:px-16"
          >
            {/* Ambient Background Glow for mobile overlay context */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

            {/* Mobile View Top Navigation Frame Bar */}
            <div className="absolute left-0 top-0 flex w-full items-center justify-between px-6 py-5 sm:px-12 sm:py-6">
              <img
                src="/images/Tex.png"
                alt="Stonenox Logo"
                className="h-14 w-auto object-contain sm:h-14"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-white transition duration-500 hover:rotate-90 outline-none"
              >
                <X size={34} strokeWidth={1.5} />
              </button>
            </div>

            {/* STACKED PANEL LINKS INTERACTION TREE */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative flex flex-col gap-14 sm:flex-row sm:items-end sm:justify-between"
            >
              {/* Primary Main Menu Paths */}
              <div className="flex flex-col gap-5">
                {mainLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={slideUpVars}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="flex items-center gap-4 text-5xl font-black uppercase tracking-tight text-white transition duration-300 hover:text-cyan-400 sm:text-7xl"
                    >
                      {link.name}
                      {link.tag && (
                        <span className="mt-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] tracking-[0.2em] text-cyan-300">
                          {link.tag}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Secondary Utility Links Panel */}
              <div className="flex flex-col gap-3 pb-2">
                <motion.div
                  variants={slideUpVars}
                  className="mb-2 overflow-hidden"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                    Build With AI
                  </span>
                </motion.div>

                {moreLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={slideUpVars}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-lg text-gray-400 transition hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile View CTA Sync Buttons */}
                <motion.div
                  variants={slideUpVars}
                  className="mt-8 flex flex-col gap-4"
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-sm font-black uppercase tracking-[0.2em] text-white transition hover:text-cyan-400"
                  >
                    Login //
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="inline-block rounded-full bg-cyan-400 px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-105 hover:bg-cyan-300"
                  >
                    Start Growing
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