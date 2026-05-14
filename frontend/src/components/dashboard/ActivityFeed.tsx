"use client";

import { motion } from "framer-motion";
import { CheckCircle2, UserPlus, FileText, Database } from "lucide-react";

const activities = [
  { id: 1, action: "System sync complete", time: "2 min ago", icon: CheckCircle2, color: "text-green-400" },
  { id: 2, action: "New dataset uploaded: Q3_Financials.csv", time: "15 min ago", icon: FileText, color: "text-blue-400" },
  { id: 3, action: "Model retraining finished", time: "1 hour ago", icon: Database, color: "text-purple-400" },
  { id: 4, action: "New team member invited: Sarah J.", time: "3 hours ago", icon: UserPlus, color: "text-yellow-400" },
];

export function ActivityFeed() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-6 border-white/5 h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>

      <div className="flex-1 relative">
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10" />
        
        <div className="space-y-6 relative">
          {activities.map((item) => (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-black/80 border border-white/10 flex items-center justify-center relative z-10">
                  <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                </div>
              </div>
              <div className="pt-1">
                <p className="text-sm text-white/80">{item.action}</p>
                <p className="text-xs text-white/40 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
