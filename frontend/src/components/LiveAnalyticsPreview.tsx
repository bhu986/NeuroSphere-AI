"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip } from "recharts";
import { BarChart3, LineChart, PieChart as PieIcon, Sparkles, Filter, ShieldCheck, Zap } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const revenueData = [
  { month: "Jan", actual: 4000, target: 2400 },
  { month: "Feb", actual: 5500, target: 3000 },
  { month: "Mar", actual: 8200, target: 4500 },
  { month: "Apr", actual: 11000, target: 6000 },
  { month: "May", actual: 14245, target: 8000 },
];

const anomalyData = [
  { category: "Normal Recs", count: 14200000 },
  { category: "Isolated Outliers", count: 45800 },
  { category: "Cleaned Nulls", count: 12400 },
];

const latencyData = [
  { query: "SELECT AVG(salary)", latency: 8 },
  { query: "SELECT * ORDER BY amount", latency: 12 },
  { query: "SELECT GROUP BY dept", latency: 11 },
  { query: "SELECT JOIN transactions", latency: 14 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899"];

export function LiveAnalyticsPreview() {
  const [activeTab, setActiveTab] = useState<"revenue" | "anomaly" | "latency">("revenue");

  return (
    <section id="preview" className="py-32 relative overflow-hidden bg-black/40 border-y border-white/10">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-extrabold text-blue-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Telemetry</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Experience Live <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Autonomous Visualizations
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Interact with our high-fidelity Recharts engine. Switch between predictive revenue models, anomaly isolation clusters, and execution latency benchmarks.
          </motion.p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {[
            { id: "revenue", label: "Predictive Revenue Trend", icon: LineChart },
            { id: "anomaly", label: "Anomaly Isolation Matrix", icon: PieIcon },
            { id: "latency", label: "Query Execution Latency", icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <MagneticWrapper key={tab.id} pull={0.15}>
                <button
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-full border text-xs font-extrabold transition-all duration-300 flex items-center gap-2.5 shadow-lg ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-transparent shadow-blue-500/25 scale-105" 
                      : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              </MagneticWrapper>
            );
          })}
        </div>

        {/* Chart Showcase Card */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 bg-[#09090c]/90 backdrop-blur-3xl relative overflow-hidden max-w-5xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 shadow-sm">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  {activeTab === "revenue" && "Annual Revenue Expansion Model"}
                  {activeTab === "anomaly" && "PostgreSQL Data Quality Distribution"}
                  {activeTab === "latency" && "AST SQL Execution Latency Benchmarks"}
                </h3>
                <p className="text-xs text-white/50 font-medium">Real-time simulation powered by Recharts & Framer Motion</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 font-extrabold">LIVE STREAM</span>
            </div>
          </div>

          {/* Dynamic Recharts Render */}
          <div className="h-[400px] w-full relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                {activeTab === "revenue" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} tickLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f0f12", borderColor: "#ffffff20", borderRadius: "16px", color: "#fff", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Actual ARR" />
                      <Area type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTarget)" name="Target ARR" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {activeTab === "anomaly" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={anomalyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={150}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="category"
                        label={({ category, percent }) => `${category} (${(percent * 100).toFixed(1)}%)`}
                      >
                        {anomalyData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f0f12", borderColor: "#ffffff20", borderRadius: "16px", color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {activeTab === "latency" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latencyData}>
                      <XAxis dataKey="query" stroke="#ffffff40" fontSize={12} tickLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} tickFormatter={(val) => `${val}ms`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f0f12", borderColor: "#ffffff20", borderRadius: "16px", color: "#fff" }}
                        cursor={{ fill: "#ffffff0a" }}
                      />
                      <Bar dataKey="latency" fill="#10b981" radius={[8, 8, 0, 0]} name="Execution Latency (ms)" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Read-only PostgreSQL execution guarantee. Zero impact on production tables.</span>
            </div>
            <button 
              onClick={() => window.location.href = "/dashboard"}
              className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold transition-all shadow-sm"
            >
              Open Full Dashboard
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default LiveAnalyticsPreview;
