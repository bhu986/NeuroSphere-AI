"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, LineChart, PieChart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Introducing NeuroSphere 2.0 Cognitive Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
        >
          Cognitive Business <br className="hidden md:block" />
          <span className="text-gradient">Intelligence for the Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
        >
          Transform raw data into actionable, predictive insights with our state-of-the-art AI analytics platform. Elevate your decision making today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button className="h-12 px-8 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:bg-white/90 transition-all">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
          <button className="h-12 px-8 rounded-full glass font-semibold text-white hover:bg-white/5 transition-all cursor-pointer">
            Book a Demo
          </button>
        </motion.div>
      </div>

      {/* Dashboard Preview Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 w-full max-w-5xl relative z-10"
      >
        <div className="glass-card p-2 md:p-4 rounded-2xl md:rounded-3xl border-white/20 shadow-2xl shadow-primary/20 overflow-hidden">
          <div className="bg-black/80 rounded-xl md:rounded-2xl border border-white/5 h-[400px] md:h-[600px] flex flex-col overflow-hidden relative">
            {/* Mock Header */}
            <div className="h-14 border-b border-white/10 flex items-center px-6 gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-white/40 font-mono ml-4">neurosphere-analytics-engine</div>
            </div>
            
            {/* Mock Content */}
            <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="h-48 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="text-white/60 text-sm flex items-center gap-2"><LineChart className="w-4 h-4 text-primary"/> Predictive Revenue</div>
                  <div className="flex items-end gap-2 relative z-10">
                    <span className="text-4xl font-bold text-white">$2.4M</span>
                    <span className="text-green-400 text-sm mb-1">+14.5%</span>
                  </div>
                  {/* Fake Chart */}
                  <div className="h-20 w-full flex items-end gap-2 mt-4 relative z-10">
                    {[40, 55, 45, 70, 60, 85, 75, 90, 80, 100].map((h, i) => (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-primary/10 to-primary/50 rounded-t-sm" 
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="h-32 rounded-xl border border-white/10 bg-white/5 p-4 relative overflow-hidden">
                    <div className="text-white/60 text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4 text-secondary"/> Active Queries</div>
                    <div className="text-3xl font-bold text-white mt-4">12,405</div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
                  </div>
                  <div className="h-32 rounded-xl border border-white/10 bg-white/5 p-4 relative overflow-hidden">
                    <div className="text-white/60 text-sm flex items-center gap-2"><PieChart className="w-4 h-4 text-primary"/> AI Confidence</div>
                    <div className="text-3xl font-bold text-white mt-4">98.2%</div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col hidden md:flex">
                <div className="text-white/60 text-sm mb-4">Neural Insights</div>
                <div className="space-y-4 flex-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-black/40 rounded-lg p-3 border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "33%" }}
                        transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
                        className="h-2 bg-primary/40 rounded-full mb-2" 
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.9 + (i * 0.2) }}
                        className="h-2 bg-white/10 rounded-full mb-2" 
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 1, delay: 1 + (i * 0.2) }}
                        className="h-2 bg-white/10 rounded-full" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Glowing overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
