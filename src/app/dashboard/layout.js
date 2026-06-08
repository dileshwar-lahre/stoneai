"use client";
import { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // 1. Yahan bg-white hata kar absolute black (#000000) kar diya hai
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      
      {/* Navbar section with high z-index */}
      <div className="relative z-[60]">
        {/* Tumhara transparent navbar yahan automatically inject ho raha hoga layout chain se */}
      </div>

      {/* 2. Is central flex area ka background bhi black lock kar diya */}
      <div className="flex bg-[#000000]">
        
        {/* Sidebar sync with state */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* 3. Main Content: Isme bhi bg-[#000000] fix kar diya taaki leaks wagera saaf dikhein */}
        <main 
          className={`flex-1 min-h-screen bg-[#000000] pt-40 px-8 transition-all duration-300 ${
            isSidebarOpen ? "ml-80" : "ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}