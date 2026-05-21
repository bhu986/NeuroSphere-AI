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
  AreaChart,
  Area,
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
  Filter,
  Search,
  Layers
} from "lucide-react";

const availableDatasets = [
  { id: "Global_Superstore2", name: "Global_Superstore2" },
  { id: "Titanic-Dataset", name: "Titanic-Dataset" },
  { id: "employees_db", name: "employees_db" },
  { id: "financial_transactions", name: "financial_transactions" },
  { id: "healthcare_records", name: "healthcare_records" },
  { id: "ecom_users", name: "ecom_users" },
  { id: "supply_chain_logs", name: "supply_chain_logs" },
];

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#6366f1"];

export function AnimatedCharts({ initialDataset = "Global_Superstore2" }) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(initialDataset);
  const [recommendedCharts, setRecommendedCharts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicDatasets, setDynamicDatasets] = useState(availableDatasets);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setSelectedDataset(initialDataset);
    if (initialDataset && !dynamicDatasets.find(d => d.id === initialDataset)) {
      setDynamicDatasets(prev => [{ id: initialDataset, name: initialDataset }, ...prev]);
    }
  }, [initialDataset]);

  // Fetch Recommended Charts from FastAPI Backend
  const fetchChartRecommendations = async (datasetName) => {
    setIsLoading(true);
    setError(null);
    setIsSimulated(false);

    try {
      console.log(`[NeuroSphere] Fetching chart recommendations for: ${datasetName}`);
      const response = await axios.post("http://localhost:8000/analytics/recommend-charts", {
        table_name: datasetName
      }, { timeout: 3000 });

      console.log(`[NeuroSphere] Chart API response:`, response.data);

      if (response.data && response.data.charts && response.data.charts.length > 0) {
        setRecommendedCharts(response.data.charts);
        console.log(`[NeuroSphere] Loaded ${response.data.charts.length} charts successfully.`);
      } else {
        throw new Error(`No charts generated for dataset '${datasetName}'. Activating fallback.`);
      }
    } catch (err) {
      console.error("[NeuroSphere] /analytics/recommend-charts Error:", err.message);
      console.warn("[NeuroSphere] Activating Simulated Chart Fallback Mode");
      setIsSimulated(true);
      // Always set fallback charts to ensure the user sees something
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
        },
        {
          id: "sim_area_budget",
          type: "area",
          title: `Budget vs Spend Comparison (${datasetName})`,
          description: "Comparative area distribution of allocated budget and actual spend.",
          xAxisKey: "department",
          yAxisKey: "spend",
          secondaryYAxisKey: "budget",
          data: [
            { department: "Eng", spend: 420000, budget: 450000 },
            { department: "ML", spend: 650000, budget: 600000 },
            { department: "Prod", spend: 280000, budget: 300000 },
            { department: "Sales", spend: 520000, budget: 500000 },
            { department: "Mktg", spend: 310000, budget: 350000 },
          ]
        }
      ];

      setRecommendedCharts(fallbackCharts);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
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
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[#09090c]/80 rounded-3xl border border-white/5" />
        <div className="h-[420px] bg-[#09090c]/80 rounded-3xl border border-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[380px] bg-[#09090c]/80 rounded-3xl border border-white/5" />
          <div className="h-[380px] bg-[#09090c]/80 rounded-3xl border border-white/5" />
        </div>
      </div>
    );
  }

  // Custom Glassmorphic Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#09090c]/95 backdrop-blur-2xl border border-white/10 p-4.5 rounded-2xl shadow-2xl shadow-black/80">
          <p className="text-xs font-black text-white/60 mb-2.5 uppercase tracking-wider">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6 text-xs my-1.5 font-semibold">
              <span className="flex items-center gap-2.5 text-white/80">
                <span className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-extrabold text-white">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Filter & Search Logic
  const filteredCharts = recommendedCharts.filter(chart => {
    const matchesFilter = activeFilter === "all" || chart.type === activeFilter;
    const matchesSearch = chart.title.toLowerCase().includes(searchQuery.toLowerCase()) || chart.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 w-full font-sans">
      {/* Section Header */}
      <div className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <h2 className="text-xl font-extrabold text-white tracking-tight">AI-Powered Chart Recommendation System</h2>
              {isSimulated && (
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1 shadow-sm">
                  <AlertCircle className="w-3 h-3" />
                  <span>Simulated Mode</span>
                </span>
              )}
            </div>
            <p className="text-xs text-white/50 font-medium">Automated column detection (numeric, categorical & date) & Recharts config generation</p>
          </div>
        </div>

        {/* Dataset Selector, Filters & Refresh Button */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">

          {/* Smart Search */}
          <div className="relative group hidden md:block">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400 transition-colors duration-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter charts..."
              className="bg-black/40 border border-white/10 rounded-2xl py-2 pl-9 pr-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 shadow-inner w-36 lg:w-48"
            />
          </div>

          {/* Smart Filter Tabs */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-2xl shadow-inner">
            {["all", "bar", "line", "pie", "area"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all duration-300 ${activeFilter === f
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-extrabold text-white hover:bg-white/10 transition-all shadow-inner group"
            >
              <Database className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <span>{selectedDataset}</span>
              <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl"
                >
                  <div className="px-4 py-2 border-b border-white/10 mb-1 bg-white/[0.02]">
                    <p className="text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-0.5">Select Dataset</p>
                  </div>
                  {dynamicDatasets.map((ds) => (
                    <button
                      key={ds.id}
                      onClick={() => {
                        setSelectedDataset(ds.id);
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-xs transition-colors font-semibold ${selectedDataset === ds.id
                          ? "bg-blue-600/20 text-blue-400 font-extrabold border-l-4 border-blue-50"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Database className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="truncate">{ds.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => fetchChartRecommendations(selectedDataset)}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-sm disabled:opacity-50 hover:scale-105"
            title="Regenerate Charts"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && !isSimulated && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-xs text-red-400 font-extrabold animate-in fade-in duration-200 shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-[400px] bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[380px] bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
            <div className="h-[380px] bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
          </div>
        </div>
      ) : filteredCharts && filteredCharts.length > 0 ? (
        <div className="space-y-6">

          {/* Top Section: First Recommended Chart */}
          {filteredCharts[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-0.5">
                      <h3 className="text-xl font-extrabold text-white tracking-tight">{filteredCharts[0].title}</h3>
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full uppercase tracking-wider shadow-sm">
                        {filteredCharts[0].type} chart
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-medium">{filteredCharts[0].description}</p>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 self-start sm:self-center shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI Recommended</span>
                </span>
              </div>

              {/* Dynamic Chart Container */}
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {filteredCharts[0].type === "line" ? (
                    <LineChart data={filteredCharts[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey={filteredCharts[0].xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "16px", fontSize: "12px", color: "#a3a3a3", fontWeight: 600 }} />
                      <Line
                        type="monotone"
                        dataKey={filteredCharts[0].yAxisKey}
                        name={filteredCharts[0].yAxisKey.replace('_', ' ').toUpperCase()}
                        stroke="#3b82f6"
                        strokeWidth={4}
                        dot={{ r: 5, fill: "#3b82f6", stroke: "#050505", strokeWidth: 2 }}
                        activeDot={{ r: 9, fill: "#3b82f6", stroke: "#fff", strokeWidth: 3 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  ) : filteredCharts[0].type === "bar" ? (
                    <BarChart data={filteredCharts[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey={filteredCharts[0].xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "16px", fontSize: "12px", color: "#a3a3a3", fontWeight: 600 }} />
                      <Bar
                        dataKey={filteredCharts[0].yAxisKey}
                        name={filteredCharts[0].yAxisKey.replace('_', ' ').toUpperCase()}
                        fill="#3b82f6"
                        radius={[12, 12, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  ) : filteredCharts[0].type === "area" ? (
                    <AreaChart data={filteredCharts[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTopArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey={filteredCharts[0].xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "16px", fontSize: "12px", color: "#a3a3a3", fontWeight: 600 }} />
                      <Area type="monotone" dataKey={filteredCharts[0].yAxisKey} name={filteredCharts[0].yAxisKey.replace('_', ' ').toUpperCase()} stroke="#3b82f6" fillOpacity={1} fill="url(#colorTopArea)" animationDuration={1500} />
                    </AreaChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={filteredCharts[0].data}
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={110}
                        paddingAngle={6}
                        dataKey={filteredCharts[0].dataKey}
                        nameKey={filteredCharts[0].nameKey}
                        animationDuration={1500}
                      >
                        {filteredCharts[0].data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#a3a3a3", fontWeight: 600 }} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Hover Border Gradient */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          )}

          {/* Bottom Grid: Remaining Recommended Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCharts.slice(1).map((chart, idx) => {
              const isBar = chart.type === "bar";
              const isPie = chart.type === "pie";
              const isLine = chart.type === "line";
              const isArea = chart.type === "area";
              const colorTheme = idx % 2 === 0 ? "purple" : "pink";

              return (
                <motion.div
                  key={chart.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                  className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between group min-h-[380px]"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-${colorTheme}-500/10 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />

                  <div>
                    <div className="flex items-center justify-between mb-1 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-2xl bg-${colorTheme}-500/20 text-${colorTheme}-400 border border-${colorTheme}-500/30 shadow-lg shadow-${colorTheme}-500/20 group-hover:rotate-12 transition-transform duration-300`}>
                          {isBar ? <BarChart2 className="w-5 h-5" /> : isPie ? <PieChartIcon className="w-5 h-5" /> : isArea ? <Layers className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                        </div>
                        <h3 className="text-lg font-extrabold text-white tracking-tight">{chart.title}</h3>
                      </div>
                      <span className={`text-[10px] font-extrabold text-${colorTheme}-400 bg-${colorTheme}-500/10 border border-${colorTheme}-500/20 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
                        {chart.type}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mb-6 mt-2 font-medium">{chart.description}</p>
                  </div>

                  <div className="h-[280px] w-full flex items-center justify-center relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      {isBar ? (
                        <BarChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey={chart.xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey={chart.yAxisKey} name={chart.yAxisKey.replace('_', ' ').toUpperCase()} fill={idx % 2 === 0 ? "#8b5cf6" : "#ec4899"} radius={[10, 10, 0, 0]} animationDuration={1500} />
                        </BarChart>
                      ) : isPie ? (
                        <PieChart>
                          <Pie
                            data={chart.data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={6}
                            dataKey={chart.dataKey}
                            nameKey={chart.nameKey}
                            animationDuration={1500}
                          >
                            {chart.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#a3a3a3", fontWeight: 600 }} />
                        </PieChart>
                      ) : isArea ? (
                        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`colorArea_${idx}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={idx % 2 === 0 ? "#8b5cf6" : "#ec4899"} stopOpacity={0.8} />
                              <stop offset="95%" stopColor={idx % 2 === 0 ? "#8b5cf6" : "#ec4899"} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey={chart.xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area type="monotone" dataKey={chart.yAxisKey} name={chart.yAxisKey.replace('_', ' ').toUpperCase()} stroke={idx % 2 === 0 ? "#8b5cf6" : "#ec4899"} fillOpacity={1} fill={`url(#colorArea_${idx})`} animationDuration={1500} />
                        </AreaChart>
                      ) : (
                        <LineChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey={chart.xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey={chart.yAxisKey} name={chart.yAxisKey.replace('_', ' ').toUpperCase()} stroke="#8b5cf6" strokeWidth={4} dot={{ r: 5, fill: "#8b5cf6" }} animationDuration={1500} />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-semibold z-10">
                    <span>Generated Config ID</span>
                    <span className="font-mono text-white/80 font-bold">{chart.id}</span>
                  </div>

                  {/* Hover Border Gradient */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="p-12 bg-[#09090c]/80 border border-white/10 rounded-3xl text-center space-y-4 shadow-2xl">
          <Filter className="w-12 h-12 text-white/30 mx-auto animate-bounce" />
          <h3 className="text-lg font-extrabold text-white">No Charts Match Your Filter</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto font-medium">Try resetting your search query or selecting a different chart type filter above.</p>
          <button
            onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
            className="px-6 py-2.5 bg-white/10 border border-white/10 rounded-2xl text-xs font-extrabold text-white hover:bg-white/20 transition-all shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

export default AnimatedCharts;
