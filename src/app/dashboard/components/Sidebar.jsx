"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  FiUsers,
  FiTarget,
  FiBarChart2,
  FiSettings,
  FiCreditCard,
  FiInstagram,
  FiFacebook,
  FiGrid,
  FiHome,
  FiLayers,
  FiFileText,
  FiMessageSquare,
  FiBell,
  FiHelpCircle,
  FiActivity,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiZap,
  FiBriefcase,
  FiChevronDown,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

function SidebarLink({ href, icon, name, count }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 border ${
        active 
          ? "bg-neutral-900 border-neutral-800 text-blue-500 shadow-lg" 
          : "text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/40"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[18px]">{icon}</span>
        <span className="text-[13px] font-black uppercase tracking-wider">{name}</span>
      </div>
      {count && (
        <span className="bg-neutral-900 text-neutral-500 text-[9px] font-mono px-2 py-0.5 border border-neutral-800 rounded-md">
          {count}
        </span>
      )}
    </Link>
  );
}

// 📡 Fully Reactive Channel Component
function ChannelLink({ icon, name, status, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-950/40 border border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/30 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <div className="text-base group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[13px] font-black uppercase tracking-wider text-neutral-400 group-hover:text-white">
          {name}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-neutral-700"}`} />
        <span className={`text-[9px] uppercase font-black tracking-widest ${
          status === "Active" ? (isHovered ? "text-red-500 font-extrabold" : "text-emerald-400") : "text-neutral-500"
        }`}>
          {status === "Active" ? (isHovered ? "Disconnect" : "Linked") : "Setup"}
        </span>
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [mounted, setMounted] = useState(false);
  
  const [userRole, setUserRole] = useState("owner"); 
  const [displayName, setDisplayName] = useState("");
  const [realName, setRealName] = useState(""); 
  const [userPic, setUserPic] = useState("");
  const [planName, setPlanName] = useState("NO ACTIVE PLAN");

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  
  // 📡 CHANNEL CORES
  const [googleAdsStatus, setGoogleAdsStatus] = useState("Setup");
  const [facebookStatus, setFacebookStatus] = useState("Setup"); 

  useEffect(() => {
    setMounted(true);

    async function syncSidebarProfileCluster() {
      try {
        const res = await fetch("/api/user/profile", {
          cache: "no-store",
          credentials: "include",
        });
        const profileResult = await res.json();
        
        if (profileResult.success) {
          const { user, profile } = profileResult;
          
          setUserRole(user.role || "owner");
          setRealName(user.name || "Stonenox User");
          setUserPic(user.picture || "");

          if (user.role === "agency" && profile?.agencyName) {
            setDisplayName(profile.agencyName);
          } else if (user.role === "owner" && profile?.businessName) {
            setDisplayName(profile.businessName);
          } else if (user.role === "staff" && profile?.companyName) {
            setDisplayName(profile.companyName);
          }

          // Checking your real database tokens/booleans flags
          if (user.googleAdsConnected || user.googleAds?.status === "connected") {
            setGoogleAdsStatus("Active");
          } else {
            setGoogleAdsStatus("Setup");
          }

          if (user.facebookConnected || user.facebook?.status === "connected") {
            setFacebookStatus("Active");
          } else {
            setFacebookStatus("Setup");
          }

          const userId = user._id || user.id;
          if (userId) {
            try {
              const subRes = await fetch("/api/get-digital-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
              });
              const subResult = await subRes.json();
              if (subResult.hasActivePlan && subResult.planDetails) {
                setPlanName(`${subResult.planDetails.planName.toUpperCase()}`);
              }
            } catch (e) {
              setPlanName("STANDARD TIER");
            }
          }
        }
      } catch (err) {
        console.error("🚨 Sidebar Context Load Error:", err);
      }
    }

    syncSidebarProfileCluster();
  }, [pathname]);

  // 🔥 GOOGLE ADS ACTION MAPPING: Secure Connection & Safe Disconnection
  const handleGoogleAdsClick = (e) => {
    e.preventDefault();
    if (googleAdsStatus === "Active") {
      // ✅ User active h, toggle mode popup confirmation alert before dropping token node
      if (confirm("Kya aap sach me apna Google Ads integration disconnect karna chahte hain?")) {
        window.location.assign("/api/auth/google-ads/disconnect"); // Points directly to your disconnection engine
      }
    } else {
      window.location.assign("/api/auth/google-ads/connect?trigger=manual");
    }
  };

  const handleFacebookClick = (e) => {
    e.preventDefault();
    if (facebookStatus === "Active") {
      if (confirm("Kya aap Facebook integration hatana chahte hain?")) {
        window.location.assign("/api/auth/facebook/disconnect");
      }
    } else {
      window.location.assign("/api/auth/facebook/connect");
    }
  };

  useEffect(() => {
    if (userRole === "agency") {
      const dummyClients = [
        { _id: "c1", name: "Rahul Sharma Logistics" },
        { _id: "c2", name: "Sharma Wellness Centre" },
        { _id: "c3", name: "Raipur Tech Labs" }
      ];
      setClients(dummyClients);
      setSelectedClient(dummyClients[0]); 
    }
  }, [userRole]);

  if (!mounted) return null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-36 left-6 z-[70] w-12 h-12 bg-neutral-950 border border-neutral-900 rounded-xl shadow-2xl flex items-center justify-center hover:border-neutral-700 hover:scale-105 transition-all text-white"
        >
          <FiChevronRight size={22} />
        </button>
      )}

      <aside
        className={`fixed left-6 top-36 z-[60] h-[calc(100vh-170px)] w-72 bg-[#000000] border border-neutral-900 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"
        }`}
      >
        {/* HEADER BRANDING */}
        <div className="h-20 border-b border-neutral-900 flex items-center justify-between px-6 shrink-0 bg-neutral-950/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center text-blue-500">
              <FiGrid size={16} />
            </div>
            <div>
              <h2 className="font-black text-white tracking-tight text-sm uppercase">Stonenox AI</h2>
              <p className="text-[9px] text-cyan-400 font-black uppercase tracking-wider mt-0.5">{userRole} Node</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
            <FiChevronLeft size={16} />
          </button>
        </div>

        {/* 🏢 AGENCY DROPDOWN */}
        {userRole === "agency" && (
          <div className="px-4 pt-4 border-b border-neutral-900 pb-4 shrink-0 bg-neutral-950/10">
            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[1.5px] mb-2 px-1">Active Pipeline Unit</p>
            <div className="relative">
              <button
                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                className="w-full flex items-center justify-between bg-neutral-950 border border-neutral-900 p-3 rounded-xl hover:border-neutral-800 transition-all text-left"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FiBriefcase className="text-blue-500 shrink-0 text-sm" />
                  <span className="text-xs font-bold text-neutral-300 truncate">
                    {selectedClient ? selectedClient.name : "Select Target"}
                  </span>
                </div>
                <FiChevronDown className={`text-neutral-500 text-xs transition-transform duration-200 ${isClientDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isClientDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-neutral-950 border border-neutral-900 rounded-xl shadow-2xl z-50 py-1 max-h-48 overflow-y-auto divide-y divide-neutral-900">
                  {clients.map((client) => (
                    <button
                      key={client._id}
                      onClick={() => {
                        setSelectedClient(client);
                        setIsClientDropdownOpen(false);
                        router.push(`/dashboard/clients/${client._id}/profile`);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-black uppercase tracking-tight block truncate transition-all text-neutral-400 hover:bg-neutral-900/20 hover:text-white"
                    >
                      🏢 {client.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* NAVIGATION LINKS */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6 scrollbar-none">
          <div>
            <h3 className="px-4 text-[9px] font-black text-neutral-600 uppercase mb-2 tracking-[2px]">// Main Console</h3>
            <div className="space-y-1">
              <SidebarLink href="/dashboard" icon={<FiHome />} name="Dashboard" />
              <SidebarLink href="/dashboard/campaigns" icon={<FiTarget />} name="Campaigns" />
              <SidebarLink href="/dashboard/analytics" icon={<FiBarChart2 />} name="Analytics" />
              <SidebarLink href="/dashboard/leads" icon={<FiUsers />} name="Leads" count={userRole === "agency" ? "12" : "84"} />
            </div>
          </div>

          {/* 📡 INTEGRATIONS PANEL */}
          {userRole !== "staff" && (
            <div>
              <h3 className="px-4 text-[9px] font-black text-neutral-600 uppercase mb-2 tracking-[2px]">// Integrations</h3>
              <div className="space-y-1">
                <ChannelLink icon={<FiInstagram className="text-pink-500" />} name="Instagram" status="Setup" />
                <ChannelLink icon={<FiFacebook className="text-blue-500" />} name="Facebook" status={facebookStatus} onClick={handleFacebookClick} />
                <ChannelLink icon={<FcGoogle />} name="Google Ads" status={googleAdsStatus} onClick={handleGoogleAdsClick} />
              </div>
            </div>
          )}

          <div>
            <h3 className="px-4 text-[9px] font-black text-neutral-600 uppercase mb-2 tracking-[2px]">// CRM Pipeline</h3>
            <div className="space-y-1">
              <SidebarLink href="/dashboard/crm" icon={<FiLayers />} name="Core Pipe" />
              <SidebarLink href="/dashboard/messages" icon={<FiMessageSquare />} name="Messages" />
              <SidebarLink href="/dashboard/followups" icon={<FiCalendar />} name="Follow Ups" />
            </div>
          </div>
        </div>

        {/* PROFILE BADGE INTERFACE */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 truncate w-[calc(100%-40px)]">
            
            {userPic ? (
              <img src={userPic} alt="Avatar" className="w-9 h-9 rounded-xl border border-neutral-800 object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-black text-blue-500 text-xs shadow-inner uppercase shrink-0">
                {realName ? realName.substring(0, 2) : "US"}
              </div>
            )}

            <div className="truncate w-full">
              <span className="text-xs font-black block text-neutral-200 leading-none uppercase tracking-tight truncate">
                {realName || "Stonenox Member"}
              </span>

              <span className="text-[8px] block text-cyan-400 font-mono tracking-tight mt-1 uppercase font-bold truncate">
                {planName}
              </span>

              {displayName && (
                <span className="text-[7px] block text-neutral-500 uppercase tracking-tight mt-0.5 truncate">
                  🏢 {displayName}
                </span>
              )}
            </div>
          </div>
          
          {userRole !== "staff" && (
            <Link href="/dashboard/billing" className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center transition-all text-blue-500 shrink-0">
              <FiZap size={13} className="animate-pulse" />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}