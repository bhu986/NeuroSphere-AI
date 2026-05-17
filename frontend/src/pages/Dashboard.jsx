"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { SummaryCards } from "../components/SummaryCards";
import { ChartsSection } from "../components/ChartsSection";
import { AIInsights } from "../components/AIInsights";
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Download, 
  ArrowRight,
  Database,
  Search,
  Filter,
  Plus
} from "lucide-react";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Padding Container */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-8">
          {/* Welcome Banner / Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  Welcome back, Admin
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  <span>AI Active</span>
                </span>
              </div>
              <p className="text-sm text-white/60">
                Here is the real-time telemetry and AI indexing status for your datasets.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-start md:self-center">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>May 17, 2026</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5">
                <Plus className="w-4 h-4" />
                <span>Upload Dataset</span>
              </button>
            </div>
          </div>

          {/* 4 Analytics Summary Cards */}
          <SummaryCards />

          {/* Interactive Charts Section */}
          <ChartsSection />

          {/* AI Insights & Copilot Panel */}
          <AIInsights />

          {/* Recent Activity / Quick Upload Footer Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
          >
            {/* Quick Upload Widget */}
            <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl group hover:border-blue-500/30 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white tracking-tight">Fast Upload</h3>
                  <Database className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-white/50 mb-4">
                  Instantly vectorize CSV or Excel files for AI querying.
                </p>

                <div className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-xl p-6 text-center transition-colors cursor-pointer group/drop bg-white/[0.02] hover:bg-blue-500/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2 group-hover/drop:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-xs font-bold text-white mb-1">Click to upload or drag & drop</p>
                  <p className="text-[10px] text-white/40">CSV, XLSX up to 500MB</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span>Secure 256-bit encryption</span>
                <span className="text-blue-400 font-bold">100% SLA</span>
              </div>
            </div>

            {/* Live System Telemetry / Activity Feed */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">System Telemetry</h3>
                    <p className="text-xs text-white/50">Real-time database operations & AI model calls</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    All Systems Operational
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, action: "Natural Language SQL Query generated", target: "Finance_Q1", time: "2m ago", status: "Success", latency: "142ms" },
                    { id: 2, action: "Vector Embedding created", target: "Healthcare_Records", time: "14m ago", status: "Success", latency: "840ms" },
                    { id: 3, action: "Automatic Index Optimization", target: "Ecom_Users", time: "1h ago", status: "Success", latency: "45ms" },
                  ].map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="font-bold text-white">{log.action}</p>
                          <p className="text-[10px] text-white/50">Target: {log.target}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <p className="text-white font-semibold">{log.latency}</p>
                          <p className="text-[10px] text-white/40">{log.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/50">Showing last 3 events</span>
                <button className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 group/link">
                  <span>View Full Telemetry</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
