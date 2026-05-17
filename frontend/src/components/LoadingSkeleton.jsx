"use client";

import React from "react";
import { motion } from "framer-motion";

export function LoadingSkeleton({ type = "card", count = 1 }) {
  const skeletons = Array.from({ length: count });

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {skeletons.map((_, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-[#09090c]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
          >
            {/* Shimmer Wave */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-24 h-4 bg-white/10 rounded-lg animate-pulse" />
              <div className="w-10 h-10 bg-white/10 rounded-xl animate-pulse" />
            </div>
            <div className="w-32 h-8 bg-white/10 rounded-xl mb-2 animate-pulse" />
            <div className="w-20 h-3 bg-white/5 rounded-lg animate-pulse" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="w-full bg-[#09090c]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-2xl space-y-6 animate-pulse">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="w-48 h-6 bg-white/10 rounded-xl" />
            <div className="w-32 h-3 bg-white/5 rounded-lg" />
          </div>
          <div className="w-24 h-8 bg-white/10 rounded-xl" />
        </div>
        <div className="w-full h-[320px] bg-white/[0.02] border border-white/5 rounded-xl flex items-end gap-3 p-6 justify-between">
          {[40, 65, 30, 85, 50, 95, 70, 100, 60, 80].map((h, i) => (
            <div key={i} className="w-full bg-white/10 rounded-t-lg transition-all duration-500" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="w-full bg-[#09090c]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-2xl space-y-4 animate-pulse">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="w-36 h-6 bg-white/10 rounded-xl" />
          <div className="w-20 h-6 bg-white/10 rounded-xl" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div key={idx} className="w-full h-12 bg-white/[0.03] rounded-xl flex items-center justify-between px-4 border border-white/5">
              <div className="w-24 h-4 bg-white/10 rounded-lg" />
              <div className="w-32 h-4 bg-white/10 rounded-lg" />
              <div className="w-16 h-4 bg-white/10 rounded-lg" />
              <div className="w-20 h-4 bg-white/10 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="space-y-6 w-full animate-pulse">
        {[1, 2].map((_, idx) => (
          <div key={idx} className={`flex gap-4 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            <div className="w-10 h-10 bg-white/10 rounded-xl shrink-0" />
            <div className={`p-4 rounded-2xl max-w-[75%] space-y-2 ${idx % 2 === 0 ? "bg-white/5 border border-white/10" : "bg-blue-600/20 border border-blue-500/30"}`}>
              <div className="w-48 h-4 bg-white/10 rounded-lg" />
              <div className="w-full h-4 bg-white/10 rounded-lg" />
              <div className="w-32 h-4 bg-white/10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default LoadingSkeleton;
