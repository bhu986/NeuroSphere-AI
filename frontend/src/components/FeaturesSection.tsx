"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Shield, Database, LayoutDashboard, Fingerprint, Sparkles, ArrowRight } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const features = [
  {
    icon: Brain,
    title: "Cognitive Neural Processing",
    description: "Advanced transformer models process your unstructured enterprise data to synthesize hidden patterns and multi-variable correlations.",
    color: "from-blue-500 to-indigo-500",
    badge: "AI Powered"
  },
  {
    icon: Zap,
    title: "Zero-Latency Stream Analytics",
    description: "Ingest and analyze millions of concurrent data points with sub-12ms execution latency for split-second autonomous decision making.",
    color: "from-indigo-500 to-purple-500",
    badge: "Real-Time"
  },
  {
    icon: Shield,
    title: "Bank-Grade Vector Encryption",
    description: "Dedicated isolated clusters, end-to-end vector encryption, and strict SOC2 Type II compliance guarantee zero proprietary data leakage.",
    color: "from-purple-500 to-pink-500",
    badge: "Enterprise"
  },
  {
    icon: Database,
    title: "Autonomous Data Lakehouse",
    description: "Eliminate data silos instantly. Native out-of-the-box integrations with PostgreSQL, Snowflake, Databricks, AWS S3, and 100+ APIs.",
    color: "from-blue-600 to-cyan-500",
    badge: "Unified"
  },
  {
    icon: LayoutDashboard,
    title: "Self-Evolving UI Dashboards",
    description: "Cognitive charts that automatically adapt visualization types, smart filters, and KPI thresholds to your immediate business context.",
    color: "from-pink-500 to-rose-500",
    badge: "Dynamic"
  },
  {
    icon: Fingerprint,
    title: "Predictive Identity Intelligence",
    description: "Map complex user behavior journeys at a granular level using privacy-first deterministic and probabilistic AI matching algorithms.",
    color: "from-teal-500 to-blue-500",
    badge: "Advanced"
  }
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-transparent rounded-full blur-[160px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-extrabold text-blue-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Engineered for <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Ultimate Data Supremacy
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            NeuroSphere provides a complete, hyper-integrated cognitive business intelligence suite designed to transform enterprise data into massive financial leverage.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`glass-card p-8 rounded-3xl border transition-all duration-500 relative group overflow-hidden ${
                  isHovered 
                    ? "bg-white/[0.06] border-white/20 shadow-2xl shadow-blue-500/10 scale-102 -translate-y-1" 
                    : "bg-[#09090c]/80 border-white/10 shadow-xl"
                }`}
              >
                {/* Active Hover Glow Blob */}
                {isHovered && (
                  <motion.div 
                    layoutId="featureHoverGlow"
                    className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10"
                    transition={{ duration: 0.4 }}
                  />
                )}

                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold text-white/60 uppercase tracking-wider group-hover:text-white group-hover:border-white/20 transition-all">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed font-medium mb-8 group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-xs font-extrabold text-white/40 group-hover:text-white transition-colors duration-300 pt-4 border-t border-white/10">
                  <span>Explore Technical Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 text-blue-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;
