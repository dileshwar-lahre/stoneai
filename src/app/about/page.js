"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiShield,
  FiActivity,
  FiArrowUpRight,
  FiZap,
  FiAward,
} from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("vision");

  const coreValues = [
    {
      title: "AI Automation Core",
      desc: "Hum advanced automation engines ka use karte hain taaki marketing campaigns, leads aur reports smoothly sync ho sakein.",
      icon: <FiCpu />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Airtight Security",
      desc: "Aapka data, credentials aur tokens secure endpoints par safe rehte hain. No leaks, only growth.",
      icon: <FiShield />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "Real-time Operations",
      desc: "Campaign, click aur leads live sync hote hain jisse business ka control ek dashboard me milta hai.",
      icon: <FiZap />,
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />

      <main className="relative z-10 px-6 sm:px-8 pt-40 md:pt-48 pb-20 max-w-7xl mx-auto">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl mb-6 shadow-lg">
            <FiAward className="text-cyan-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">
              The Team Behind Stonenox AI
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-7">
            The Core{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Vision_
            </span>
          </h1>

          <p className="text-slate-300 text-lg lg:text-2xl font-medium max-w-4xl mx-auto leading-relaxed">
            Stonenox AI is built for agencies, operators and sales teams who
            want to manage campaigns, leads, reports and automation from one
            powerful dashboard.
          </p>
        </motion.section>

        {/* TABS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-28">
          <div className="lg:col-span-4 space-y-4">
            {[
              {
                id: "vision",
                no: "01",
                title: "Our True Vision",
                text: "Software ko simple banana jahan one-click reporting aur automation ho.",
              },
              {
                id: "story",
                no: "02",
                title: "Stonenox Legacy",
                text: "Fast, clean aur crash-free SaaS experience for growing businesses.",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/12 border-cyan-300/40 shadow-2xl shadow-cyan-500/10 translate-x-2"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-white">
                  <span className="text-cyan-300">{tab.no} /</span>
                  {tab.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-2 leading-relaxed">
                  {tab.text}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-white/8 border border-white/12 backdrop-blur-2xl p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-black/30 relative min-h-[360px] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />

            <AnimatePresence mode="wait">
              {activeTab === "vision" ? (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 space-y-6"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-cyan-400/10 text-cyan-200 px-4 py-2 rounded-full border border-cyan-300/20">
                    Automated Ecosystem
                  </span>

                  <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-none uppercase text-white">
                    Removing Complexity From Multi-Channel Ads_
                  </h2>

                  <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                    Agencies ko Meta Ads, Google Ads, Instagram pages, leads
                    aur reports check karne ke liye alag-alag tabs kholne
                    padte hain. Stonenox AI in sabko ek clean dashboard me
                    synchronize karta hai.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 space-y-6"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-indigo-400/10 text-indigo-200 px-4 py-2 rounded-full border border-indigo-300/20">
                    Our DNA
                  </span>

                  <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-none uppercase text-white">
                    Built By Builders, For Scalers_
                  </h2>

                  <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                    Stonenox AI normal CRM nahi hai. Ye ek intelligence layer
                    hai jo client logins, post scheduling, Facebook pages,
                    WhatsApp dispatch aur campaign tracking ko ek system me
                    connect karta hai.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-6 mt-10">
              <div className="flex -space-x-4">
                <div className="w-11 h-11 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black text-xs border-2 border-[#020617]">
                  ST
                </div>
                <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs border-2 border-[#020617]">
                  AI
                </div>
                <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-xs border-2 border-[#020617]">
                  MX
                </div>
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Built for modern agencies and scaling businesses
              </p>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="mb-28">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-300 mb-3">
              Our Core Principles
            </p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none text-white">
              Why Stonenox?_
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {coreValues.map((val, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/8 border border-white/12 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-black/20 hover:border-cyan-300/30 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-2xl mb-8 shadow-lg`}
                >
                  {val.icon}
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mb-3 uppercase">
                  {val.title}_
                </h3>

                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {val.desc}
                </p>

                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Standard Mode</span>
                  <span className="text-cyan-300">Active //</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* METRICS */}
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28 bg-white/8 border border-white/12 backdrop-blur-2xl p-8 rounded-[3.5rem] shadow-2xl shadow-black/30 relative overflow-hidden"
        >
          {[
            ["99.9%", "API Uptime Sync"],
            ["5M+", "Leads Crawled Live"],
            ["13+", "Active API Integrations"],
            ["₹0", "Setup Hidden Charges"],
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-4 relative z-10 md:border-l md:border-white/10 first:border-l-0"
            >
              <h3 className="text-4xl lg:text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {item[0]}
              </h3>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">
                {item[1]}
              </p>
            </div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl shadow-cyan-500/20 border border-white/15"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center mb-8">
              <FiActivity size={28} />
            </div>

            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none mb-6 uppercase">
              Join Stonenox AI Today
              <br />
              And Start Growing_
            </h2>

            <p className="text-blue-50 text-base lg:text-lg leading-relaxed max-w-2xl font-medium">
              Apne clients, campaigns, leads aur team reporting ko ek modern,
              clean aur powerful system me lekar aao.
            </p>

            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-10 h-14 px-8 rounded-2xl bg-white text-blue-700 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:scale-[1.04] active:scale-95 transition-all shadow-xl"
            >
              Launch Core Console
              <FiArrowUpRight size={16} />
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}