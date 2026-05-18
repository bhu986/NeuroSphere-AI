"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const testimonials = [
  {
    quote: "NeuroSphere 2.0 completely transformed how our data engineering cluster operates. We eliminated 4 weeks of manual SQL pipeline maintenance within the first 48 hours of autonomous ingestion.",
    author: "Sarah Jenkins",
    role: "Chief Data Officer",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    quote: "The natural language AST Copilot is nothing short of revolutionary. Our executive team now queries petabytes of PostgreSQL transactions in plain English with zero injection risk or database lockups.",
    author: "Marcus Chen",
    role: "VP of Infrastructure",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    quote: "Experience Apple-level smoothness combined with Databricks-level raw processing power. NeuroSphere's autonomous Recharts telemetry has become our single source of executive truth.",
    author: "Elena Rostova",
    role: "Head of AI Research",
    company: "Snowflake",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-32 relative overflow-hidden bg-black/40 border-y border-white/10">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-[160px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-extrabold text-yellow-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Endorsements</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Trusted by World-Class <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400">
              Data Leaders
            </span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 sm:p-14 rounded-3xl border border-white/20 shadow-2xl shadow-yellow-500/10 bg-[#09090c]/90 backdrop-blur-3xl relative overflow-hidden space-y-8"
            >
              <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 pointer-events-none -z-0" />

              <div className="flex items-center gap-1.5 text-yellow-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 drop-shadow-md" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-relaxed tracking-tight relative z-10">
                "{current.quote}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-4">
                  <img 
                    src={current.avatar} 
                    alt={current.author} 
                    className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-lg"
                  />
                  <div>
                    <h4 className="text-base font-extrabold text-white tracking-tight">{current.author}</h4>
                    <p className="text-xs text-white/60 font-medium">{current.role}, <span className="text-white font-bold">{current.company}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MagneticWrapper pull={0.2}>
                    <button 
                      onClick={handlePrev}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all shadow-sm active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </MagneticWrapper>
                  <MagneticWrapper pull={0.2}>
                    <button 
                      onClick={handleNext}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all shadow-sm active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </MagneticWrapper>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-yellow-400 shadow-lg shadow-yellow-400/50" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default TestimonialsCarousel;
