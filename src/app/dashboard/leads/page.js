"use client";

import React from 'react';

const DashboardOverview = () => {
  const stats = [
    { label: "Total Leads", value: "2,840", trend: "+12%", color: "border-blue-500" },
    { label: "Ad Spend", value: "₹14,200", trend: "Stable", color: "border-white/10" },
    { label: "Avg. CPL", value: "₹42.00", trend: "-5%", color: "border-blue-500" },
    { label: "Conversion", value: "18.4%", trend: "+2%", color: "border-white/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 pt-4">
      
      {/* 1. CLEAN HEADER */}
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            System Overview
          </h1>
          <p className="text-gray-500 text-xs mt-1 font-medium">Monitoring real-time performance metrics</p>
        </div>
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md">
          Last Sync: 2m Ago
        </div>
      </div>

      {/* 2. COMPACT STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-[#080808] border ${stat.color} transition-all`}>
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
            <span className="text-[9px] font-bold text-blue-500 uppercase mt-2 block">{stat.trend} Growth</span>
          </div>
        ))}
      </div>

      {/* 3. PERFORMANCE & LOGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Section */}
        <div className="lg:col-span-2 rounded-2xl bg-[#080808] border border-white/5 p-8">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Leads Trajectory</h4>
            <div className="flex gap-4">
              <span className="text-[10px] text-blue-500 font-bold uppercase border-b border-blue-500">Weekly</span>
              <span className="text-[10px] text-gray-600 font-bold uppercase cursor-pointer hover:text-white transition-colors">Monthly</span>
            </div>
          </div>

          {/* Minimal Line Chart Visual */}
          <div className="h-48 flex items-end gap-2">
            {[20, 45, 30, 80, 50, 65, 40, 90, 100, 70, 85, 60].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className="w-full bg-blue-600/20 rounded-t-sm transition-all group-hover:bg-blue-600"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-700 uppercase">
            <span>Jan 01</span><span>Jan 15</span><span>Jan 30</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl bg-[#080808] border border-white/5 p-8">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Recent Events</h4>
          <div className="space-y-6">
            {[
              { title: "Insta Lead", time: "12:40", status: "Success" },
              { title: "FB Sync", time: "11:15", status: "Active" },
              { title: "API Check", time: "09:00", status: "Idle" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <div>
                    <p className="text-xs font-bold text-white">{item.title}</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase">{item.time}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-gray-500 uppercase">{item.status}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-white/5 rounded-xl text-[10px] font-bold text-gray-500 uppercase hover:bg-white/5 hover:text-white transition-all">
            Full Audit Log
          </button>
        </div>
      </div>

      {/* 4. FOOTER INFO */}
      <div className="flex justify-center gap-10 opacity-30">
        <div className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">MDPAI v1.0</div>
        <div className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Secure Node</div>
      </div>

    </div>
  );
};

export default DashboardOverview;