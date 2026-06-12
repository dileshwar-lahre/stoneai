"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Layers, 
  Rocket, 
  Briefcase, 
  Phone, 
  HelpCircle, 
  RefreshCw, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight,
  LogIn,
  LogOut,
  Bell,
  X,
  Info
} from "lucide-react";

// MAIN LINKS WITH ICONS FOR MOBILE
const mainLinks = [
  { name: "Home", href: "#home", icon: Home, isActive: true },
  { name: "About", href: "#about", icon: User },
  { name: "Services", href: "#services", icon: Layers },
  { name: "For Startup", href: "/startup", icon: Rocket, tag: "NEW" }
];

// MORE LINKS WITH ICONS FOR MOBILE
const moreLinks = [
  { name: "Career", href: "/career", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Phone },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Refund Policy", href: "/refund-policy", icon: RefreshCw },
  { name: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
  { name: "Terms", href: "/terms", icon: FileText }
];

// Smooth Stagger Animations for App UI
const mobileMenuVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 10,
    transition: { duration: 0.25, ease: "easeInOut" }
  }
};

const itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

export default function Navbar() {
  // Authentication Simulated States
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Isko true/false karke test kar sakte ho bhai
  const [userAvatar, setUserAvatar] = useState("https://api.dicebear.com/7.x/bottts/svg?seed=Stonenox"); // Sample Premium Avatar

  const [open, setOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [moreOpenDesktop, setMoreOpenDesktop] = useState(false);
  const [moreOpenMobile, setMoreOpenMobile] = useState(false);

  const handleScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
        setNotiOpen(false);
      }
    } else {
      setOpen(false);
      setNotiOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOpen(false);
  };

  return (
    <>
      {/* HEADER - Desktop: Original (Glassmorphism), Mobile: Seamless Solid Black */}
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl transition-all duration-300 max-sm:border-none max-sm:bg-black max-sm:shadow-none">
        
        {/* Desktop Gradient Glow (Hidden on Mobile) */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 pointer-events-none max-sm:hidden" />

        <div className="relative mx-auto flex max-w-[90rem] items-center justify-between px-6 py-4 md:px-12 md:py-5 lg:py-6 max-sm:px-5 max-sm:py-4">

          {/* BRAND LOGO */}
          <Link
            href="#home"
            onClick={(e) => handleScroll(e, "#home")}
            className="relative z-50 flex items-center h-10 w-32 md:h-auto md:w-auto"
          >
            <img
              src="/images/Tex.png"
              alt="Stonenox Logo"
              className="absolute left-0 w-[120px] max-w-none md:relative md:h-20 md:w-auto object-contain" 
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
              onMouseEnter={() => setMoreOpenDesktop(true)}
              onMouseLeave={() => setMoreOpenDesktop(false)}
            >
              <button className="text-[13px] font-bold uppercase tracking-[0.14em] text-cyan-400 transition hover:text-cyan-300 outline-none">
                More
              </button>

              <AnimatePresence>
                {moreOpenDesktop && (
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

            {/* DIRECT SYSTEM ROUTING ACTIONS - DESKTOP DYNAMIC LOGIC */}
            <div className="ml-4 flex items-center gap-5">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  {/* Desktop User Avatar Display - Profile Routing Enabled */}
                  <Link href="/dashboard/profile" className="outline-none group">
                    <img 
                      src={userAvatar} 
                      alt="User Profile" 
                      className="h-7 w-7 rounded-full border border-cyan-400/30 bg-white/5 object-cover transition duration-300 hover:border-cyan-400 hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[12px] font-black uppercase tracking-[0.15em] text-white transition hover:text-red-400"
                  >
                    Logout //
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-[12px] font-black uppercase tracking-[0.15em] text-white transition hover:text-cyan-400"
                >
                  Login //
                </Link>
              )}

              <Link
                href="/dashboard"
                className="rounded-full border border-cyan-400/30 bg-cyan-400 px-7 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-105 hover:bg-cyan-300"
              >
                Start Growing
              </Link>
            </div>
          </nav>

          {/* MOBILE ACTIONS HOLDER (Top Margin 2) */}
          <div className="flex items-center gap-3 lg:hidden mt-2">
            {/* If user logged in, mobile header shows profile avatar directly - Profile Routing Enabled */}
            {isLoggedIn && (
              <Link href="/dashboard/profile" onClick={() => { setOpen(false); setNotiOpen(false); }} className="outline-none active:scale-95 transition-transform">
                <img 
                  src={userAvatar} 
                  alt="User Profile" 
                  className="h-6 w-6 rounded-full border border-cyan-400/30 bg-white/5 object-cover mr-1"
                />
              </Link>
            )}

            {/* MODERN NOTIFICATION BELL BUTTON */}
            <button
              onClick={() => {
                setNotiOpen(!notiOpen);
                setOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center outline-none active:scale-90 transition-transform"
              aria-label="Notifications"
            >
              <Bell size={22} className={notiOpen ? "text-cyan-400" : "text-white"} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            </button>

            {/* MODERN ASYMMETRIC MENU TOGGLE BUTTON */}
            <button
              onClick={() => {
                setOpen(!open);
                setNotiOpen(false);
              }}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center outline-none active:scale-90 transition-all"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col items-end gap-[5px]">
                <span className={`block h-[2px] bg-white transition-all duration-300 ease-out rounded-full ${open ? "w-5 translate-y-[7px] rotate-45" : "w-5"}`} />
                <span className={`block h-[2px] bg-cyan-400 transition-all duration-300 ease-out rounded-full ${open ? "w-0 opacity-0" : "w-3.5"}`} />
                <span className={`block h-[2px] bg-white transition-all duration-300 ease-out rounded-full ${open ? "w-5 -translate-y-[7px] -rotate-45" : "w-4"}`} />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE FULLSCREEN DRAWER - TRUE APP SYSTEM */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 bg-black pt-24 px-5 pb-6 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            {/* Main Grid List with Icons */}
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 pl-2 mb-1">Navigation</div>
              
              {mainLinks.map((link) => (
                <motion.div variants={itemVariants} key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      link.isActive 
                        ? "bg-cyan-400/[0.06] border-cyan-400/20 text-cyan-400 font-bold" 
                        : "bg-white/[0.02] border-white/[0.04] text-gray-300 active:bg-white/[0.05]"
                    }`}
                  >
                    <span className="text-[14px] font-medium tracking-wide flex items-center gap-3.5">
                      <div className={`p-1.5 rounded-lg ${link.isActive ? "bg-cyan-400/10 text-cyan-400" : "bg-white/5 text-gray-400"}`}>
                        <link.icon size={16} strokeWidth={2.2} />
                      </div>
                      {link.name}
                      {link.tag && (
                        <span className="rounded-full bg-cyan-400/20 px-1.5 py-0.5 text-[8px] font-black text-cyan-400 tracking-wider">
                          {link.tag}
                        </span>
                      )}
                    </span>
                    <ChevronRight size={14} className={link.isActive ? "text-cyan-400" : "text-gray-600"} />
                  </Link>
                </motion.div>
              ))}

              {/* Accordion Dashboard Layout for More Options */}
              <motion.div variants={itemVariants} className="rounded-xl border border-white/[0.04] bg-white/[0.02] overflow-hidden mt-2">
                <button
                  onClick={() => setMoreOpenMobile(!moreOpenMobile)}
                  className="w-full flex items-center justify-between p-3.5 text-gray-300 text-[14px] font-medium tracking-wide outline-none active:bg-white/[0.02]"
                >
                  <span className="flex items-center gap-3.5">
                    <div className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                      <Layers size={16} strokeWidth={2.2} />
                    </div>
                    More Utilities
                  </span>
                  <motion.div animate={{ rotate: moreOpenMobile ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} className="text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {moreOpenMobile && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden bg-[#050505] border-t border-white/[0.02]"
                    >
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {moreLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="flex flex-col gap-2 p-3 text-xs text-gray-400 rounded-xl bg-white/[0.01] border border-white/[0.02] hover:text-cyan-400 active:bg-white/[0.04] transition"
                          >
                            <link.icon size={16} className="text-gray-500 group-hover:text-cyan-400" strokeWidth={2} />
                            <span className="font-medium tracking-wide">{link.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bottom Floating Action Panel (DYNAMIC MOBILE LOGOUT VIEW) */}
            <motion.div variants={itemVariants} className="space-y-3.5 mt-6">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-cyan-400 text-black py-3.5 rounded-xl font-bold text-[15px] transition active:scale-[0.97] shadow-[0_8px_30px_rgba(34,211,238,0.15)]"
              >
                Start Growing <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full bg-red-500/10 border border-red-500/20 text-red-400 py-3.5 rounded-xl font-semibold text-[14px] transition active:scale-[0.97]"
                >
                  <LogOut size={15} /> Account Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-white/[0.03] border border-white/[0.06] text-white py-3.5 rounded-xl font-semibold text-[14px] transition active:scale-[0.97]"
                >
                  <LogIn size={15} className="text-cyan-400" /> Account Sign In
                </Link>
              )}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE NOTIFICATION APP POPUP */}
      <AnimatePresence>
        {notiOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] right-4 left-4 z-40 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-4 lg:hidden shadow-[0_24px_50px_rgba(0,0,0,0.9)]"
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2.5 mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white tracking-wide">
                <Bell size={16} className="text-cyan-400" /> System Update
              </div>
              <button 
                onClick={() => setNotiOpen(false)}
                className="p-1 rounded-md bg-white/5 text-gray-400 active:bg-white/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Premium Notification Box with Cyan Indicator */}
            <div className="relative flex gap-3 p-3.5 rounded-xl bg-cyan-400/[0.02] border border-cyan-400/10 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400" />
              
              <div className="p-1.5 h-7 w-7 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Info size={14} strokeWidth={2.5} />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-black text-white tracking-wide">Welcome to Stonenox</span>
                  <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded-md tracking-wider">TESTING</span>
                </div>
                <p className="text-[12px] text-gray-400 leading-relaxed font-medium">
                  Abhi ye platform testing ke liye hai, isliye koi bhi plan na lein. Jald hi use ke liye hum <span className="text-cyan-300 font-bold">Beta v0.1</span> ko officially launch karenge!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}