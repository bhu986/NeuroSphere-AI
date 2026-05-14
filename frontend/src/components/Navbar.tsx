"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">NeuroSphere AI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full py-4 px-6 flex flex-col gap-4 border-t border-white/10">
          <a href="#features" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#platform" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Platform</a>
          <a href="#pricing" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <button className="bg-white text-black px-5 py-2 rounded-full font-semibold w-full">
            Get Started
          </button>
        </div>
      )}
    </motion.nav>
  );
}
