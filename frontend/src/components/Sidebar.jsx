"use client";

import React from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Cpu, 
  Bot, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Zap,
  X
} from "lucide-react";

export function Sidebar({ isOpen, onClose, activeTab = "dashboard", setActiveTab }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "datasets", label: "Datasets", icon: Database, badge: "148" },
    { id: "models", label: "AI Models", icon: Cpu, badge: "Pro" },
    { id: "copilot", label: "Query Copilot", icon: Bot, isNew: true },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#09090c]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-4 transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="space-y-6">
          {/* Mobile Header / Close Button */}
          <div className="flex items-center justify-between lg:hidden px-2 py-1">
            <span className="text-sm font-bold text-white tracking-wider">NAVIGATION</span>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 hidden lg:block">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (setActiveTab) setActiveTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10" 
                      : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? "text-blue-400" : "text-white/50 group-hover:text-white"
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badge === "Pro" 
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm"
                          : "bg-white/10 text-white/80"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.isNew && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold animate-pulse">
                        NEW
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 text-white/30 group-hover:text-white/60 transition-transform ${
                      isActive ? "translate-x-0.5 text-blue-400" : ""
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Premium Card & Help */}
        <div className="space-y-4">
          {/* Pro Upgrade Card */}
          <div className="relative p-4 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide uppercase">Enterprise AI</span>
            </div>
            
            <p className="text-xs text-white/70 mb-3 leading-relaxed">
              Unlock unlimited AI queries & advanced predictive modeling.
            </p>
            
            <button className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5">
              Upgrade Plan
            </button>
          </div>

          {/* Help & Docs */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/50 px-2">
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Help & Docs</span>
            </button>
            <span>v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
