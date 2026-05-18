"use client";

import React from "react";
import { motion } from "framer-motion";

const logos = [
  "Stripe", "Apple", "Vercel", "OpenAI", "NVIDIA", "Microsoft", "Amazon", "Google", "Meta", "Snowflake", "Databricks", "Scale AI"
];

export function LogoMarquee() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#050505] border-b border-white/10">
      {/* Gradient Fade Edges */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-extrabold text-white/40 uppercase tracking-widest">
          Empowering Core Data Clusters at Industry Titans
        </p>
      </div>

      <div className="flex overflow-hidden select-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
          }}
          className="flex items-center gap-16 whitespace-nowrap pr-16"
        >
          {logos.concat(logos).map((logo, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 group-hover:animate-ping transition-colors" />
              <span className="text-lg font-black tracking-tight text-white/60 group-hover:text-white transition-colors duration-300">
                {logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LogoMarquee;
