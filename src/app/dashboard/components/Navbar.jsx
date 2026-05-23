"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Image component use karna best practice hai [cite: 368]
import { FiChevronDown } from 'react-icons/fi';

const PremiumAINavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. Services: Development & Creative [cite: 372]
  const services = [
    { name: "Website Development", href: "/services/web-dev" },
    { name: "App Development", href: "/services/app-dev" },
    { name: "AI Assistant", href: "/services/ai-assistant" },
    { name: "Video Editing", href: "/services/video-editing" },
    { name: "Graphics Design", href: "/services/graphics" },
  ];

  // 2. Marketing: Ads & SEO [cite: 372]
  const marketing = [
    { name: "Meta Ads (FB & Insta)", href: "/marketing/meta-ads" },
    { name: "Google Ads (SEM)", href: "/marketing/google-ads" },
    { name: "SEO Optimization", href: "/marketing/seo" },
    { name: "Influencer Marketing", href: "/marketing/influencer" },
    { name: "Social Media Marketing", href: "/marketing/smm" },
  ];

  // 3. Tools: Business Automation [cite: 372]
  const tools = [
    { name: "CRM Tool", href: "/tools/crm" },
    { name: "Payroll System", href: "/tools/payroll" },
    { name: "Automation Tool", href: "/tools/automation" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-[70] flex justify-center p-6 md:p-8">
      {/* 3D Glass Container [cite: 372] */}
      <div className="w-full max-w-[1500px] bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2.5rem] 
        shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
        
        <div className="flex items-center justify-between h-20 px-10 md:px-14">
          
          {/* LOGO: Text ki jagah image laga di hai  */}
          <Link href="/" className="flex items-center group transition-transform hover:scale-105">
            <Image 
              src="/images/Tex.png" 
              alt="Logo" 
              width={130} 
              height={45} 
              className="object-contain"
              priority 
            />
          </Link>

          {/* DESKTOP MENU [cite: 372] */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-[12px] uppercase tracking-widest font-[900] text-black hover:text-blue-600 transition-all">Home</Link>
            
            <DropdownMenu 
              title="Our Service" 
              items={services} 
              active={activeDropdown === 'services'} 
              setActive={() => setActiveDropdown('services')} 
              clearActive={() => setActiveDropdown(null)} 
            />

            <DropdownMenu 
              title="Marketing" 
              items={marketing} 
              active={activeDropdown === 'marketing'} 
              setActive={() => setActiveDropdown('marketing')} 
              clearActive={() => setActiveDropdown(null)} 
            />

            <DropdownMenu 
              title="Tools" 
              items={tools} 
              active={activeDropdown === 'tools'} 
              setActive={() => setActiveDropdown('tools')} 
              clearActive={() => setActiveDropdown(null)} 
            />
          </div>

          {/* LOGIN [cite: 372] */}
          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden md:block bg-black text-white px-10 py-3.5 rounded-full text-[11px] font-[900] uppercase tracking-[0.15em] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95">
              Login //
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable Dropdown Component [cite: 372]
function DropdownMenu({ title, items, active, setActive, clearActive }) {
  return (
    <div className="relative py-2" onMouseEnter={setActive} onMouseLeave={clearActive}>
      <button className="flex items-center gap-1 text-[12px] uppercase tracking-widest font-[900] text-black hover:text-blue-600 transition-all">
        {title} <FiChevronDown className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4 transition-all duration-300 ${active ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-4 space-y-1">
          {items.map((item) => (
            <Link key={item.name} href={item.href} className="block px-4 py-3 text-[11px] font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PremiumAINavbar;