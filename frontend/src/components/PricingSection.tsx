"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const tiers = [
  {
    name: "Starter AI",
    priceMonthly: "$49",
    priceAnnual: "$39",
    description: "Perfect for seed-stage startups and small analytical teams getting started with vector BI.",
    features: ["Up to 100k data points/mo", "Basic Recharts dashboards", "Standard Gemini 2.5 Flash copilot", "Community Discord support", "3 Team members"],
    highlighted: false,
    color: "from-blue-500 to-indigo-500"
  },
  {
    name: "Professional AI",
    priceMonthly: "$199",
    priceAnnual: "$159",
    description: "For hyper-growth SaaS companies requiring advanced cognitive processing & predictive modeling.",
    features: ["Unlimited data points", "Predictive revenue area models", "Advanced AST-validated SQL Copilot", "Priority 24/7 email support", "Unlimited team members", "Custom API & webhook integrations"],
    highlighted: true,
    color: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    name: "Enterprise Core",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    description: "Dedicated isolated vector clusters and bespoke fine-tuned transformer models for large orgs.",
    features: ["Dedicated PostgreSQL compute cluster", "On-premise / VPC deployment option", "Dedicated Principal Success CDO", "Custom AI weights fine-tuning", "99.99% Uptime SLA guarantee", "SOC2 & HIPAA BAA compliance"],
    highlighted: false,
    color: "from-purple-500 to-pink-500"
  }
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-[#050505]">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-extrabold text-purple-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Predictable Pricing for <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Infinite Data Leverage
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Choose the dedicated compute cluster that fits your enterprise intelligence velocity. No hidden vector storage fees.
          </motion.p>

          {/* Billing Period Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-6 flex items-center justify-center gap-4"
          >
            <span className={`text-xs font-extrabold transition-colors ${!isAnnual ? "text-white" : "text-white/40"}`}>Monthly Billing</span>
            
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-white/10 border border-white/20 p-1 flex items-center transition-all shadow-inner"
            >
              <motion.div 
                className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-md"
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-extrabold transition-colors ${isAnnual ? "text-white" : "text-white/40"}`}>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold shadow-sm animate-pulse">
                SAVE 20%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`glass-card p-8 sm:p-10 rounded-3xl border transition-all duration-500 relative flex flex-col justify-between group overflow-hidden ${
                tier.highlighted 
                  ? "bg-white/[0.08] border-blue-500/50 shadow-2xl shadow-blue-500/20 md:-translate-y-4 scale-102" 
                  : "bg-[#09090c]/80 border-white/10 shadow-xl hover:border-white/20"
              }`}
            >
              {tier.highlighted && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-full blur-3xl -z-10 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[10px] font-extrabold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/50 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" />
                    <span>MOST POPULAR CLUSTER</span>
                  </div>
                </>
              )}

              {/* Card Top */}
              <div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{tier.name}</h3>
                <p className="text-white/60 text-xs font-medium leading-relaxed mb-6 h-12">{tier.description}</p>

                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/10">
                  <span className="text-5xl font-black text-white tracking-tight">
                    {tier.priceMonthly === "Custom" ? "Custom" : isAnnual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  {tier.priceMonthly !== "Custom" && <span className="text-white/40 text-xs font-extrabold">/ month</span>}
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <div className={`p-1 rounded-lg ${tier.highlighted ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-white/60"} shrink-0`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white/80 text-xs font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <MagneticWrapper pull={tier.highlighted ? 0.2 : 0.15} className="w-full">
                <button 
                  onClick={() => window.location.href = "/dashboard"}
                  className={`w-full py-4 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
                    tier.highlighted 
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-102 active:scale-95" 
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white hover:scale-102 active:scale-95"
                  }`}
                >
                  {tier.priceMonthly === "Custom" ? "Contact Enterprise Sales" : "Deploy Cluster Now"}
                </button>
              </MagneticWrapper>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
