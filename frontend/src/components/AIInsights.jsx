"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Lightbulb,
  Zap
} from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      id: 1,
      type: "anomaly",
      title: "Unusual Query Spike",
      description: "A 45% increase in complex SQL generation queries detected in the 'Finance' dataset between 14:00 and 16:00.",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/20 border-amber-500/30",
      time: "10m ago",
      action: "View Query Logs"
    },
    {
      id: 2,
      type: "optimization",
      title: "Index Recommendation",
      description: "AI Copilot suggests adding a composite index on (user_id, timestamp) in table 'user_events' to improve query latency by ~32%.",
      icon: Zap,
      color: "text-purple-400 bg-purple-500/20 border-purple-500/30",
      time: "1h ago",
      action: "Apply Optimization"
    },
    {
      id: 3,
      type: "success",
      title: "Dataset Indexing Complete",
      description: "Auto-indexing completed for 'Healthcare_Records_Q3.csv'. 14,200 rows successfully vectorized and ready for semantic search.",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
      time: "3h ago",
      action: "Explore Dataset"
    },
    {
      id: 4,
      type: "insight",
      title: "Predictive Forecast",
      description: "Based on current growth, AI query volume is expected to exceed your current tier limit in 14 days.",
      icon: TrendingUp,
      color: "text-blue-400 bg-blue-500/20 border-blue-500/30",
      time: "5h ago",
      action: "Upgrade Tier"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">AI Copilot Insights</h3>
            <p className="text-xs text-white/50">Real-time intelligence and automated dataset optimizations</p>
          </div>
        </div>

        <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group self-start sm:self-center bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl hover:bg-blue-500/20">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Ask AI Copilot</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group/btn">
                  <span>{item.action}</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] text-white/30 font-medium">Auto-generated</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default AIInsights;
