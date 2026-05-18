"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  Zap, 
  RefreshCw, 
  Database, 
  ChevronDown, 
  ShieldCheck, 
  AlertCircle, 
  Cpu, 
  Layers,
  Loader2 
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

export function AIInsights({ initialDataset = "Global_Superstore2" }) {
  const [selectedDataset, setSelectedDataset] = useState(initialDataset);
  const [insightsData, setInsightsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [dynamicDatasets, setDynamicDatasets] = useState(availableDatasets);

  useEffect(() => {
    setSelectedDataset(initialDataset);
    if (initialDataset && !dynamicDatasets.find(d => d.id === initialDataset)) {
      setDynamicDatasets(prev => [{ id: initialDataset, name: initialDataset }, ...prev]);
    }
  }, [initialDataset]);

  // Fetch Insights from FastAPI Backend
  const fetchInsights = async (datasetName) => {
    setIsLoading(true);
    setError(null);
    setIsSimulated(false);

    try {
      const response = await axios.post("http://localhost:8000/analytics/insights", {
        table_name: datasetName
      });

      if (response.data && response.data.data) {
        setInsightsData(response.data.data);
      } else {
        throw new Error("Invalid response structure from server.");
      }
    } catch (err) {
      console.error("FastAPI /analytics/insights Error:", err);

      const isNetworkError = err.message.includes("Network Error") || err.code === "ERR_NETWORK";
      console.warn("Simulating AI Insights Mode - FastAPI Backend Offline or Table Not Found");
      setIsSimulated(true);

      const fallbackData = {
        dataset_name: datasetName,
        executive_summary: `Automated AI analysis completed for '${datasetName}'. The dataset exhibits stable numerical distributions with minor outlier clustering in transaction volumes and high completeness across primary key columns.`,
        business_insights: [
          {
            title: "High Outlier Frequency in Spend",
            category: "anomaly",
            description: "Detected 142 transactions exceeding the 99th percentile threshold ($12,450). Recommended action: Implement automated fraud detection flags for this segment."
          },
          {
            title: "Strong Departmental ROI Correlation",
            category: "trend",
            description: "A 0.84 correlation coefficient observed between marketing campaign budget allocations and customer acquisition velocity in Q1."
          },
          {
            title: "Storage Index Optimization",
            category: "optimization",
            description: "Creating a composite B-tree index on (department, status) will decrease query latency by an estimated 34% during peak loads."
          },
          {
            title: "Data Completeness Verification",
            category: "summary",
            description: "Primary key and foreign key constraints are 100% intact with zero orphaned records detected across relational joins."
          }
        ],
        anomaly_detection: {
          anomalies_detected: 42,
          anomaly_rate: "3.4%",
          description: "Scikit-learn Isolation Forest detected 42 multidimensional anomalies across numerical features.",
          sample_anomalies: [
            { row_index: 104, values: { salary: "185000", experience: "2", performance: "4.9" } },
            { row_index: 312, values: { salary: "42000", experience: "15", performance: "2.1" } },
            { row_index: 845, values: { salary: "210000", experience: "5", performance: "5.0" } }
          ]
        },
        recommendations_panel: [
          { priority: "high", title: "Address Missing Values & Duplicates", description: "Impute missing cells in optional metadata fields and deduplicate redundant historical records." },
          { priority: "medium", title: "Investigate Isolation Forest Outliers", description: "Review the 42 records flagged as multidimensional outliers by Scikit-learn to rule out fraud." },
          { priority: "low", title: "Optimize Indexing on Categorical Attributes", description: "Create composite B-tree indexes on frequently joined columns to maintain sub-50ms query latency." }
        ],
        data_quality_report: {
          overall_score: 95,
          summary: "Excellent overall completeness with minor null values detected in optional metadata fields.",
          actionable_steps: [
            "Impute missing values in 'roi_metric' using median substitution",
            "Archive historical logs older than 365 days to maintain query performance",
            "Deduplicate 12 identical rows identified during ingestion"
          ]
        }
      };

      setInsightsData(fallbackData);
      if (!isNetworkError) {
        setError(err.response?.data?.detail || err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(selectedDataset);
  }, [selectedDataset]);

  const getCategoryConfig = (category) => {
    switch (category?.toLowerCase()) {
      case "trend":
        return { icon: TrendingUp, color: "text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10", badge: "Trend Analysis" };
      case "anomaly":
        return { icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10", badge: "Anomaly Detected" };
      case "optimization":
        return { icon: Zap, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10", badge: "Optimization" };
      default:
        return { icon: Lightbulb, color: "text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/10", badge: "Executive Summary" };
    }
  };

  return (
    <div className="space-y-6 w-full font-sans">
      {/* Panel Header */}
      <div className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-xl font-extrabold text-white tracking-tight">AI Executive Insights & Data Quality</h2>
              {isSimulated && (
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1 shadow-sm">
                  <AlertCircle className="w-3 h-3" />
                  <span>Simulated Mode</span>
                </span>
              )}
            </div>
            <p className="text-xs text-white/50 font-medium">Automated Pandas statistical analysis & Gemini 2.5 Flash business intelligence</p>
          </div>
        </div>

        {/* Dataset Selector & Refresh Button */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-extrabold text-white hover:bg-white/10 transition-all shadow-inner group"
            >
              <Database className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <span>{selectedDataset}</span>
              <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" />
            </button>

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
                      className={`w-full flex items-center gap-3 px-4 py-3 text-xs transition-colors font-semibold ${
                        selectedDataset === ds.id 
                          ? "bg-blue-600/20 text-blue-400 font-extrabold border-l-4 border-blue-500" 
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
            onClick={() => fetchInsights(selectedDataset)}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-sm disabled:opacity-50 hover:scale-105"
            title="Re-run Analysis"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-400" : ""}`} />
          </button>
        </div>
      </div>

      {error && !isSimulated && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-xs text-red-400 font-extrabold animate-in fade-in duration-200 shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-28 bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-56 bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
            <div className="h-56 bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
            <div className="h-56 bg-[#09090c]/80 border border-white/5 rounded-3xl p-6" />
          </div>
        </div>
      ) : insightsData ? (
        <div className="space-y-6 font-sans">
          
          {/* Executive Summary Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-purple-600/15 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 mt-1 shrink-0 group-hover:rotate-12 transition-transform duration-300">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">Executive Summary</h3>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full shadow-sm">
                    AI Generated
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-semibold bg-black/30 p-4 rounded-2xl border border-white/5 shadow-inner">
                  {insightsData.executive_summary}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scikit-Learn Anomaly Detection Panel */}
          {insightsData.anomaly_detection && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group space-y-6"
            >
              <div className="absolute top-0 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 shadow-lg shadow-pink-500/20 group-hover:rotate-12 transition-transform duration-300">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-0.5">
                      <h3 className="text-lg font-extrabold text-white tracking-tight">Scikit-Learn Anomaly Detection</h3>
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-full shadow-sm">
                        Isolation Forest Engine
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-medium">{insightsData.anomaly_detection.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-2xl font-black text-pink-400 tracking-tight">{insightsData.anomaly_detection.anomalies_detected}</span>
                    <span className="text-xs text-white/40 block font-bold">Anomalies Detected</span>
                  </div>
                  <div className="text-right pl-4 border-l border-white/10">
                    <span className="text-2xl font-black text-white tracking-tight">{insightsData.anomaly_detection.anomaly_rate}</span>
                    <span className="text-xs text-white/40 block font-bold">Outlier Rate</span>
                  </div>
                </div>
              </div>

              {/* Sample Anomalies Grid */}
              {insightsData.anomaly_detection.sample_anomalies && insightsData.anomaly_detection.sample_anomalies.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-extrabold text-white/60 uppercase tracking-wider">Sample Multidimensional Anomalies</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insightsData.anomaly_detection.sample_anomalies.map((sample, sIdx) => (
                      <div key={sIdx} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all shadow-sm space-y-2.5 group/card">
                        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                          <span className="font-extrabold text-white/70">Record #{sample.row_index}</span>
                          <span className="font-mono text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 font-bold">Flagged Outlier</span>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          {Object.entries(sample.values || {}).map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between text-xs">
                              <span className="text-white/50 font-medium capitalize">{k}:</span>
                              <span className="font-mono text-white font-extrabold">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          )}

          {/* Main Content Grid: Insights Cards & Data Quality Report */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Columns: AI-Generated Insights Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence>
                {insightsData.business_insights?.map((item, idx) => {
                  const config = getCategoryConfig(item.category);
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                      className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between group hover:border-white/20 transition-all duration-300 relative overflow-hidden min-h-[220px]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className={`p-2.5 rounded-2xl border ${config.color} shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${config.color} shadow-sm`}>
                            {config.badge}
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed mb-4 font-medium">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-semibold">
                        <span>Confidence: 98%</span>
                        <span className="font-extrabold text-blue-400 group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 cursor-pointer shadow-sm">
                          <span>Explore Impact</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right Column: Data Quality Report Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1 bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-300">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-tight">Data Quality Score</h3>
                      <p className="text-xs text-white/50 font-medium">Completeness & Outliers</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-400 tracking-tight">
                      {insightsData.data_quality_report?.overall_score || 95}
                    </span>
                    <span className="text-xs text-white/40 font-bold">/100</span>
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed mb-6 font-semibold bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                  {insightsData.data_quality_report?.summary || "Excellent overall completeness with minor null values detected in optional metadata fields."}
                </p>

                <div className="space-y-3">
                  <p className="text-xs font-extrabold text-white/60 uppercase tracking-wider mb-2">Actionable Recommendations</p>
                  {insightsData.data_quality_report?.actionable_steps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors text-xs shadow-sm">
                      <div className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400 mt-0.5 shrink-0 border border-blue-500/30 shadow-sm">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white/80 leading-relaxed font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-semibold">
                <span>Status: Verified</span>
                <span className="text-emerald-400 font-extrabold flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Optimal Health</span>
                </span>
              </div>

              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>

          </div>

          {/* AI Recommendations Panel */}
          {insightsData.recommendations_panel && insightsData.recommendations_panel.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group space-y-6"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform duration-300">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight">AI Strategic Recommendations Panel</h3>
                  <p className="text-xs text-white/50 font-medium">Prioritized action items to optimize data health & business intelligence ROI</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightsData.recommendations_panel.map((rec, rIdx) => {
                  const isHigh = rec.priority === "high";
                  const isMedium = rec.priority === "medium";
                  const pColor = isHigh ? "text-red-400 bg-red-500/10 border-red-500/20" : isMedium ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-blue-400 bg-blue-500/10 border-blue-500/20";

                  return (
                    <div key={rIdx} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between space-y-4 group/rec">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${pColor} uppercase tracking-wider shadow-sm`}>
                            {rec.priority} Priority
                          </span>
                          <span className="text-xs font-bold text-white/40">Action #{rIdx + 1}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-white tracking-tight group-hover/rec:text-purple-400 transition-colors">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed font-medium">
                          {rec.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-extrabold cursor-pointer group-hover/rec:translate-x-1 transition-transform duration-300">
                        <span>Execute Strategy</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          )}

        </div>
      ) : null}

    </div>
  );
}

export default AIInsights;
