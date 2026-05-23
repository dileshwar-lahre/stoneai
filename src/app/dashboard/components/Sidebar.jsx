"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

function SidebarLink({
  href,
  icon,
  name,
  count,
}) {

  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        w-full flex items-center justify-between
        px-4 py-3 rounded-2xl
        transition-all duration-300
        ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-50"
        }
      `}
    >

      <div className="flex items-center gap-3">

        <span className="text-[20px]">
          {icon}
        </span>

        <span className="text-[14px] font-semibold tracking-tight">
          {name}
        </span>

      </div>

      {count && (
        <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-semibold">
          {count}
        </span>
      )}

    </Link>
  );
}

function ChannelLink({
  icon,
  name,
  status,
}) {

  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3 rounded-2xl
        hover:bg-gray-50 transition-all duration-300
        cursor-pointer
      "
    >

      <div className="flex items-center gap-3">

        <div className="text-lg">
          {icon}
        </div>

        <span className="text-[14px] font-semibold tracking-tight text-gray-700">
          {name}
        </span>

      </div>

      <div className="flex items-center gap-1.5">

        <div
          className={`w-1.5 h-1.5 rounded-full ${
            status === "Active"
              ? "bg-green-500"
              : "bg-amber-400"
          }`}
        />

        <span className="text-[10px] text-gray-400 uppercase font-bold">
          {status}
        </span>

      </div>

    </div>
  );
}

export default function Sidebar({
  isOpen,
  setIsOpen,
}) {

  return (
    <>
      {/* OPEN BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed top-28 left-6 z-[70]
            w-12 h-12
            bg-white border border-gray-200
            rounded-2xl shadow-lg
            flex items-center justify-center
            hover:scale-105 transition-all
          "
        >

          <FiChevronRight
            size={22}
            className="text-gray-700"
          />

        </button>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-6 top-28 z-[60]
          h-[calc(100vh-130px)]
          w-72
          bg-white/95 backdrop-blur-xl
          border border-gray-200
          rounded-[2.5rem]
          shadow-2xl
          overflow-hidden
          transition-all duration-300 ease-in-out
          flex flex-col

          ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-[120%] opacity-0"
          }
        `}
      >

        {/* HEADER */}
        <div className="h-24 border-b border-gray-100 flex items-center justify-between px-6">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-sm">

              <FiGrid
                className="text-white"
                size={20}
              />

            </div>

            <div>

              <h2 className="font-black text-gray-900 tracking-tight">
                Stonenox AI
              </h2>

              <p className="text-[11px] text-gray-400 font-medium">
                AI Marketing Suite
              </p>

            </div>

          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setIsOpen(false)}
            className="
              w-10 h-10
              rounded-2xl
              hover:bg-gray-100
              flex items-center justify-center
              transition-all
            "
          >

            <FiChevronLeft
              size={20}
              className="text-gray-700"
            />

          </button>

        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">

          {/* MAIN */}
          <div>

            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Main
            </h3>

            <div className="space-y-1">

              <SidebarLink
                href="/dashboard"
                icon={<FiHome />}
                name="Dashboard"
              />

              <SidebarLink
                href="/dashboard/campaigns"
                icon={<FiTarget />}
                name="Campaigns"
              />

              <SidebarLink
                href="/dashboard/analytics"
                icon={<FiBarChart2 />}
                name="Analytics"
              />

              <SidebarLink
                href="/dashboard/leads"
                icon={<FiUsers />}
                name="Leads"
                count="84"
              />

            </div>

          </div>

          {/* SOCIAL */}
          <div>

            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Social Channels
            </h3>

            <div className="space-y-1">

              <ChannelLink
                icon={<FiInstagram className="text-pink-500" />}
                name="Instagram"
                status="Active"
              />

              <ChannelLink
                icon={<FiFacebook className="text-blue-500" />}
                name="Facebook"
                status="Setup"
              />

              <ChannelLink
                icon={<FcGoogle />}
                name="Google Ads"
                status="Active"
              />

            </div>

          </div>

          {/* CRM */}
          <div>

            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              CRM
            </h3>

            <div className="space-y-1">

              <SidebarLink
                href="/dashboard/crm"
                icon={<FiLayers />}
                name="CRM Pipeline"
              />

              <SidebarLink
                href="/dashboard/messages"
                icon={<FiMessageSquare />}
                name="Messages"
              />

              <SidebarLink
                href="/dashboard/followups"
                icon={<FiCalendar />}
                name="Follow Ups"
              />

            </div>

          </div>

          {/* CONTENT */}
          <div>

            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Content
            </h3>

            <div className="space-y-1">

              <SidebarLink
                href="/dashboard/social-posts"
                icon={<FiFileText />}
                name="Social Posts"
              />

              <SidebarLink
                href="/dashboard/automation"
                icon={<FiActivity />}
                name="Automation"
              />

            </div>

          </div>

          {/* WORKSPACE */}
          <div>

            <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase mb-3 tracking-[1px]">
              Workspace
            </h3>

            <div className="space-y-1">

              <SidebarLink
                href="/dashboard/notifications"
                icon={<FiBell />}
                name="Notifications"
              />

              <SidebarLink
                href="/dashboard/billing"
                icon={<FiCreditCard />}
                name="Billing"
              />

              <SidebarLink
                href="/dashboard/settings"
                icon={<FiSettings />}
                name="Settings"
              />

              <SidebarLink
                href="/dashboard/support"
                icon={<FiHelpCircle />}
                name="Support"
              />

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}