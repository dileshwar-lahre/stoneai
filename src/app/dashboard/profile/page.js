"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaGlobe,
  FaCrown,
  FaBuilding,
  FaUsers,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 👑 SUBSCRIPTION STATES
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
          // 📡 Trigger live isolated digital plan lookup
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

  // 🧠 LAZY AUTO-EXPIRATION SUBSCRIPTION FETCH MATRIX
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center font-semibold text-sm uppercase tracking-wider">
        Loading Profile Context...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center font-semibold text-sm uppercase tracking-wider">
        No Profile Context Found
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
    <div className="min-h-screen bg-[#0B1220] text-white p-6 space-y-6 antialiased select-none">
      
      {/* 1. Profile Header Section */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/10 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-cyan-500/20 object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-black flex items-center justify-center text-3xl font-black shadow-lg">
              {user.name?.charAt(0) || "U"}
            </div>
          )}

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tight">
              {user.name}
            </h1>

            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-2 text-sm font-semibold">
              <FaEnvelope className="text-cyan-400" />
              {user.email}
            </p>

            <div className="flex justify-center md:justify-start gap-3 mt-4 flex-wrap">
              <span className="px-4 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold text-xs uppercase tracking-wide">
                {roleLabel}
              </span>

              <span className="px-4 py-1.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 font-bold text-xs uppercase tracking-wide">
                Verification Locked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE SEPARATE SUBSCRIPTION MONITORING MODULE */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/10 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-5 tracking-tight flex items-center gap-2">
          <FaCrown /> Active Core Services & Retainers
        </h2>

        {subLoading ? (
          <div className="text-gray-500 text-xs font-semibold animate-pulse py-4">
            Polling secure billing nodes...
          </div>
        ) : subData ? (
          <div className="bg-black/30 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-wider">
                  Active Contract
                </span>
                <span className="text-gray-500 text-[11px] font-bold font-mono">ID: {selectedPlan?.planKey || "growth_node"}</span>
              </div>
              <h4 className="text-lg font-black text-white mt-2.5 tracking-tight">{subData.planName}</h4>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Deployment Cycle Date: {new Date(subData.activatedAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            {/* Expire Logic Condition Display */}
            <div className="sm:text-right">
              {subData.planKey.includes("dev") || subData.planKey.includes("combo") ? (
                <span className="inline-block px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 font-black text-xs uppercase tracking-widest shadow-sm">
                  Lifetime Infrastructure
                </span>
              ) : (
                <div className="inline-block bg-[#0B1220] border border-white/5 p-3 rounded-xl text-center min-w-[100px] shadow-inner">
                  <span className="block font-black text-xl text-cyan-400 font-mono leading-none">{subData.daysLeft}</span>
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider block mt-1">Days Remaining</span>
                </div>
              )}
              <p className="text-[10px] text-gray-500 font-semibold mt-2">
                Next Renewal Check: {new Date(subData.expiresAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-gray-800 rounded-2xl p-8 text-center bg-black/10">
            <p className="text-gray-400 text-xs font-bold">No Operational Performance Contracts Mounted</p>
            <p className="text-gray-500 text-[11px] mt-1 max-w-sm mx-auto font-medium">
              Aapke profile par abhi koi active growth package nahi mila. System integrations run karne ke liye ek deployment contract select karein.
            </p>
            <a
              href="/dashboard/digital-plans"
              className="inline-block mt-4 px-5 py-2.5 bg-cyan-500 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg shadow-cyan-500/10"
            >
              Mount Growth Plans
            </a>
          </div>
        )}
      </div>

      {/* 3. Core Profile Details Field Mapping */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/10 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-5 tracking-tight">
          Profile Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.role === "owner" && (
            <>
              <Info label="Business Name" value={profile?.businessName} icon={<FaBuilding />} />
              <Info label="Business Category" value={profile?.businessCategory} icon={<FaBriefcase />} />
              <Info label="Phone" value={profile?.phone} icon={<FaPhone />} />
              <Info label="WhatsApp" value={profile?.whatsapp} icon={<FaWhatsapp />} />
              <Info label="City" value={profile?.city} icon={<FaMapMarkerAlt />} />
              <Info label="State" value={profile?.state} icon={<FaMapMarkerAlt />} />
              <Info label="Website" value={profile?.website} icon={<FaGlobe />} />
            </>
          )}

          {user.role === "agency" && (
            <>
              <Info label="Agency Name" value={profile?.agencyName} icon={<FaBuilding />} />
              <Info label="Owner Name" value={profile?.ownerName} icon={<FaUser />} />
              <Info label="Phone" value={profile?.phone} icon={<FaPhone />} />
              <Info label="WhatsApp" value={profile?.whatsapp} icon={<FaWhatsapp />} />
              <Info label="Website" value={profile?.website} icon={<FaGlobe />} />
              <Info label="City" value={profile?.city} icon={<FaMapMarkerAlt />} />
              <Info label="State" value={profile?.state} icon={<FaMapMarkerAlt />} />
              <Info label="Total Clients" value={profile?.totalClients} icon={<FaUsers />} />
            </>
          )}

          {user.role === "staff" && (
            <>
              <Info label="Employee ID" value={profile?.employeeId} icon={<FaUser />} />
              <Info label="Staff Classification" value={profile?.staffType} icon={<FaBriefcase />} />
              <Info label="Associated Company" value={profile?.companyName} icon={<FaBuilding />} />
              <Info label="Phone" value={profile?.phone} icon={<FaPhone />} />
              <Info label="WhatsApp" value={profile?.whatsapp} icon={<FaWhatsapp />} />
              <Info label="City" value={profile?.city} icon={<FaMapMarkerAlt />} />
            </>
          )}
        </div>
      </div>

      {/* 4. Connected Accounts Network */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/10 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-5 tracking-tight">
          Connected Accounts
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <ConnectCard title="Google Ads Console" connected={user.googleAdsConnected} />
          <ConnectCard title="Facebook Pixel Link" connected={false} />
          <ConnectCard title="Instagram Graph Node" connected={false} />
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="bg-black/20 border border-white/5 rounded-2xl p-4 transition-all hover:border-white/10">
      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
        <span className="text-cyan-400 text-sm">
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-2 font-semibold text-slate-200 text-sm">
        {value || "Not Configured"}
      </p>
    </div>
  );
}

function ConnectCard({ title, connected }) {
  return (
    <div className="bg-black/20 border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-white/10">
      <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">{title}</span>

      {connected ? (
        <span className="text-green-400 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
          <FaCheckCircle className="text-sm" /> Verified
        </span>
      ) : (
        <span className="text-red-400 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
          <FaTimesCircle className="text-sm" /> Disconnected
        </span>
      )}
    </div>
  );
}