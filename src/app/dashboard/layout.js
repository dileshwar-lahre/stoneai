"use client";
import { useState } from 'react';
import Navbar from './components/Navbar'; // Tera Premium Navbar
import Sidebar from './components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar section with high z-index [cite: 180, 184] */}
      <div className="relative z-[60]">
        <Navbar />
      </div>

      <div className="flex">
        {/* Sidebar sync with state [cite: 67, 180] */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content: pt-40 taaki content navbar ke niche se start ho  */}
        <main className={`flex-1 pt-40 px-8 transition-all duration-300 ${isSidebarOpen ? "ml-80" : "ml-0"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}