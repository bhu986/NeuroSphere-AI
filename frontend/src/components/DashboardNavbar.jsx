"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Search, 
  Sparkles, 
  Menu, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Command,
  Database
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function DashboardNavbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/70 backdrop-blur-2xl border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all duration-300 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between gap-4 max-w-[1650px] mx-auto w-full">
        
        {/* Left side: Mobile menu button & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight group-hover:from-white group-hover:to-white transition-all duration-300">
                NeuroSphere <span className="text-blue-400 font-black">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full shadow-sm">
                Enterprise 2.0
              </span>
            </div>
          </div>
        </div>

        {/* Center: Interactive Search Bar */}
        <div className="flex-1 max-w-lg hidden md:block mx-4">
          <div className="relative group">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400 transition-colors duration-300" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setTimeout(() => setIsSearching(false), 200)}
              placeholder="Search datasets, AI models, natural language queries (⌘K)..." 
              className="w-full bg-[#09090c]/90 border border-white/10 rounded-2xl py-2.5 pl-11 pr-16 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-[10px] font-extrabold text-white/40 bg-white/5 border border-white/10 px-2 py-1 rounded-lg pointer-events-none shadow-sm">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>

            {/* Simulated Search Dropdown */}
            <AnimatePresence>
              {isSearching && searchQuery.trim() && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl"
                >
                  <div className="px-4 py-2 border-b border-white/10 mb-1">
                    <p className="text-[10px] text-white/40 uppercase font-extrabold tracking-wider">Search Results for "{searchQuery}"</p>
                  </div>
                  <button 
                    onClick={() => window.location.href = "/analytics"}
                    className="w-full flex items-center justify-between px-4 py-3 text-xs text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate font-semibold">Query Copilot: "{searchQuery}"</span>
                    </div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md font-bold shrink-0">Ask AI</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = "/upload"}
                    className="w-full flex items-center justify-between px-4 py-3 text-xs text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Database className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="truncate font-semibold">Dataset matches for "{searchQuery}"</span>
                    </div>
                    <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md font-bold shrink-0">14 Tables</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side: Actions & Profile */}
        <div className="flex items-center gap-3.5">
          <button className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-sm">
            <Search className="w-5 h-5" />
          </button>

          <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group shadow-sm hover:scale-105">
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-black animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-black shadow-lg shadow-blue-500/50" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group shadow-sm hover:scale-102"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-xs font-black text-white shadow-md shadow-purple-500/20 group-hover:rotate-6 transition-transform duration-300 animate-[pulse_5s_infinite]">
                {user?.email ? user.email.substring(0, 2).toUpperCase() : "NS"}
              </div>
              <span className="text-sm font-bold text-white/90 hidden sm:block group-hover:text-white transition-colors">
                {user?.name || (user?.email ? user.email.split("@")[0] : "Admin User")}
              </span>
              <ChevronDown className="w-4 h-4 text-white/50 hidden sm:block group-hover:text-white transition-colors duration-300" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl"
                >
                  <div className="px-4 py-3 border-b border-white/10 mb-1 bg-white/[0.02]">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-extrabold mb-0.5">Signed in as</p>
                    <p className="text-sm font-extrabold text-white truncate">{user?.email || "admin@neurosphere.ai"}</p>
                  </div>
                  <a href="#profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                    <User className="w-4 h-4 text-blue-400" />
                    <span>Your Profile</span>
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                    <Settings className="w-4 h-4 text-purple-400" />
                    <span>Account Settings</span>
                  </a>
                  <div className="my-1 border-t border-white/10" />
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
