import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Cpu, 
  Bot, 
  Settings, 
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Zap,
  X,
  Sparkles
} from "lucide-react";

export function Sidebar({ isOpen, onClose, activeTab = "dashboard", setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-300"
        />
      )}

      {/* Sidebar Container */}
      <motion.aside 
        animate={{ width: isCollapsed ? 84 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen bg-[#09090c]/90 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-4 transition-all duration-400 ease-out shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="space-y-6">
          {/* Mobile Header / Close Button */}
          <div className="flex items-center justify-between lg:hidden px-2 py-1 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-sm font-extrabold text-white tracking-tight">NeuroSphere AI</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Logo & Collapse Toggle */}
          <div className="hidden lg:flex items-center justify-between px-2 py-1 border-b border-white/5 pb-3 gap-2">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
              >
                <div className="p-1.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-sm font-black text-white tracking-tight">NeuroSphere AI</span>
              </motion.div>
            )}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors mx-auto shrink-0"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-1.5">
            {!isCollapsed && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 text-[11px] font-extrabold text-white/40 uppercase tracking-wider mb-3 hidden lg:block whitespace-nowrap overflow-hidden"
              >
                Main Navigation
              </motion.p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (setActiveTab) setActiveTab(item.id);
                    if (onClose) onClose();
                    if (item.id === "dashboard") window.location.href = "/dashboard";
                    if (item.id === "analytics" || item.id === "copilot") window.location.href = "/analytics";
                    if (item.id === "datasets") window.location.href = "/upload";
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? "text-white shadow-xl shadow-blue-500/10" 
                      : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Active Gradient Background */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/10 border border-blue-500/30 rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-3.5 z-10 min-w-0">
                    <div className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
                      isActive 
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20" 
                        : "bg-white/5 text-white/50 group-hover:text-white group-hover:bg-white/10 border border-white/5"
                    }`}>
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </div>
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="tracking-tight whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 z-10 shrink-0"
                    >
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shadow-sm ${
                          item.badge === "Pro" 
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-purple-500/30"
                            : "bg-white/10 text-white/80 border border-white/10"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold animate-pulse shadow-lg shadow-emerald-500/20">
                          NEW
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 text-white/30 group-hover:text-white/60 transition-transform duration-300 ${
                        isActive ? "translate-x-1 text-blue-400" : ""
                      }`} />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Premium Pro Upgrade Card */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div 
                key="expanded-pro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-5 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 overflow-hidden group shadow-2xl text-left"
              >
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30 animate-bounce">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-extrabold text-white tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-orange-300">
                    Enterprise AI Plan
                  </span>
                </div>
                
                <p className="text-xs text-white/70 mb-4 leading-relaxed font-medium">
                  Unlock unlimited neural queries, predictive forecasting & dedicated vector clusters.
                </p>
                
                <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:-translate-y-0.5 scale-100 hover:scale-102">
                  Upgrade Plan
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="collapsed-pro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-center p-2 cursor-pointer"
                onClick={() => setIsCollapsed(false)}
                title="View Enterprise Details"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 text-white shadow-xl shadow-orange-500/30 animate-bounce">
                  <Zap className="w-4 h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help & Docs */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50 px-2 font-medium min-w-0">
            <button className="flex items-center gap-2 hover:text-white transition-colors min-w-0">
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
              {!isCollapsed && <span className="truncate">Help & Documentation</span>}
            </button>
            {!isCollapsed && <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md shrink-0">v2.4.0</span>}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
    </>
  );
}

export default Sidebar;
