"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { TrendingUp, BarChart2, PieChart as PieChartIcon, Activity, Sparkles, RefreshCw } from "lucide-react";

// Dummy Analytics Data
const lineData = [
  { month: "Jan", queries: 14200, latency: 240 },
  { month: "Feb", queries: 28500, latency: 210 },
  { month: "Mar", queries: 42100, latency: 180 },
  { month: "Apr", queries: 58900, latency: 165 },
  { month: "May", queries: 74200, latency: 145 },
  { month: "Jun", queries: 89400, latency: 120 },
  { month: "Jul", queries: 108200, latency: 95 },
];

const barData = [
  { domain: "Finance", volume: 38500 },
  { domain: "Healthcare", volume: 29200 },
  { domain: "E-commerce", volume: 45100 },
  { domain: "Logistics", volume: 18400 },
  { domain: "Marketing", volume: 24800 },
];

const pieData = [
  { name: "Gemini 3 Flash", value: 45 },
  { name: "GPT-4o", value: 25 },
  { name: "Claude 3.5", value: 18 },
  { name: "Custom Vector", value: 12 },
];

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];

export function ChartsSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeMetric, setActiveMetric] = useState("queries");

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <div className="space-y-6 mt-8">
        <div className="h-[420px] bg-white/5 rounded-2xl animate-pulse border border-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[380px] bg-white/5 rounded-2xl animate-pulse border border-white/5" />
          <div className="h-[380px] bg-white/5 rounded-2xl animate-pulse border border-white/5" />
        </div>
      </div>
    );
  }

  // Custom Glassmorphic Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#09090c]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
          <p className="text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6 text-xs my-1">
              <span className="flex items-center gap-2 text-white/80">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                {entry.name.toLowerCase().includes('latency') ? ' ms' : ''}
                {entry.name.toLowerCase().includes('share') || entry.unit === '%' ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Top Section: Line Chart (Query Volume & Performance) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-inner">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg font-bold text-white tracking-tight">AI Query Volume & Latency Trend</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                  Real-time
                </span>
              </div>
              <p className="text-xs text-white/50">Monitoring automated SQL generation queries and AI model response latency</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-medium">
              <button 
                onClick={() => setActiveMetric("queries")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeMetric === "queries" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Volume
              </button>
              <button 
                onClick={() => setActiveMetric("latency")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeMetric === "latency" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Latency
              </button>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                align="right" 
                wrapperStyle={{ paddingBottom: "16px", fontSize: "12px", color: "#a3a3a3" }} 
              />
              {activeMetric === "queries" ? (
                <Line 
                  type="monotone" 
                  dataKey="queries" 
                  name="AI Queries" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#3b82f6", stroke: "#050505", strokeWidth: 2 }} 
                  activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} 
                  animationDuration={1000}
                />
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  name="Avg Latency (ms)" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#8b5cf6", stroke: "#050505", strokeWidth: 2 }} 
                  activeDot={{ r: 8, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
                  animationDuration={1000} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Bar Chart (Domain Distribution) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">Query Volume by Domain</h3>
              </div>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.2%</span>
              </span>
            </div>
            <p className="text-xs text-white/50 mb-6 ml-12">Distribution of AI database queries across industry sectors</p>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="domain" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" name="Query Volume" fill="#8b5cf6" radius={[8, 8, 0, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Highest demand sector</span>
            <span className="text-white font-bold">E-commerce (45,100 queries)</span>
          </div>
        </motion.div>

        {/* Right: Pie Chart (AI Model Utilization) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  <PieChartIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">AI Model Utilization</h3>
              </div>
              <span className="text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Optimized</span>
              </span>
            </div>
            <p className="text-xs text-white/50 mb-6 ml-12">Active LLM share for natural language SQL generation</p>
          </div>

          <div className="h-[280px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="value"
                  nameKey="name"
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#a3a3a3" }} 
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Donut Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-4">
              <p className="text-2xl font-extrabold text-white tracking-tight">100%</p>
              <p className="text-[10px] text-white/50 uppercase font-semibold tracking-wider">Total Share</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Primary Model</span>
            <span className="text-blue-400 font-bold">Gemini 3 Flash (45%)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ChartsSection;
