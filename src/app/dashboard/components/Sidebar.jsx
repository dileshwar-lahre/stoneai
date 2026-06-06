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
  FiClock,
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
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[20px]">{icon}</span>
        <span className="text-[14px] font-semibold tracking-tight">{name}</span>
      </div>

      {count && (
        <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-semibold">
          {count}
        </span>
      )}
    </Link>
  );
}

function ChannelLink({ icon, name, status }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="text-lg">{icon}</div>
        <span className="text-[14px] font-semibold tracking-tight text-gray-700">
          {name}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            status === "Active" ? "bg-green-500" : "bg-amber-400"
          }`}
        />
        <span className="text-[10px] text-gray-400 uppercase font-bold">
          {status}
        </span>
      </div>
    </div>
  );
}

function CurrentPlanCard() {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const storedSubscription = localStorage.getItem("subscription");
    if (storedSubscription) {
      try {
        setSubscription(JSON.parse(storedSubscription));
      } catch (error) {
        console.log("SUBSCRIPTION_PARSE_ERROR", error);
      }
    }
  }, []);

  const planName = subscription?.planName || "No Plan Selected";
  const status = subscription?.status || "inactive";
  const price = subscription?.price || 0;

  let renewText = "Choose plan";
  if (subscription?.currentPeriodEnd) {
    const endDate = new Date(subscription.currentPeriodEnd);
    renewText = endDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <Link
      href="/dashboard/subscription"
      className="block mx-3 mb-4 rounded-[2rem] bg-black text-white p-4 overflow-hidden relative group"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/40 rounded-full blur-3xl group-hover:bg-cyan-500/40 transition-all" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300">
            <FiZap />
          </div>
          <span className="text-[9px] uppercase tracking-widest font-black bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
            {status}
          </span>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300 font-black mb-1">
          Current Plan
        </p>

        <h3 className="text-[15px] font-black leading-tight line-clamp-1">
          {planName}
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/10 p-2">
            <p className="text-[9px] text-white/50 font-bold uppercase">Price</p>
            <p className="text-sm font-black">₹{price}</p>
          </div>

          <div className="rounded-2xl bg-white/10 p-2">
            <p className="text-[9px] text-white/50 font-bold uppercase flex items-center gap-1">
              <FiClock /> Renew
            </p>
            <p className="text-[11px] font-black">{renewText}</p>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-white/50 font-bold">
          Click to manage subscription
        </p>
      </div>
    </Link>
  );
}

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  
  // 🎭 Core Identity States
  const [userRole, setUserRole] = useState("agency"); // Default 'agency' rakha hai check karne ke liye. (Real app me session se aayega: 'owner', 'agency', 'staff')
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);

  // 📡 Day 2 Relational Data Fetching: Load clients if user is an Agency
  useEffect(() => {
    if (userRole === "agency") {
      // API call lagao jab database ready ho jayega
      // fetch("/api/agency/clients").then(res => res.json()).then(data => setClients(data.clients));
      
      // Dummy data testing ke liye jab tak API nahi jodh rahe:
      const dummyClients = [
        { _id: "c1", name: "Rahul Sharma Logistics", email: "rahul@logistics.com" },
        { _id: "c2", name: "Sharma Wellness Centre", email: "contact@sharmawell.com" },
        { _id: "c3", name: "Raipur Tech Labs", email: "info@raipurtech.com" }
      ];
      setClients(dummyClients);
      setSelectedClient(dummyClients[0]); // Pehla client automatic select ho jaye
    }
  }, [userRole]);

  const handleClientChange = (client) => {
    setSelectedClient(client);
    setIsClientDropdownOpen(false);
    // Client change hote hi uske specific profile manage route par redirect kar do
    router.push(`/dashboard/clients/${client._id}/profile`);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-28 left-6 z-[70] w-12 h-12 bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-all"
        >
          <FiChevronRight size={22} className="text-gray-700" />
        </button>
      )}

      <aside
        className={`fixed left-6 top-28 z-[60] h-[calc(100vh-130px)] w-72 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-24 border-b border-gray-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <FiGrid className="text-white" size={20} />
            </div>

            <div>
              <h2 className="font-black text-gray-900 tracking-tight">
                Stonenox AI
              </h2>
              <p className="text-[11px] text-gray-400 font-medium capitalize">
                {userRole} Account
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-2xl hover:bg-gray-100 flex items-center justify-center transition-all"
          >
            <FiChevronLeft size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Dynamic Client Management Dropdown (ONLY FOR MARKETING AGENCIES) */}
        {userRole === "agency" && (
          <div className="px-4 pt-4 border-b border-gray-50 pb-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2 px-1">
              Active Corporate Client
            </p>
            <div className="relative">
              <button
                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                className="w-full flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-2xl hover:bg-slate-100/80 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FiBriefcase className="text-blue-500 shrink-0 text-lg" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {selectedClient ? selectedClient.name : "Select Client"}
                  </span>
                </div>
                <FiChevronDown className={`text-slate-500 text-sm transition-transform duration-200 ${isClientDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Clients Dropdown List overlay */}
              {isClientDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1 max-h-48 overflow-y-auto antialiased">
                  {clients.map((client) => (
                    <button
                      key={client._id}
                      onClick={() => handleClientChange(client)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors block truncate ${
                        selectedClient?._id === client._id ? "text-blue-600 bg-blue-50/50" : "text-slate-700"
                      }`}
                    >
                      🏢 {client.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
          
          {/* Main Navigation - Visible to Everyone */}
          <div>
            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Main
            </h3>
            <div className="space-y-1">
              <SidebarLink href="/dashboard" icon={<FiHome />} name="Dashboard" />
              <SidebarLink href="/dashboard/campaigns" icon={<FiTarget />} name="Campaigns" />
              <SidebarLink href="/dashboard/analytics" icon={<FiBarChart2 />} name="Analytics" />
              
              {/* Conditional Visibility Example: Leads counters can change based on context */}
              <SidebarLink href="/dashboard/leads" icon={<FiUsers />} name="Leads" count={userRole === "agency" ? "12" : "84"} />
            </div>
          </div>

          {/* Social Channels Configs */}
          <div>
            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Social Channels
            </h3>
            <div className="space-y-1">
              <ChannelLink icon={<FiInstagram className="text-pink-500" />} name="Instagram" status="Active" />
              <ChannelLink icon={<FiFacebook className="text-blue-500" />} name="Facebook" status="Setup" />
              <ChannelLink icon={<FcGoogle />} name="Google Ads" status="Active" />
            </div>
          </div>

          {/* CRM Flows */}
          <div>
            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              CRM
            </h3>
            <div className="space-y-1">
              <SidebarLink href="/dashboard/crm" icon={<FiLayers />} name="CRM Pipeline" />
              <SidebarLink href="/dashboard/messages" icon={<FiMessageSquare />} name="Messages" />
              <SidebarLink href="/dashboard/followups" icon={<FiCalendar />} name="Follow Ups" />
            </div>
          </div>

          {/* Content Automation */}
          <div>
            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Content
            </h3>
            <div className="space-y-1">
              <SidebarLink href="/dashboard/social-posts" icon={<FiFileText />} name="Social Posts" />
              <SidebarLink href="/dashboard/automation" icon={<FiActivity />} name="Automation" />
            </div>
          </div>

          {/* Core Settings Workspace */}
          <div>
            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Workspace
            </h3>
            <div className="space-y-1">
              <SidebarLink href="/dashboard/subscription" icon={<FiCreditCard />} name="Subscription" />
              <SidebarLink href="/dashboard/billing" icon={<FiCreditCard />} name="Billing" />
              <SidebarLink href="/dashboard/notifications" icon={<FiBell />} name="Notifications" />
              <SidebarLink href="/dashboard/settings" icon={<FiSettings />} name="Settings" />
              <SidebarLink href="/dashboard/support" icon={<FiHelpCircle />} name="Support" />
            </div>
          </div>
        </div>

        {/* Bottom Subscription Card Status */}
        <CurrentPlanCard />
      </aside>
    </>
  );
}