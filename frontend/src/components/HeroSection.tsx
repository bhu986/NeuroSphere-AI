"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, LineChart, PieChart, Bot, Terminal, Cpu, Database, Zap } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const typewriterPhrases = [
  "Initializing Neural Weights...",
  "Querying 14.2M Enterprise Records...",
  "Synthesizing Predictive Insights...",
  "Optimizing PostgreSQL Vector Clusters...",
  "Zero-Latency Cognitive BI Ready."
];

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Mouse position for background spotlight & 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Typewriter effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = typewriterPhrases[phraseIndex];
    
    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        }, 30);
      }
    } else {
      if (displayedText === currentPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        }, 50);
      }
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 overflow-hidden perspective-[1200px]"
    >
      {/* Dynamic Mouse-Follow Glow Spotlight */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent rounded-full blur-[180px] -z-10 pointer-events-none"
      />

      {/* Floating Glowing Particles */}
      {[
        { top: "15%", left: "10%", size: 6, delay: 0 },
        { top: "25%", left: "85%", size: 8, delay: 1 },
        { top: "70%", left: "15%", size: 10, delay: 2 },
        { top: "80%", left: "80%", size: 5, delay: 3 },
        { top: "45%", left: "5%", size: 12, delay: 4 },
        { top: "35%", left: "92%", size: 7, delay: 5 },
      ].map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -30, 0] }}
          transition={{ duration: 6 + p.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-[1px] shadow-lg shadow-blue-500/50 -z-10"
        />
      ))}

      <div className="max-w-5xl mx-auto text-center space-y-8 z-10 w-full mt-8">
        
        {/* Typewriter AI Text Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-xl shadow-black/50 text-xs font-mono text-white/80 mx-auto"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-white font-bold">{displayedText}</span>
          <span className="w-1.5 h-3 bg-white/80 animate-pulse inline-block ml-0.5" />
        </motion.div>

        {/* Cinematic Headline with Animated Gradient Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
        >
          Cognitive Business <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 animate-gradient-x">
            Intelligence for the Future
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Transform raw unstructured data into actionable, predictive telemetry. Experience Vercel-level speed, Stripe-level precision, and Apple-level fluidity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <MagneticWrapper pull={0.25}>
            <button 
              onClick={() => window.location.href = "/dashboard"}
              className="relative group h-14 px-8 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </MagneticWrapper>

          <MagneticWrapper pull={0.2}>
            <button 
              onClick={() => window.location.href = "/dashboard"}
              className="h-14 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold flex items-center justify-center gap-2 backdrop-blur-md shadow-xl hover:shadow-white/5 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Book Enterprise Demo</span>
            </button>
          </MagneticWrapper>
        </motion.div>
      </div>

      {/* 3D Floating Dashboard Preview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ rotateX, rotateY }}
        className="mt-20 w-full max-w-5xl relative z-10 transform-style-3d cursor-grab active:cursor-grabbing"
      >
        <div className="glass-card p-3 sm:p-5 rounded-3xl border-white/20 shadow-2xl shadow-blue-500/20 overflow-hidden backdrop-blur-3xl bg-[#09090c]/80 border">
          <div className="bg-[#050505]/90 rounded-2xl border border-white/5 h-[450px] sm:h-[600px] flex flex-col overflow-hidden relative shadow-inner">
            
            {/* Mock Header */}
            <div className="h-14 border-b border-white/10 flex items-center px-6 gap-4 bg-white/[0.02]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm shadow-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm shadow-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm shadow-green-500/50" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white/50 font-mono ml-4 flex items-center gap-2 shadow-sm">
                <Database className="w-3 h-3 text-purple-400" />
                <span>neurosphere-analytics-cluster-us-east-1</span>
              </div>
            </div>
            
            {/* Mock Grid Content */}
            <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
              <div className="col-span-1 md:col-span-2 space-y-6 flex flex-col justify-between">
                
                {/* Main Chart Widget */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5 flex flex-col justify-between relative overflow-hidden shadow-xl group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-xs font-bold flex items-center gap-2 uppercase tracking-wider">
                      <LineChart className="w-4 h-4 text-blue-400"/> Predictive Annual Revenue
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold shadow-sm">
                      +24.8% Real-time
                    </span>
                  </div>
                  <div className="flex items-end gap-3 relative z-10 my-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$14,245,800</span>
                    <span className="text-white/40 text-xs font-bold mb-1.5">Target: $12M</span>
                  </div>
                  {/* Fake Animated Chart Bars */}
                  <div className="h-28 w-full flex items-end gap-2 mt-4 relative z-10">
                    {[35, 45, 40, 60, 55, 75, 70, 85, 80, 95, 90, 100].map((h, i) => (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.05), ease: [0.16, 1, 0.3, 1] }}
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-blue-600/20 via-indigo-500/60 to-purple-500 rounded-t-md hover:from-blue-500 hover:to-purple-400 transition-colors cursor-pointer shadow-sm" 
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Two Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="h-36 rounded-2xl border border-white/10 bg-white/[0.03] p-5 relative overflow-hidden shadow-xl group hover:border-white/20 transition-all">
                    <div className="text-white/60 text-xs font-bold flex items-center gap-2 uppercase tracking-wider">
                      <BarChart3 className="w-4 h-4 text-purple-400"/> Active Neural Queries
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">1,245,902</div>
                    <div className="text-xs text-white/40 mt-1 font-semibold">⚡ &lt;12ms avg latency</div>
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  </div>
                  <div className="h-36 rounded-2xl border border-white/10 bg-white/[0.03] p-5 relative overflow-hidden shadow-xl group hover:border-white/20 transition-all">
                    <div className="text-white/60 text-xs font-bold flex items-center gap-2 uppercase tracking-wider">
                      <PieChart className="w-4 h-4 text-blue-400"/> AI Confidence Score
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">99.4%</div>
                    <div className="text-xs text-emerald-400 mt-1 font-semibold">✓ Zero Anomaly Detected</div>
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  </div>
                </div>

              </div>

              {/* Right Side AI Insights Feed */}
              <div className="col-span-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col hidden md:flex shadow-xl justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                <div className="text-white/60 text-xs font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Live Copilot Insights</span>
                </div>
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  {[
                    { title: "Revenue Spike Detected", desc: "Q3 ARR expansion exceeding neural forecast by 14.2%.", color: "from-blue-500 to-indigo-500" },
                    { title: "Infrastructure Auto-Scaled", desc: "Provisioned 4 additional PostgreSQL vector clusters.", color: "from-purple-500 to-pink-500" },
                    { title: "Anomaly Prevented", desc: "Isolated 14 duplicate records in financial_transactions.", color: "from-emerald-500 to-teal-500" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1 + (i * 0.2) }}
                      className="bg-black/40 rounded-xl p-3.5 border border-white/5 space-y-2 shadow-sm hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} animate-pulse`} />
                        <span className="text-xs font-extrabold text-white tracking-tight">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
                  <span>SYSTEM: HEALTHY</span>
                  <span>14.2M RECS</span>
                </div>
              </div>

            </div>
            
            {/* Glowing overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
