"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Database, Zap } from "lucide-react";

const kpis = [
  { label: "Active Connections", value: "1,204", change: "+12%", icon: Users, color: "text-blue-400" },
  { label: "Queries Processed", value: "8.4M", change: "+24%", icon: Database, color: "text-purple-400" },
  { label: "Predictive Accuracy", value: "99.1%", change: "+0.4%", icon: Zap, color: "text-yellow-400" },
  { label: "Revenue Impact", value: "$4.2M", change: "+18%", icon: TrendingUp, color: "text-green-400" },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card p-6 border-white/5 relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg bg-white/5 ${kpi.color}`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <span className="text-green-400 text-sm font-semibold flex items-center bg-green-400/10 px-2 py-1 rounded-md">
              {kpi.change}
            </span>
          </div>
          <div className="text-white/60 text-sm mb-1">{kpi.label}</div>
          <div className="text-3xl font-bold text-white">{kpi.value}</div>
          
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}
