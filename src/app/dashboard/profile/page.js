"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, User, Shield, Crown, Link2, CircleDot, Layers, Flame, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subData, setSubData] = useState(null);

  useEffect(() => {
    fetch("/api/user/profile", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res);
          if (res.hasPlan && res.planDetails) {
            setSubData(res.planDetails);
          } else {
            setSubData(null);
          }
        } else {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.error("🚨 Configuration matrix connection crashed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    window.location.href = "/dashboard";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center font-mono text-[11px] tracking-[0.25em] uppercase gap-3 animate-pulse">
        <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        // Syncing secure profile identities...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center font-mono text-[11px] tracking-widest uppercase">
        // Critical: Identity cursor out of scope
      </div>
    );
  }

  const { user, profile } = data;

  const roleLabel =
    user.role === "owner"
      ? "Business Owner"
      : user.role === "agency"
      ? "Agency Partner"
      : "Executive Staff";

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 antialiased select-none animate-fadeIn">
      
      {/* 🚀 PREMIUM, HIGH-END SOLID METALLIC BLACK SHEET */}
      <div className="w-full max-w-xl bg-[#09090b] rounded-3xl border border-neutral-900 flex flex-col h-[90vh] sm:h-auto sm:max-h-[85vh] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative animate-scaleUp">
        
        {/* Ambient Top Lighting effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-cyan-500/[0.03] blur-[70px] rounded-full pointer-events-none z-0" />

        {/* COMPACT TOP HEADER CONSOLE */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-900 bg-[#09090b] relative z-10 shrink-0">
          <div className="flex items-center gap-4">
            {user.picture ? (
              <img
                src={user.picture}
                alt="Profile Container"
                className="w-12 h-12 rounded-2xl border border-neutral-800 object-cover shadow-xl"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center text-sm font-black shadow-inner">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
            <div className="flex flex-col min-w-0 space-y-0.5">
              <span className="text-base font-black text-white tracking-tight truncate max-w-[200px] sm:max-w-[280px]">{user.name}</span>
              <span className="text-xs text-neutral-500 font-mono truncate max-w-[200px] sm:max-w-[280px]">{user.email}</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleClose}
            className="p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white transition-all outline-none"
            aria-label="Close Profile"
          >
            <X size={15} strokeWidth={3} />
          </button>
        </div>

        {/* ULTRA CLEAN CARD DECK OVERVIEW */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none pb-8 relative z-10">
          
          {/* SECTION 1: SYSTEM IDENTITY CONTEXT CARD */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 block pl-1">Ecosystem Node Metadata //</span>
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/30 overflow-hidden divide-y divide-neutral-900/40">
              <Row label="System Status" value={roleLabel} icon={<User size={13} className="text-cyan-400" />} />
              <Row label="Unique Index Reference" value={user._id || user.id} isMono />
              <Row label="Ecosystem Guard" value="Access Verified" isVerified />
            </div>
          </div>

          {/* SECTION 2: ACTIVE PREMIUM RETAINER STATUS CARD */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 block pl-1">Active Ledger Allocation //</span>
            
            {subData ? (
              <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-5 space-y-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.01] blur-2xl rounded-full pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3.5">
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-black text-white tracking-wide truncate flex items-center gap-2">
                      {subData.planKey === "basic" ? <Layers size={13} className="text-cyan-400" /> : <Flame size={13} className="text-amber-500" />} 
                      {subData.planName}
                    </h4>
                    <span className="text-[9px] text-neutral-500 font-bold font-mono uppercase tracking-wider block">ID: {subData?.planKey}</span>
                  </div>
                  <div className="shrink-0">
                    <div className="border border-neutral-900 px-3.5 py-1.5 rounded-xl bg-black text-center shadow-inner relative">
                      <span className="font-mono text-cyan-400 text-xs font-black tracking-tight">{subData.daysLeft} Days Remaining</span>
                    </div>
                  </div>
                </div>

                {/* Allocated limits mapped clearly */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-bold text-neutral-500 font-mono uppercase tracking-wider block">// Core Allocated Package Assets:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-semibold text-neutral-400">
                    <div className="flex items-center gap-2 text-neutral-300"><CheckCircle2 size={12} className="text-cyan-400 shrink-0" /> {subData.limits?.channels || "3 Social Channels Link"}</div>
                    <div className="flex items-center gap-2 text-neutral-300"><CheckCircle2 size={12} className="text-cyan-400 shrink-0" /> {subData.limits?.postsPerMonth || "10 Post Modules"}</div>
                    <div className="flex items-center gap-2 text-neutral-300"><CheckCircle2 size={12} className="text-cyan-400 shrink-0" /> {subData.limits?.crmAccess || "Ecosystem CRM Core Access"}</div>
                    <div className="flex items-center gap-2 text-neutral-300"><CheckCircle2 size={12} className="text-cyan-400 shrink-0" /> {subData.limits?.adsManagement || "Ads Operations Configuration"}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-neutral-900 rounded-2xl p-6 text-center bg-neutral-950/20 space-y-3">
                <p className="text-neutral-500 text-xs font-bold tracking-wide">No Active Performance Contracts Mounted</p>
                <Link href="/dashboard/billing" className="inline-flex h-8 px-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all items-center shadow-md active:scale-95">
                  Mount Growth Contract 🚀
                </Link>
              </div>
            )}
          </div>

          {/* SECTION 3: DETAILED SPECIFICATIONS CONFIGURATION MATRIX CARD */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 block pl-1">Configuration Profiles //</span>
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/30 overflow-hidden divide-y divide-neutral-900/40">
              
              {user.role === "owner" && (
                <>
                  <Row label="Business Entity" value={profile?.businessName} />
                  <Row label="Classification" value={profile?.businessCategory} />
                  <Row label="Primary Phone" value={profile?.phone} />
                  <Row label="WhatsApp Link" value={profile?.whatsapp} />
                  <Row label="Regional Hub (City)" value={profile?.city} />
                  <Row label="Regional Hub (State)" value={profile?.state} />
                  <Row label="Web Endpoint" value={profile?.website} isLink />
                </>
              )}

              {user.role === "agency" && (
                <>
                  <Row label="Agency Firm" value={profile?.agencyName} />
                  <Row label="Managing Partner" value={profile?.ownerName} />
                  <Row label="Primary Phone" value={profile?.phone} />
                  <Row label="WhatsApp Link" value={profile?.whatsapp} />
                  <Row label="Web Endpoint" value={profile?.website} isLink />
                  <Row label="Regional Hub (City)" value={profile?.city} />
                  <Row label="Regional Hub (State)" value={profile?.state} />
                  <Row label="Node Base pipelines" value={profile?.totalClients} />
                </>
              )}

              {user.role === "staff" && (
                <>
                  <Row label="Employee Token ID" value={profile?.employeeId} />
                  <Row label="Classification" value={profile?.staffType} />
                  <Row label="Associated Org" value={profile?.companyName} />
                  <Row label="Primary Phone" value={profile?.phone} />
                  <Row label="WhatsApp Link" value={profile?.whatsapp} />
                  <Row label="Regional Hub (City)" value={profile?.city} />
                </>
              )}

            </div>
          </div>

          {/* SECTION 4: NETWORK CONSOLE SYNC MODULE STATUS CARD */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 block pl-1">Ecosystem Synchronization //</span>
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/30 overflow-hidden divide-y divide-neutral-900/40">
              <ConnectRow title="Google Ads Network Node" connected={user.googleAdsConnected || false} />
              <ConnectRow title="Facebook Business Manager" connected={false} />
              <ConnectRow title="Instagram Graph Interface" connected={false} />
            </div>
          </div>

        </div>
      </div>

      {/* Modern Animation Injectors */}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { 
          from { transform: translateY(12px) scale(0.99); opacity: 0; } 
          to { transform: translateY(0) scale(1); opacity: 1; } 
        }
        .animate-fadeIn { animation: fadeIn 0.16s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}

// Micro Settings Row Template (Cleaner Padding & High Contrast Labels)
function Row({ label, value, isMono, isVerified, isLink, icon }) {
  return (
    <div className="px-5 py-3.5 flex items-center justify-between gap-6 transition-all hover:bg-neutral-900/20">
      <span className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2.5">
        {icon && <span className="text-white shrink-0">{icon}</span>}
        {label}
      </span>
      {isVerified ? (
        <span className="text-white flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xl shadow-inner">
          <Shield size={10} className="text-cyan-400" /> SECURED MODULE
        </span>
      ) : isLink && value ? (
        <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold text-xs underline truncate max-w-[180px] tracking-wide hover:text-cyan-300 transition-colors">
          {value}
        </a>
      ) : (
        <p className={`font-black text-white text-xs sm:text-sm text-right truncate max-w-[210px] ${isMono ? "font-mono text-neutral-500 text-[11px] tracking-normal font-normal" : "tracking-wide"}`}>
          {value || "—"}
        </p>
      )}
    </div>
  );
}

// Minimal Sync Row Template (Apple UI Console Type Layout)
function ConnectRow({ title, connected }) {
  return (
    <div className="px-5 py-3.5 flex items-center justify-between transition-all hover:bg-neutral-900/20">
      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
        <Link2 size={12} className="text-neutral-600 shrink-0" />
        {title}
      </span>
      {connected ? (
        <span className="text-white flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xl">
          <CircleDot size={9} className="text-emerald-500 animate-pulse" /> ONLINE
        </span>
      ) : (
        <span className="text-neutral-700 text-[9px] font-black uppercase tracking-widest px-2 font-mono">
          OFFLINE
        </span>
      )}
    </div>
  );
}