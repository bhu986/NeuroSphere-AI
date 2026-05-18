"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Sparkles, Terminal, Code2, Check, Copy } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

const demoSuggestions = [
  "Calculate average salary by department",
  "Find top 5 highest financial transactions",
  "Summarize quarterly onboarding trend",
];

export function AIAssistantDemo() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am the NeuroSphere AI Copilot. Test my cognitive translation capabilities below by selecting a prompt chip or typing your own analytical question.",
      timestamp: "Just now"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = (text?: string) => {
    const query = text || inputQuery;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!text) setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      let simSql = `SELECT department, ROUND(AVG(salary), 2) AS avg_salary FROM "employees" GROUP BY department ORDER BY avg_salary DESC;`;
      let simText = `I have analyzed the 'employees' schema and generated an optimized PostgreSQL aggregation query. Here is the exact command:`;

      if (query.toLowerCase().includes("top") || query.toLowerCase().includes("highest")) {
        simSql = `SELECT transaction_id, user_id, amount, status FROM "financial_transactions" ORDER BY amount DESC LIMIT 5;`;
        simText = `Generated a high-performance top-tier sorting query against 'financial_transactions':`;
      } else if (query.toLowerCase().includes("trend") || query.toLowerCase().includes("quarterly")) {
        simSql = `SELECT DATE_TRUNC('quarter', onboarding_date) AS quarter, COUNT(*) AS new_hires FROM "employees" GROUP BY quarter ORDER BY quarter ASC;`;
        simText = `Synthesized a quarterly time-series grouping query for onboarding tracking:`;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: simText,
        sql: simSql,
        timestamp: "Just now"
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCopy = (sql: string, id: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-pink-600/10 to-transparent rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 max-w-[1650px] w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-extrabold text-pink-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Natural Language AI Copilot</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Chat with Your Data in <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
              Plain English
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            No SQL expertise required. Experience our interactive AI Assistant demo below. Ask a question, and watch it generate flawless PostgreSQL commands instantly.
          </motion.p>
        </div>

        {/* Chatbot Interface Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl border border-white/20 shadow-2xl shadow-pink-500/10 bg-[#09090c]/90 backdrop-blur-3xl overflow-hidden flex flex-col h-[650px]">
          
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 animate-pulse blur-sm" />
                <div className="relative p-3 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 text-white shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>NeuroSphere AI Assistant</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold animate-pulse">
                    ONLINE
                  </span>
                </h3>
                <p className="text-xs text-white/50 font-medium">Powered by Gemini 2.5 Flash Cognitive Engine</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-white/40 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl shadow-inner">
              <Terminal className="w-4 h-4 text-pink-400" />
              <span>AST-VALIDATED SQL</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex gap-4 ${isAi ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    isAi 
                      ? "bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 text-white shadow-pink-500/20" 
                      : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-blue-500/20"
                  }`}>
                    {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>

                  <div className={`max-w-[85%] space-y-4 ${isAi ? "" : "flex flex-col items-end"}`}>
                    <div className={`p-5 rounded-3xl backdrop-blur-md shadow-xl text-sm leading-relaxed font-medium inline-block ${
                      isAi 
                        ? "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm" 
                        : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-tr-sm shadow-blue-500/20 font-semibold"
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`block text-[10px] mt-2 font-bold ${isAi ? "text-white/40" : "text-white/70 text-right"}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sql && (
                      <div className="w-full bg-[#050505]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group/sql">
                        <div className="bg-white/[0.05] px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-white/60 font-bold">
                            <Code2 className="w-4 h-4 text-pink-400" />
                            <span>Generated PostgreSQL Command</span>
                          </div>
                          <button 
                            onClick={() => handleCopy(msg.sql!, msg.id)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all shadow-sm active:scale-95"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span className="text-[10px] font-extrabold uppercase tracking-wider">{copiedId === msg.id ? "Copied" : "Copy SQL"}</span>
                          </button>
                        </div>
                        <div className="p-4 font-mono text-xs text-pink-300 overflow-x-auto leading-relaxed">
                          {msg.sql}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-3xl rounded-tl-sm flex items-center gap-3 shadow-xl">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} className="w-2 h-2 rounded-full bg-pink-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-white/60 animate-pulse">AI Copilot is translating natural language...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggestion Chips */}
          <div className="px-6 py-3 border-t border-white/10 bg-white/[0.01] flex items-center gap-2 overflow-x-auto custom-scrollbar">
            <span className="text-[10px] font-extrabold text-white/40 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>Prompt Chips:</span>
            </span>
            {demoSuggestions.map((chip, idx) => (
              <button 
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={isTyping}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all shrink-0 shadow-sm disabled:opacity-50 hover:scale-102 active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-6 border-t border-white/10 bg-black/40 flex items-center gap-4">
            <div className="flex-1 relative group">
              <input 
                type="text" 
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your analytical question in plain English (e.g., Show quarterly hiring trend)..."
                disabled={isTyping}
                className="w-full bg-[#09090c]/90 border border-white/10 rounded-2xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 shadow-inner disabled:opacity-50"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isTyping || !inputQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-lg shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AIAssistantDemo;
