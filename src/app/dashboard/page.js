"use client";

import React from "react";
import {
  FiInstagram,
  FiFacebook,
  FiDownload,
  FiUpload,
  FiArrowUpRight,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

export default function DashboardHome() {

  return (
    <div className="min-h-screen bg-[#fafafa] relative font-sans overflow-x-hidden">

      {/* BG EFFECT */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-3xl rounded-full pointer-events-none" />

      {/* MAIN */}
      <main className="relative z-10 px-8 pt-28 pb-10">

        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
              Dashboard Overview
            </p>

            <h1 className="text-5xl lg:text-6xl font-[1000] text-black tracking-tighter leading-none">
              Leads Overview_
            </h1>

          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">

            <button className="
              h-12 px-5 rounded-2xl
              bg-white border border-gray-200
              flex items-center gap-2
              text-[11px] font-black uppercase tracking-widest
              text-gray-500 hover:text-black
              hover:border-gray-300
              transition-all
            ">

              <FiUpload />

              Import

            </button>

            <button className="
              h-12 px-5 rounded-2xl
              bg-blue-600 text-white
              flex items-center gap-2
              text-[11px] font-black uppercase tracking-widest
              hover:bg-blue-700
              transition-all
              shadow-lg shadow-blue-100
            ">

              <FiDownload />

              Export

            </button>

          </div>

        </header>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          <StatsCard
            title="Total Leads"
            value="1,284"
            growth="+18%"
            icon={<FiUsers />}
          />

          <StatsCard
            title="Ad Spend"
            value="₹42,430"
            growth="+8%"
            icon={<FiDollarSign />}
          />

          <StatsCard
            title="Campaigns"
            value="18"
            growth="+5%"
            icon={<FiTarget />}
          />

          <StatsCard
            title="ROAS"
            value="4.8x"
            growth="+24%"
            icon={<FiBarChart2 />}
          />

        </div>

        {/* PLATFORM CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">

          <SourceCard
            name="Instagram"
            icon={<FiInstagram size={24} />}
            hoverColor="hover:bg-pink-50 hover:border-pink-200"
            brandColor="text-pink-600"
            leads="428"
            budget="₹12,430"
            status="Active"
          />

          <SourceCard
            name="Facebook"
            icon={<FiFacebook size={24} />}
            hoverColor="hover:bg-blue-50 hover:border-blue-200"
            brandColor="text-blue-600"
            leads="512"
            budget="₹18,250"
            status="Running"
          />

          <SourceCard
            name="Google Ads"
            icon={<FcGoogle size={24} />}
            hoverColor="hover:bg-gray-50 hover:border-gray-300"
            brandColor="text-gray-900"
            leads="344"
            budget="₹11,750"
            status="Optimized"
          />

        </div>

        {/* CTA SECTION */}
        <div className="
          relative overflow-hidden
          bg-gradient-to-br from-blue-600 to-blue-700
          rounded-[3rem]
          p-10 lg:p-14
          text-white
        ">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl">

            <div className="w-20 h-20 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8">

              <FiTrendingUp size={38} />

            </div>

            <h2 className="text-4xl lg:text-5xl font-[1000] tracking-tighter leading-none mb-6">

              Scale Your Business
              <br />

              With AI Automation_

            </h2>

            <p className="text-blue-100 text-lg leading-relaxed max-w-2xl font-medium">

              Connect Meta Ads, Google Ads,
              CRM pipeline, automation and
              analytics into one centralized
              marketing dashboard.

            </p>

            <button className="
              mt-10 h-14 px-7 rounded-2xl
              bg-white text-blue-700
              font-black uppercase tracking-widest text-sm
              flex items-center gap-2
              hover:scale-[1.03]
              transition-all
              shadow-2xl
            ">

              Sync Accounts

              <FiArrowUpRight />

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

/* STATS CARD */

function StatsCard({
  title,
  value,
  growth,
  icon,
}) {

  return (
    <div className="
      bg-white border border-gray-100
      rounded-[2rem]
      p-6
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
    ">

      <div className="flex items-center justify-between mb-8">

        <div className="
          w-14 h-14 rounded-2xl
          bg-blue-50
          text-blue-600
          flex items-center justify-center
          text-xl
        ">

          {icon}

        </div>

        <span className="
          px-3 py-1 rounded-full
          bg-green-50 text-green-600
          text-[10px] font-black uppercase tracking-widest
        ">

          {growth}

        </span>

      </div>

      <h2 className="text-4xl font-[1000] tracking-tighter text-black mb-2">
        {value}
      </h2>

      <p className="text-[11px] uppercase tracking-widest font-black text-gray-400">
        {title}
      </p>

    </div>
  );
}

/* SOURCE CARD */

function SourceCard({
  name,
  icon,
  hoverColor,
  brandColor,
  leads,
  budget,
  status,
}) {

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white border border-gray-100
        rounded-[2.5rem]
        p-7
        shadow-sm
        transition-all duration-300
        hover:shadow-2xl
        hover:-translate-y-1
        ${hoverColor}
      `}
    >

      {/* BG EFFECT */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-100/50 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-start justify-between mb-10">

          <div className={`
            w-14 h-14 rounded-2xl
            bg-white border border-gray-100
            flex items-center justify-center
            shadow-sm
            ${brandColor}
          `}>

            {icon}

          </div>

          <span className="
            px-3 py-1 rounded-full
            bg-gray-50
            text-gray-500
            text-[10px] font-black uppercase tracking-widest
          ">

            {status}

          </span>

        </div>

        <div className="mb-8">

          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Ad Spend
          </p>

          <h2 className="text-4xl font-[1000] tracking-tighter text-black">
            {budget}
          </h2>

        </div>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              Leads
            </p>

            <h3 className={`text-xl font-black ${brandColor}`}>
              {leads}
            </h3>

          </div>

          <div className="text-right">

            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
              Platform
            </p>

            <h3 className="text-sm font-black text-black">
              {name}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}