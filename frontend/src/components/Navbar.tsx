"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Menu, X, Sparkles, ArrowRight, Command } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "AI Workflow", href: "#workflow" },
    { name: "Live Preview", href: "#preview" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#050505]/70 backdrop-blur-2xl border-b border-white/10 py-4 shadow-2xl shadow-black/80" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <MagneticWrapper pull={0.15}>
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.location.href = "/"}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight group-hover:from-white group-hover:to-white transition-all duration-300">
                NeuroSphere <span className="text-blue-400 font-black">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full shadow-sm">
                Engine 2.0
              </span>
            </div>
          </div>
        </MagneticWrapper>

        {/* Desktop Nav Links with Animated Underline */}
        <div className="hidden md:flex items-center gap-2 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setActiveHover(link.name)}
              onMouseLeave={() => setActiveHover(null)}
              className="relative px-4 py-2 text-xs font-bold text-white/70 hover:text-white transition-colors duration-300"
            >
              <span className="relative z-10">{link.name}</span>
              {activeHover === link.name && (
                <motion.div
                  layoutId="navHoverIndicator"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-0 shadow-lg shadow-white/5"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right side CTA buttons */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticWrapper pull={0.2}>
            <button 
              onClick={() => window.location.href = "/login"}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-extrabold text-white transition-all duration-300 shadow-sm hover:shadow-white/10 active:scale-95"
            >
              Sign In
            </button>
          </MagneticWrapper>

          <MagneticWrapper pull={0.25}>
            <button 
              onClick={() => window.location.href = "/dashboard"}
              className="relative group px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-extrabold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </MagneticWrapper>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#09090c]/95 backdrop-blur-3xl border-t border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-extrabold text-white/80 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-white/30" />
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={() => window.location.href = "/login"}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-extrabold text-white shadow-sm"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = "/dashboard"}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
