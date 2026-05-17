"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { DashboardNavbar as Navbar } from "./DashboardNavbar";

export function DashboardLayout({ children, activeTab = "dashboard", setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans">
      
      {/* Futuristic Floating Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-[160px] -z-10 pointer-events-none animate-[pulse_6s_infinite]" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/15 via-pink-600/10 to-blue-600/15 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-[180px] -z-10 pointer-events-none" />

      {/* Subtle Noise Texture for Premium Depth */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-50"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Main Navigation Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden w-full max-w-[100vw]">
        
        {/* Sticky Top Navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Animated Page Content Wrapper */}
        <AnimatePresence mode="wait">
          <motion.main 
            key={activeTab}
            initial={{ opacity: 0, y: 25, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1650px] w-full mx-auto space-y-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default DashboardLayout;
