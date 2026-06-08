"use client";

import React, { useState, useMemo } from "react";
import {
  FiInstagram,
  FiFacebook,
  FiSearch,
  FiFilter,
  FiUpload,
  FiDownload,
  FiTrendingUp,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function DashboardHome() {
  // 1. Channel Connections & Budget States
  const channels = [
    { name: "Instagram", icon: <FiInstagram size={18} />, connected: true, budget: "₹12,430", activeClass: "text-pink-500 hover:border-pink-500/40" },
    { name: "Facebook", icon: <FiFacebook size={18} />, connected: true, budget: "₹18,250", activeClass: "text-blue-500 hover:border-blue-500/40" },
    { name: "Google Ads", icon: <FcGoogle size={18} />, connected: false, budget: "₹0", activeClass: "hover:border-neutral-400/40" },
  ];

  // 2. Default Pre-loaded Mock Leads Data
  const defaultLeads = [
    { id: 1, name: "Sahil Lahre", phone: "+91 93001-XXXXX", message: "Inquiry for Website Dev", source: "Instagram", date: "Today, 02:40 PM" },
    { id: 2, name: "Aman Sharma", phone: "+91 98270-XXXXX", message: "Meta Ads consultation request", source: "Facebook", date: "Today, 11:15 AM" },
    { id: 3, name: "Rahul Verma", phone: "+91 70002-XXXXX", message: "App Architecture consultation", source: "Instagram", date: "Yesterday" },
    { id: 4, name: "Priya Patel", phone: "+91 88119-XXXXX", message: "SEO Optimization packages", source: "Facebook", date: "2 days ago" },
  ];

  // 3. Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");

  // 4. Filtering Logic
  const filteredLeads = useMemo(() => {
    return defaultLeads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSource = selectedSource === "All" || lead.source === selectedSource;

      return matchesSearch && matchesSource;
    });
  }, [searchTerm, selectedSource]);

  return (
    <div className="min-h-screen bg-[#000000] text-white relative font-sans overflow-x-hidden antialiased">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 px-6 md:px-12 pt-32 pb-16 max-w-[1400px] mx-auto">
        
        {/* TOP HEADER CONSOLE */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-6">
          
          {/* Left Side: Label + Minimal Channel Icon Nodes */}
          <div className="flex flex-col gap-2.5">
            {/* Chota premium hint text icons ke upar */}
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
              Connect your social ads account //
            </span>
            
            <div className="flex items-center gap-3">
              {channels.map((chan) => (
                <div 
                  key={chan.name} 
                  className={`flex items-center gap-3 bg-neutral-950 border border-neutral-900 p-3 rounded-xl transition-all duration-300 ${chan.activeClass}`}
                  title={`${chan.name}: ${chan.connected ? `Linked (${chan.budget})` : "Offline"}`}
                >
                  <div className="flex items-center justify-center">
                    {chan.icon}
                  </div>
                  {chan.connected && (
                    <>
                      <div className="w-px h-3 bg-neutral-800" />
                      <span className="font-mono text-neutral-300 text-[11px] font-bold">{chan.budget}</span>
                    </>
                  )}
                  <span className={`w-1.5 h-1.5 rounded-full ${chan.connected ? "bg-emerald-500 animate-pulse" : "bg-neutral-700"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: High Contrast Action Nodes */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button className="h-10 px-4 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:border-neutral-700 transition-all active:scale-95">
              <FiUpload size={12} /> Import
            </button>
            <button className="h-10 px-4 rounded-xl bg-blue-600 text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
              <FiDownload size={12} /> Export
            </button>
          </div>

        </header>

        {/* SEARCH, FILTER & TABLE MAIN CONTROL TERMINAL */}
        <div className="w-full bg-neutral-950 border border-neutral-900 rounded-3xl p-6 mb-8 shadow-2xl">
          
          {/* TOOLBAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            
            {/* Live Data Query Stream Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
              <input
                type="text"
                placeholder="Query database snapshot..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-11 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-all font-medium"
              />
            </div>

            {/* Micro Segment Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <div className="text-neutral-600 pr-1 hidden sm:block"><FiFilter size={12} /></div>
              {["All", "Instagram", "Facebook", "Google Ads"].map((src) => (
                <button
                  key={src}
                  onClick={() => setSelectedSource(src === "Google Ads" ? "Google" : src)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap border ${
                    (selectedSource === src || (selectedSource === "Google" && src === "Google Ads"))
                      ? "bg-white text-black border-white"
                      : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC LEADS GRID DATA PIPELINE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-500 text-[9px] uppercase tracking-widest font-black">
                  <th className="pb-3 px-4">Lead Source</th>
                  <th className="pb-3 px-4">Client Identifier</th>
                  <th className="pb-3 px-4">Phone Line</th>
                  <th className="pb-3 px-4">Request Payload</th>
                  <th className="pb-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-neutral-900/40 font-medium">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-900/20 transition-all group">
                      
                      {/* Left Side Channel Node Icons Only */}
                      <td className="py-4 px-4">
                        <div className="flex">
                          <span 
                            className={`p-2 rounded-xl border text-sm ${
                              lead.source === "Instagram" 
                                ? "bg-pink-950/10 border-pink-900/30 text-pink-400" 
                                : "bg-blue-950/10 border-blue-900/30 text-blue-400"
                            }`}
                            title={lead.source}
                          >
                            {lead.source === "Instagram" ? <FiInstagram size={14} /> : <FiFacebook size={14} />}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-white group-hover:text-blue-500 transition-all">{lead.name}</td>
                      <td className="py-4 px-4 text-neutral-400 font-mono tracking-tight">{lead.phone}</td>
                      <td className="py-4 px-4 text-neutral-300 max-w-xs truncate">{lead.message}</td>
                      <td className="py-4 px-4 text-neutral-600 text-right font-mono text-[11px]">{lead.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-neutral-600 font-mono uppercase text-[9px] tracking-widest">
                      // No matching records indexed
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MINIMALIST SCALE GRAPH FOOTER AREA */}
        <div className="w-full bg-neutral-950 border border-neutral-900 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-blue-950/20 border border-blue-900/40 text-blue-500 flex items-center justify-center shadow-inner">
              <FiTrendingUp size={16} />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-neutral-400 uppercase tracking-wider leading-relaxed">
                Connect your ad account and manage leads and grow business fast_
              </h4>
            </div>
          </div>

          {/* Minimalist Micro SVG Vector Graph */}
          <div className="w-36 h-8 opacity-50 pr-2">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path
                d="M0,25 Q15,22 30,12 T60,18 T90,3 T100,5"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M0,25 Q15,22 30,12 T60,18 T90,3 T100,5 L100,30 L0,30 Z"
                fill="url(#footer-gradient)"
                opacity="0.08"
              />
              <defs>
                <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

      </main>
    </div>
  );
}