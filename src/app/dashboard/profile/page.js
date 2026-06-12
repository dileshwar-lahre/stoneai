"use client";

import { useEffect, useState } from "react";
import { X, User, Shield, Crown, Link2, CircleDot } from "lucide-react";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // SUBSCRIPTION STATES
  const [subData, setSubData] = useState(null);
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/profile", {
      cache: "no-store",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res);
          fetchActiveSubscription(res.user._id || res.user.id);
        } else {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
        setSubLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchActiveSubscription = async (userId) => {
    try {
      const res = await fetch("/api/get-digital-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const subResult = await res.json();
      
      if (subResult.hasActivePlan) {
        setSubData(subResult.planDetails);
      } else {
        setSubData(null);
      }
    } catch (err) {
      console.error("Error connecting to subscription cluster:", err);
    } finally {
      setSubLoading(false);
    }
  };

  const handleClose = () => {
    window.location.href = "/dashboard";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-bold text-sm uppercase tracking-[0.2em] gap-4">
        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        LOADING CORE MATRIX...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold text-sm uppercase tracking-[0.2em]">
        NO PROFILE CONTEXT FOUND
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-6 antialiased select-none animate-fadeIn">
      
      {/* 🚀 PREMIUM, HIGH-END BLACK & WHITE OVERLAY MODAL */}
      <div className="w-full max-w-xl bg-black rounded-t-3xl sm:rounded-2xl border-t sm:border border-white/10 flex flex-col h-[92vh] sm:h-auto sm:max-h-[85vh] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,1)] animate-scaleUp">
        
        {/* COMPACT APP BAR BAR HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#09090b] shrink-0">
          <div className="flex items-center gap-4">
            {user.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="w-12 h-12 rounded-full border border-white/20 object-cover shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center text-sm font-black shadow-md">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
            <div className="flex flex-col min-w-0 space-y-0.5">
              <span className="text-base font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-[280px]">{user.name}</span>
              <span className="text-xs text-gray-500 font-medium tracking-wide truncate max-w-[200px] sm:max-w-[280px]">{user.email}</span>
            </div>
          </div>

          {/* ICON BUTTON CLOSE CONTROL */}
          <button 
            onClick={handleClose}
            className="p-2 bg-white/5 hover:bg-white/10 active:scale-90 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all outline-none"
            aria-label="Close Profile"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* INNER CONTENT SCROLL DECK */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 scrollbar-none pb-8">
          
          {/* CATEGORY 1: USER CONTEXT ACCESS */}
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 pl-1">Identity & System</div>
            <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/10 bg-white/[0.01]">
              <Row label="System Role" value={roleLabel} icon={<User size={14} />} />
              <Row label="Node ID Reference" value={user._id || user.id} isMono />
              <Row label="Security Clearance" value="Verified Secure" isVerified />
            </div>
          </div>

          {/* CATEGORY 2: RETAINER LOGISTICS */}
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 pl-1">Active Retainer</div>
            {subLoading ? (
              <div className="text-gray-500 text-xs font-bold animate-pulse py-3 pl-1">Polling subscription clusters...</div>
            ) : subData ? (
              <div className="rounded-xl border border-white/10 p-5 flex items-center justify-between gap-5 bg-white/[0.01]">
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-bold text-white tracking-wide truncate flex items-center gap-2">
                    <Crown size={14} className="text-white" /> {subData.planName}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-bold font-mono tracking-wider">REF ID: {subData?.planKey || "growth_node"}</p>
                </div>
                <div className="shrink-0">
                  {subData.planKey.includes("dev") || subData.planKey.includes("combo") ? (
                    <span className="px-3 py-1 rounded bg-white text-black font-black text-[10px] uppercase tracking-wider shadow-sm">Lifetime</span>
                  ) : (
                    <div className="border border-white/20 px-3.5 py-1 rounded-lg bg-black text-center shadow-inner">
                      <span className="font-black text-sm text-white font-mono tracking-wide">{subData.daysLeft} DAYS</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-white/10 rounded-xl p-5 text-center bg-white/[0.005]">
                <p className="text-gray-500 text-xs font-bold tracking-wide">No Active Performance Contracts Mounted</p>
                <Link href="/dashboard/digital-plans" className="inline-block mt-3 text-[11px] font-black text-white uppercase tracking-wider underline hover:text-gray-300 transition-colors">Mount Deployment Packages →</Link>
              </div>
            )}
          </div>

          {/* CATEGORY 3: PROFILE METADATA SPECIFICATIONS */}
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 pl-1">Specification Matrix</div>
            <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/10 bg-white/[0.01]">
              
              {user.role === "owner" && (
                <>
                  <Row label="Business Entity" value={profile?.businessName} />
                  <Row label="Category Classification" value={profile?.businessCategory} />
                  <Row label="Primary Phone Link" value={profile?.phone} />
                  <Row label="WhatsApp Terminal" value={profile?.whatsapp} />
                  <Row label="Regional City Hub" value={profile?.city} />
                  <Row label="Regional State Hub" value={profile?.state} />
                  <Row label="Digital Web Node" value={profile?.website} isLink />
                </>
              )}

              {user.role === "agency" && (
                <>
                  <Row label="Agency Brand Firm" value={profile?.agencyName} />
                  <Row label="Managing Partner" value={profile?.ownerName} />
                  <Row label="Primary Phone Link" value={profile?.phone} />
                  <Row label="WhatsApp Terminal" value={profile?.whatsapp} />
                  <Row label="Digital Web Node" value={profile?.website} isLink />
                  <Row label="Regional City Hub" value={profile?.city} />
                  <Row label="Regional State Hub" value={profile?.state} />
                  <Row label="Active Node Accounts" value={profile?.totalClients} />
                </>
              )}

              {user.role === "staff" && (
                <>
                  <Row label="Employee Token ID" value={profile?.employeeId} />
                  <Row label="Staff Classification" value={profile?.staffType} />
                  <Row label="Associated Company" value={profile?.companyName} />
                  <Row label="Primary Phone Link" value={profile?.phone} />
                  <Row label="WhatsApp Terminal" value={profile?.whatsapp} />
                  <Row label="Regional City Hub" value={profile?.city} />
                </>
              )}

            </div>
          </div>

          {/* CATEGORY 4: COMPONENT CONNECTIONS */}
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 pl-1">API Integrations</div>
            <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/10 bg-white/[0.01]">
              <ConnectRow title="Google Ads Console" connected={user.googleAdsConnected} />
              <ConnectRow title="Facebook Pixel Layer" connected={false} />
              <ConnectRow title="Instagram Graph Node" connected={false} />
            </div>
          </div>

        </div>
      </div>

      {/* Animation Core Sheet Styles */}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { 
          from { transform: translateY(20px) scale(0.98); opacity: 0; } 
          to { transform: translateY(0) scale(1); opacity: 1; } 
        }
        @media (min-width: 640px) {
          @keyframes scaleUp { 
            from { transform: scale(0.97); opacity: 0; } 
            to { transform: scale(1); opacity: 1; } 
          }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}

// Clean App-Style Settings Row Layout (Larger Padding & Premium Text Layout)
function Row({ label, value, isMono, isVerified, isLink, icon }) {
  return (
    <div className="px-5 py-4 flex items-center justify-between gap-5 transition duration-150 hover:bg-white/[0.02]">
      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2.5">
        {icon && <span className="text-white">{icon}</span>}
        {label}
      </span>
      {isVerified ? (
        <span className="text-white flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/20 px-2.5 py-1 rounded">
          <Shield size={11} /> SECURE
        </span>
      ) : isLink && value ? (
        <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-white font-black text-xs underline truncate max-w-[200px] tracking-wide">
          {value}
        </a>
      ) : (
        <p className={`font-black text-white text-sm text-right truncate max-w-[220px] ${isMono ? "font-mono text-gray-500 text-[11px] tracking-normal" : "tracking-wide"}`}>
          {value || "—"}
        </p>
      )}
    </div>
  );
}

// Minimal Sync Row Template (Larger Padding & Clear Controls)
function ConnectRow({ title, connected }) {
  return (
    <div className="px-5 py-4 flex items-center justify-between transition duration-150 hover:bg-white/[0.02]">
      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2.5">
        <Link2 size={14} className="text-gray-500" />
        {title}
      </span>
      {connected ? (
        <span className="text-white flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-white/10 border border-white/10 px-2.5 py-1 rounded shadow-sm">
          <CircleDot size={10} className="animate-pulse" /> LINKED
        </span>
      ) : (
        <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest pl-2">
          OFFLINE
        </span>
      )}
    </div>
  );
}