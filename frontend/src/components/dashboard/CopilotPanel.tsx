"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot } from "lucide-react";

export function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] glass-card shadow-2xl flex flex-col z-50 overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="h-16 border-b border-white/10 bg-black/40 flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-white">
                <Bot className="text-primary w-5 h-5" />
                <span className="font-semibold">AI Copilot</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-3 border border-white/5 text-sm text-white/80">
                  Hello! I'm your NeuroSphere Copilot. I've analyzed today's data pipeline. Revenue is up 14.5%—would you like to see the correlation report?
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask the copilot..."
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
