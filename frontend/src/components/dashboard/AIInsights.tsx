"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

const insights = [
  {
    type: "positive",
    icon: TrendingUp,
    text: "Customer retention in NA region predicted to increase by 4.2% next quarter based on recent feature adoption.",
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Anomaly detected: Server load spike predicted in 4 hours. Recommend auto-scaling provision.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    type: "neutral",
    icon: Sparkles,
    text: "New data pattern found in user segment B. Generating new sub-cohort for targeted marketing.",
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

export function AIInsights() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6 border-white/5 h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-secondary" />
        <h3 className="text-lg font-semibold text-white">Neural Insights</h3>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[200px]">
        {insights.map((insight, i) => (
          <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-4">
            <div className={`w-10 h-10 rounded-lg ${insight.bg} flex items-center justify-center shrink-0`}>
              <insight.icon className={`w-5 h-5 ${insight.color}`} />
            </div>
            <div>
              <p className="text-sm text-white/80 leading-relaxed">{insight.text}</p>
              <div className="text-xs text-white/40 mt-2">Just now</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
