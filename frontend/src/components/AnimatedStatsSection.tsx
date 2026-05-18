"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Zap, Target, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Database,
    value: "14.2M+",
    label: "Enterprise Datasets Indexed",
    desc: "Petabytes of unstructured records vectorized autonomously.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20"
  },
  {
    icon: Target,
    value: "99.8%",
    label: "Neural Query Accuracy",
    desc: "Precision natural language translation powered by Gemini 2.5 Flash.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20"
  },
  {
    icon: Zap,
    value: "<12ms",
    label: "Average Execution Latency",
    desc: "Lightning-fast PostgreSQL telemetry streaming with zero lag.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    icon: TrendingUp,
    value: "$2.4B+",
    label: "Client Value Optimized",
    desc: "Massive financial leverage generated through cognitive BI.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20"
  }
];

export function AnimatedStatsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/40 border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`p-8 rounded-3xl border ${stat.bg} backdrop-blur-2xl flex flex-col justify-between group hover:scale-105 transition-transform duration-500 shadow-2xl shadow-black/50`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white animate-pulse transition-colors" />
                </div>

                <div className="space-y-2">
                  <motion.h3 
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`text-5xl font-black ${stat.color} tracking-tight`}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-base font-extrabold text-white tracking-tight">
                    {stat.label}
                  </p>
                  <p className="text-xs text-white/60 font-medium leading-relaxed pt-2 border-t border-white/10">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AnimatedStatsSection;
