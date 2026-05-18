"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, Bot, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const workflowSteps = [
  {
    id: "ingest",
    icon: Database,
    title: "1. Autonomous Ingestion",
    desc: "Drag & drop CSV/Excel files or connect PostgreSQL/Snowflake clusters. NeuroSphere instantly inspects schemas, parses data types, and cleans missing values.",
    tech: "Pandas • SQLAlchemy • PyArrow",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "vectorize",
    icon: Cpu,
    title: "2. Neural Vectorization",
    desc: "Unstructured text and tabular relationships are converted into high-dimensional vector embeddings using Google Gemini 2.5 Flash cognitive models.",
    tech: "Gemini Embeddings • FAISS • pgvector",
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "query",
    icon: Bot,
    title: "3. Conversational SQL Copilot",
    desc: "Ask complex analytical questions in plain English. Our AI Copilot writes optimized, read-only PostgreSQL queries and executes them securely with zero injection risk.",
    tech: "Gemini 2.5 Flash • AST Validation",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "visualize",
    icon: BarChart3,
    title: "4. Dynamic Telemetry",
    desc: "Results are instantly rendered into beautiful, interactive Recharts (Bar, Line, Pie) with auto-generated executive summaries, anomaly alerts, and CSV exports.",
    tech: "Recharts • Framer Motion • Tailwind",
    color: "from-pink-600 to-rose-600"
  }
];

export function AIWorkflowAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-extrabold text-purple-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Elegance</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            How the Cognitive <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Engine Operates
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            A fully transparent, four-stage neural pipeline designed to turn raw unstructured tables into board-ready financial intelligence in seconds.
          </motion.p>
        </div>

        {/* Interactive Steps Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <MagneticWrapper key={step.id} pull={0.1} className="w-full">
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-6 rounded-3xl border text-left transition-all duration-500 relative overflow-hidden group shadow-xl ${
                    isActive 
                      ? "bg-white/[0.08] border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105" 
                      : "bg-[#09090c]/80 border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="workflowActiveGlow" 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-transparent -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-lg ${isActive ? "scale-110 rotate-6" : ""} transition-transform duration-500`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${isActive ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-white/40 border-white/10"}`}>
                      Step {idx + 1}
                    </span>
                  </div>

                  <h3 className={`text-xl font-extrabold mb-2 tracking-tight transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                    {step.title.substring(3)}
                  </h3>

                  <p className="text-xs text-white/50 font-mono tracking-tight line-clamp-1">
                    {step.tech}
                  </p>
                </button>
              </MagneticWrapper>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl shadow-purple-500/10 bg-[#09090c]/90 backdrop-blur-3xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

            {/* Left side text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                <span>PIPELINE STAGE: {workflowSteps[activeStep].tech}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {workflowSteps[activeStep].title}
              </h3>

              <p className="text-base text-white/70 leading-relaxed font-medium">
                {workflowSteps[activeStep].desc}
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center gap-6">
                <button 
                  onClick={() => window.location.href = "/upload"}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Test Ingestion Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.location.href = "/analytics"}
                  className="text-xs font-extrabold text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>View Copilot Docs</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            </div>

            {/* Right side animated visual mockup */}
            <div className="bg-[#050505]/90 rounded-2xl border border-white/10 p-6 h-[320px] flex flex-col justify-center relative overflow-hidden shadow-inner group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              
              {activeStep === 0 && (
                <div className="space-y-4 text-center">
                  <Database className="w-16 h-16 text-blue-400 mx-auto animate-bounce" />
                  <p className="text-xs font-mono text-white/60">Parsing CSV/Excel Headers & Data Types...</p>
                  <div className="h-2 w-48 bg-white/10 rounded-full mx-auto overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-blue-500 rounded-full" />
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-4 text-center">
                  <Cpu className="w-16 h-16 text-purple-400 mx-auto animate-spin" />
                  <p className="text-xs font-mono text-white/60">Generating 768-Dimension Gemini Vector Embeddings...</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} className="w-3 h-3 rounded-full bg-purple-500" />
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4 text-center">
                  <Bot className="w-16 h-16 text-pink-400 mx-auto animate-pulse" />
                  <p className="text-xs font-mono text-white/60">Translating: "Find top highest transactions"</p>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] font-mono text-blue-300 text-left overflow-x-auto">
                    SELECT transaction_id, amount FROM "transactions" ORDER BY amount DESC LIMIT 10;
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4 text-center">
                  <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
                  <p className="text-xs font-mono text-white/60">Rendering Autonomous Recharts Telemetry...</p>
                  <div className="flex items-end justify-center gap-2 h-16">
                    {[40, 60, 80, 100, 70].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1 }} className="w-6 bg-emerald-500/80 rounded-t-md" />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

export default AIWorkflowAnimation;
