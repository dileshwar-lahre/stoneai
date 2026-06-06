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
} from "react-icons/fa";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/profile", {
      cache: "no-store",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res);
        } else {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
        No Profile Found
      </div>
    );
  }

  const { user, profile } = data;

  const roleLabel =
    user.role === "owner"
      ? "Business Owner"
      : user.role === "agency"
      ? "Agency"
      : "Staff";

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/20 p-6">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-cyan-500/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-cyan-500 text-black flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-400 flex items-center gap-2 mt-2">
              <FaEnvelope className="text-cyan-400" />
              {user.email}
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {roleLabel}
              </span>

              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Profile Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/20 p-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-5">
          Profile Details
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
              <Info label="Clients" value={profile?.totalClients} icon={<FaUsers />} />
            </>
          )}

          {user.role === "staff" && (
            <>
              <Info label="Employee ID" value={profile?.employeeId} icon={<FaUser />} />
              <Info label="Staff Type" value={profile?.staffType} icon={<FaBriefcase />} />
              <Info label="Company Name" value={profile?.companyName} icon={<FaBuilding />} />
              <Info label="Phone" value={profile?.phone} icon={<FaPhone />} />
              <Info label="WhatsApp" value={profile?.whatsapp} icon={<FaWhatsapp />} />
              <Info label="City" value={profile?.city} icon={<FaMapMarkerAlt />} />
            </>
          )}
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-[#111827] rounded-3xl border border-cyan-500/20 p-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-5">
          Connected Accounts
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <ConnectCard
            title="Google Ads"
            connected={user.googleAdsConnected}
          />

          <ConnectCard
            title="Facebook"
            connected={false}
          />

          <ConnectCard
            title="Instagram"
            connected={false}
          />
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span className="text-cyan-400">
          {icon}
        </span>
        {label}
      </div>

      <p className="mt-2 font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

function ConnectCard({
  title,
  connected,
}) {
  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
      <span>{title}</span>

      {connected ? (
        <span className="text-green-400 flex items-center gap-2">
          <FaCheckCircle />
          Connected
        </span>
      ) : (
        <span className="text-red-400 flex items-center gap-2">
          <FaTimesCircle />
          Not Connected
        </span>
      )}
    </div>
  );
}