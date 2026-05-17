"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Columns, 
  FileSpreadsheet, 
  Cpu, 
  TrendingUp, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";

export function SummaryCards() {
  const cards = [
    {
      id: "rows",
      title: "Total Rows",
      value: "1,245,892",
      change: "+12.5%",
      changeLabel: "from last month",
      icon: Database,
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      iconBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      borderColor: "hover:border-blue-500/50",
      trendColor: "text-blue-400"
    },
    {
      id: "columns",
      title: "Total Columns",
      value: "4,820",
      change: "+8.2%",
      changeLabel: "across 32 tables",
      icon: Columns,
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      iconBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      borderColor: "hover:border-purple-500/50",
      trendColor: "text-purple-400"
    },
    {
      id: "datasets",
      title: "Uploaded Datasets",
      value: "148",
      change: "+18",
      changeLabel: "new this week",
      icon: FileSpreadsheet,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      borderColor: "hover:border-emerald-500/50",
      trendColor: "text-emerald-400"
    },
    {
      id: "queries",
      title: "AI Queries",
      value: "98,421",
      change: "99.8%",
      changeLabel: "success rate",
      icon: Cpu,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      borderColor: "hover:border-amber-500/50",
      trendColor: "text-amber-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 shadow-2xl shadow-black/40 ${card.borderColor} group`}
          >
            {/* Background Gradient Mesh */}
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${card.gradient} rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500 pointer-events-none`} />
            
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/70 tracking-wide">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl border ${card.iconBg} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight">
                    {card.value}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className={`flex items-center gap-0.5 text-xs font-bold ${card.trendColor} bg-white/5 px-2 py-0.5 rounded-full border border-white/5`}>
                    {card.id === "queries" ? <Sparkles className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                    <span>{card.change}</span>
                  </div>
                  <span className="text-xs text-white/50 font-medium truncate">
                    {card.changeLabel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default SummaryCards;
