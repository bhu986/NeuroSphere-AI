"use client";

import React from "react";
import { 
  Bell, 
  Search, 
  Sparkles, 
  Menu, 
  User, 
  Settings, 
  LogOut,
  ChevronDown
} from "lucide-react";

export function Navbar({ onToggleSidebar }) {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/40 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Mobile menu button & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                NeuroSphere <span className="text-blue-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
                Enterprise
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block mx-4">
          <div className="relative group">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search datasets, AI models, queries..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 text-[10px] text-white/40 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
              <span>⌘</span><span>K</span>
            </div>
          </div>
        </div>

        {/* Right side: Actions & Profile */}
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors group">
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-black animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-black" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-purple-500/20">
                NS
              </div>
              <span className="text-sm font-medium text-white/90 hidden sm:block group-hover:text-white transition-colors">
                Admin User
              </span>
              <ChevronDown className="w-4 h-4 text-white/50 hidden sm:block group-hover:text-white transition-colors" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Signed in as</p>
                  <p className="text-sm font-bold text-white truncate">admin@neurosphere.ai</p>
                </div>
                <a href="#profile" className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Your Profile</span>
                </a>
                <a href="#settings" className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                  <Settings className="w-4 h-4 text-purple-400" />
                  <span>Account Settings</span>
                </a>
                <div className="my-1 border-t border-white/10" />
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
