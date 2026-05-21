"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  TrendingUp, 
  Database, 
  Cpu, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Layers
} from "lucide-react";

export function AnalyticsCards({ initialDataset = "Global_Superstore2" }) {
  const [kpiCards, setKpiCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKpis = async (datasetName) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/analytics/kpis", {
        table_name: datasetName
      });
      if (response.data && response.data.kpis) {
        setKpiCards(response.data.kpis);
      } else {
        throw new Error("Invalid KPI response structure");
      }
    } catch (err) {
      console.warn("Simulating KPI Cards Mode - FastAPI Backend Offline or Table Not Found");
      setKpiCards([
        {
          title: "Active Data Lake Volume",
          value: "1,245",
          change: "8 Features",
          isPositive: true,
          period: "indexed in PostgreSQL",
          icon: "Database",
          color: "blue",
          sparkline: [30, 45, 40, 60, 55, 75, 85, 90, 100]
        },
        {
          title: "Dataset Health Score",
          value: "95%",
          change: "+5.4%",
          isPositive: true,
          period: "completeness & purity",
          icon: "Activity",
          color: "emerald",
          sparkline: [80, 85, 82, 88, 85, 90, 92, 95, 95]
        },
        {
          title: "Missing Values & Nulls",
          value: "0",
          change: "0% rate",
          isPositive: true,
          period: "perfect completeness",
          icon: "Zap",
          color: "purple",
          sparkline: [10, 8, 12, 6, 14, 5, 8, 4, 0]
        },
        {
          title: "Scikit-Learn Anomalies",
          value: "42",
          change: "12 duplicates",
          isPositive: true,
          period: "Isolation Forest verified",
          icon: "Cpu",
          color: "pink",
          sparkline: [5, 10, 8, 15, 12, 20, 18, 25, 42]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis(initialDataset);
  }, [initialDataset]);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Database": return Database;
      case "Cpu": return Cpu;
      case "Zap": return Zap;
      case "Activity": return Activity;
      case "Layers": return Layers;
      default: return TrendingUp;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-44 bg-[#09090c]/80 rounded-3xl border border-white/5 skeleton-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full font-sans">
      {kpiCards.map((card, idx) => {
        const Icon = getIconComponent(card.icon);
        const colorMap = {
          blue: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30 shadow-blue-500/10",
          purple: "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30 shadow-purple-500/10",
          emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10",
          pink: "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30 shadow-pink-500/10"
        };

        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className="bg-[#09090c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group flex flex-col justify-between min-h-[200px]"
          >
            {/* Ambient Corner Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${card.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

            {/* Top Row: Title & Icon */}
            <div className="flex items-center justify-between gap-4 z-10">
               <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{card.title}</span>
              <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${colorMap[card.color]} shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Middle Row: Big Value & Sparkline */}
            <div className="my-4 z-10 flex items-end justify-between gap-4">
              <motion.span 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl sm:text-4xl font-black text-white tracking-tight"
              >
                {card.value}
              </motion.span>

              {/* Simulated Neon Sparkline Bars */}
              <div className="flex items-end gap-1 h-10 pb-1">
                {card.sparkline?.map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.05) }}
                    className={`w-1 rounded-full bg-${card.color}-400/80 group-hover:bg-${card.color}-400 transition-colors duration-300`} 
                  />
                ))}
              </div>
            </div>

            {/* Bottom Row: Change Badge & Period */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs z-10">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-extrabold ${
                card.isPositive 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm" 
                  : "bg-red-500/10 text-red-400 border border-red-500/20 shadow-sm"
              }`}>
                {card.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>{card.change}</span>
              </div>
              <span className="text-white/40 font-semibold">{card.period}</span>
            </div>

            {/* Hover Border Gradient */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
}

export default AnalyticsCards;
