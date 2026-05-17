"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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
import { 
  TrendingUp, 
  BarChart2, 
  PieChart as PieChartIcon, 
  Activity, 
  Sparkles, 
  RefreshCw, 
  Database, 
  ChevronDown, 
  AlertCircle, 
  Loader2 
} from "lucide-react";

const availableDatasets = [
  { id: "employees_db", name: "employees_db" },
  { id: "financial_transactions", name: "financial_transactions" },
  { id: "healthcare_records", name: "healthcare_records" },
  { id: "ecom_users", name: "ecom_users" },
  { id: "supply_chain_logs", name: "supply_chain_logs" },
];

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#6366f1"];

export function ChartsSection({ initialDataset = "employees_db" }) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(initialDataset);
  const [recommendedCharts, setRecommendedCharts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);

  useEffect(() => setIsMounted(true), []);

  // Fetch Recommended Charts from FastAPI Backend
  const fetchChartRecommendations = async (datasetName) => {
    setIsLoading(true);
    setError(null);
    setIsSimulated(false);

    try {
      // Connect to FastAPI backend endpoint: POST /analytics/recommend-charts
      const response = await axios.post("http://localhost:8000/analytics/recommend-charts", {
        table_name: datasetName
      });

      if (response.data && response.data.charts) {
        setRecommendedCharts(response.data.charts);
      } else {
        throw new Error("Invalid chart recommendation response from server.");
      }
    } catch (err) {
      console.error("FastAPI /analytics/recommend-charts Error:", err);

      // Fallback simulation mode if FastAPI backend is offline / CORS error
      const isNetworkError = err.message.includes("Network Error") || err.code === "ERR_NETWORK";
      
      console.warn("Simulating Chart Recommendation Mode - FastAPI Backend Offline or Table Not Found");
      setIsSimulated(true);

      // Simulated Fallback Chart Configs matching exact requirements
      const fallbackCharts = [
        {
          id: "sim_bar_dept_salary",
          type: "bar",
          title: `Average Salary by Department (${datasetName})`,
          description: "Compares average compensation across top operational departments.",
          xAxisKey: "department",
          yAxisKey: "avg_salary",
          data: [
            { department: "Engineering", avg_salary: 142500 },
            { department: "Machine Learning", avg_salary: 158200 },
            { department: "Product", avg_salary: 138000 },
            { department: "Sales", avg_salary: 112400 },
            { department: "Marketing", avg_salary: 95400 },
          ]
        },
        {
          id: "sim_pie_status",
          type: "pie",
          title: `Employee Status Distribution (${datasetName})`,
          description: "Proportional breakdown of workforce operational status.",
          nameKey: "status",
          dataKey: "count",
          data: [
            { status: "Active", count: 850 },
            { status: "On Leave", count: 120 },
            { status: "Remote", count: 210 },
            { status: "Contract", count: 60 },
          ]
        },
        {
          id: "sim_line_hiring",
          type: "line",
          title: `Quarterly Onboarding Trend (${datasetName})`,
          description: "Sequential tracking of employee onboarding over recent quarters.",
          xAxisKey: "quarter",
          yAxisKey: "onboarded",
          data: [
            { quarter: "Q1 2025", onboarded: 45 },
            { quarter: "Q2 2025", onboarded: 68 },
            { quarter: "Q3 2025", onboarded: 92 },
            { quarter: "Q4 2025", onboarded: 115 },
            { quarter: "Q1 2026", onboarded: 140 },
            { quarter: "Q2 2026", onboarded: 165 },
          ]
        }
      ];

      setRecommendedCharts(fallbackCharts);
      if (!isNetworkError) {
        setError(err.response?.data?.detail || err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartRecommendations(selectedDataset);
  }, [selectedDataset]);

  if (!isMounted) {
    return (
      <div className="space-y-6 mt-8 animate-pulse">
        <div className="h-20 bg-white/5 rounded-2xl border border-white/5" />
        <div className="h-[420px] bg-white/5 rounded-2xl border border-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[380px] bg-white/5 rounded-2xl border border-white/5" />
          <div className="h-[380px] bg-white/5 rounded-2xl border border-white/5" />
        </div>
      </div>
    );
  }

  // Custom Glassmorphic Tooltip for Recharts
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
      {/* Section Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-lg font-bold text-white tracking-tight">AI-Powered Chart Recommendation System</h2>
              {isSimulated && (
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Simulated Mode</span>
                </span>
              )}
            </div>
            <p className="text-xs text-white/50">Automated column detection (numeric & categorical) & Recharts config generation</p>
          </div>
        </div>

        {/* Dataset Selector & Refresh Button */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#09090c] border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all shadow-inner group"
            >
              <Database className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>{selectedDataset}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-white/10 mb-1">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Select Dataset</p>
                </div>
                {availableDatasets.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => {
                      setSelectedDataset(ds.id);
                      setShowDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs transition-colors ${
                      selectedDataset === ds.id 
                        ? "bg-blue-600/20 text-blue-400 font-bold border-l-4 border-blue-500" 
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{ds.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => fetchChartRecommendations(selectedDataset)}
            disabled={isLoading}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors shadow-sm disabled:opacity-50"
            title="Regenerate Charts"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && !isSimulated && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-xs text-red-400 font-bold animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-[400px] bg-white/5 border border-white/5 rounded-2xl p-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[380px] bg-white/5 border border-white/5 rounded-2xl p-6" />
            <div className="h-[380px] bg-white/5 border border-white/5 rounded-2xl p-6" />
          </div>
        </div>
      ) : recommendedCharts && recommendedCharts.length > 0 ? (
        <div className="space-y-6">
          
          {/* Top Section: First Recommended Chart (Usually Line or Bar) */}
          {recommendedCharts[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-inner">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-white tracking-tight">{recommendedCharts[0].title}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full uppercase tracking-wider">
                        {recommendedCharts[0].type} chart
                      </span>
                    </div>
                    <p className="text-xs text-white/50">{recommendedCharts[0].description}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>AI Recommended</span>
                </span>
              </div>

              {/* Dynamic Chart Container */}
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {recommendedCharts[0].type === "line" ? (
                    <LineChart data={recommendedCharts[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey={recommendedCharts[0].xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "16px", fontSize: "12px", color: "#a3a3a3" }} />
                      <Line 
                        type="monotone" 
                        dataKey={recommendedCharts[0].yAxisKey} 
                        name={recommendedCharts[0].yAxisKey.replace('_', ' ').toUpperCase()} 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: "#3b82f6", stroke: "#050505", strokeWidth: 2 }} 
                        activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} 
                        animationDuration={1000}
                      />
                    </LineChart>
                  ) : recommendedCharts[0].type === "bar" ? (
                    <BarChart data={recommendedCharts[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey={recommendedCharts[0].xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "16px", fontSize: "12px", color: "#a3a3a3" }} />
                      <Bar 
                        dataKey={recommendedCharts[0].yAxisKey} 
                        name={recommendedCharts[0].yAxisKey.replace('_', ' ').toUpperCase()} 
                        fill="#3b82f6" 
                        radius={[8, 8, 0, 0]} 
                        animationDuration={1000} 
                      />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={recommendedCharts[0].data}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={6}
                        dataKey={recommendedCharts[0].dataKey}
                        nameKey={recommendedCharts[0].nameKey}
                        animationDuration={1000}
                      >
                        {recommendedCharts[0].data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#a3a3a3" }} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Bottom Grid: Remaining Recommended Charts (Usually Bar and Pie) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedCharts.slice(1).map((chart, idx) => {
              const isBar = chart.type === "bar";
              const isPie = chart.type === "pie";
              const isLine = chart.type === "line";
              const colorTheme = idx % 2 === 0 ? "purple" : "pink";

              return (
                <motion.div 
                  key={chart.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-${colorTheme}-500/10 rounded-full blur-3xl -z-10 pointer-events-none`} />

                  <div>
                    <div className="flex items-center justify-between mb-1 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-${colorTheme}-500/20 text-${colorTheme}-400 border border-${colorTheme}-500/30`}>
                          {isBar ? <BarChart2 className="w-5 h-5" /> : isPie ? <PieChartIcon className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                        </div>
                        <h3 className="text-base font-bold text-white tracking-tight">{chart.title}</h3>
                      </div>
                      <span className={`text-[10px] font-bold text-${colorTheme}-400 bg-${colorTheme}-500/10 border border-${colorTheme}-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                        {chart.type}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mb-6 mt-2">{chart.description}</p>
                  </div>

                  <div className="h-[280px] w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      {isBar ? (
                        <BarChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey={chart.xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey={chart.yAxisKey} name={chart.yAxisKey.replace('_', ' ').toUpperCase()} fill={idx % 2 === 0 ? "#8b5cf6" : "#ec4899"} radius={[8, 8, 0, 0]} animationDuration={1000} />
                        </BarChart>
                      ) : isPie ? (
                        <PieChart>
                          <Pie
                            data={chart.data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={6}
                            dataKey={chart.dataKey}
                            nameKey={chart.nameKey}
                            animationDuration={1000}
                          >
                            {chart.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#a3a3a3" }} />
                        </PieChart>
                      ) : (
                        <LineChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey={chart.xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey={chart.yAxisKey} name={chart.yAxisKey.replace('_', ' ').toUpperCase()} stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: "#8b5cf6" }} animationDuration={1000} />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                    <span>Generated Config ID</span>
                    <span className="font-mono text-white/80">{chart.id}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      ) : null}

    </div>
  );
}

export default ChartsSection;
