"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { ChatbotPanel } from "../components/ChatbotPanel";
import { 
  Printer, 
  Sparkles, 
  Bot, 
  Database, 
  History, 
  Terminal, 
  Clock, 
  ArrowRight,
  Zap,
  HelpCircle
} from "lucide-react";

export function Analytics() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [selectedDataset, setSelectedDataset] = useState("employees_db");

  // Simulated Query History Sidebar
  const savedQueries = [
    { id: "Q-201", title: "Departmental Salary Averages", query: "Show average salary by department", dataset: "employees_db", rows: 5, time: "14:22" },
    { id: "Q-202", title: "Top 10 High Value Transactions", query: "Find top 10 highest transactions", dataset: "financial_transactions", rows: 10, time: "12:05" },
    { id: "Q-203", title: "Active Employees On Leave", query: "List active employees on leave", dataset: "employees_db", rows: 12, time: "09:40" },
    { id: "Q-204", title: "Quarterly Onboarding Trends", query: "Summarize quarterly onboarding trend", dataset: "employees_db", rows: 6, time: "Yesterday" },
    { id: "Q-205", title: "High Spend Outlier Detection", query: "Detect outliers in spend exceeding 99th percentile", dataset: "financial_transactions", rows: 142, time: "3 days ago" }
  ];

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      
      {/* Top Bar: Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 font-sans">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>AI Query Copilot</span>
            <span className="p-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-extrabold uppercase tracking-wider shadow-sm animate-pulse">
              Gemini 2.5 Flash
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-white/50 font-medium mt-0.5">Conversational SQL synthesis, automated execution & visual intelligence</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#09090c] border border-white/10 text-xs font-extrabold text-white hover:bg-white/10 transition-all shadow-inner hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span>Export Chat PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Chatbot Panel (Left 8 Spans) & Query History / Docs (Right 4 Spans) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
        
        {/* Left Column: AI Chatbot Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 w-full"
        >
          <ChatbotPanel initialDataset={selectedDataset} />
        </motion.div>

        {/* Right Column: Query History & Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-4 space-y-6 w-full"
        >
          {/* Saved Queries Card */}
          <div className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform duration-300">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">Saved Neural Queries</h3>
                  <p className="text-xs text-white/50 font-medium">Quick execution bookmarks</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-white/60 font-bold">
                5 Bookmarks
              </span>
            </div>

            <div className="space-y-3">
              {savedQueries.map((q) => (
                <div key={q.id} className="p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all duration-300 shadow-sm group/item cursor-pointer hover:scale-101">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-xs font-extrabold text-white group-hover/item:text-purple-400 transition-colors truncate">{q.title}</span>
                    <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-white/10 text-white/80 shrink-0">{q.id}</span>
                  </div>
                  <p className="text-xs text-white/60 truncate font-medium mb-2">{q.query}</p>
                  
                  <div className="flex items-center justify-between text-[10px] text-white/40 font-semibold pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Database className="w-3 h-3 text-purple-400" />
                      <span>{q.dataset} ({q.rows} rows)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>{q.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
          </div>

          {/* Quick Documentation Widget */}
          <div className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">Copilot Guidelines</h3>
                <p className="text-xs text-white/50 font-medium">Tips for optimal SQL synthesis</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-white/70 font-medium bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
              <li className="flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Specify exact column names when known (e.g., 'filter by department').</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Use keywords like 'top 10', 'average', or 'distribution' for best chart results.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Copilot automatically protects your database against destructive queries (DROP/DELETE).</span>
              </li>
            </ul>

            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
          </div>
        </motion.div>

      </div>

    </DashboardLayout>
  );
}

export default Analytics;
