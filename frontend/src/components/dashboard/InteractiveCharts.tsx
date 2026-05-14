"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', current: 4000, predicted: 4400 },
  { name: 'Tue', current: 3000, predicted: 3200 },
  { name: 'Wed', current: 2000, predicted: 2400 },
  { name: 'Thu', current: 2780, predicted: 2900 },
  { name: 'Fri', current: 1890, predicted: 2100 },
  { name: 'Sat', current: 2390, predicted: 2500 },
  { name: 'Sun', current: 3490, predicted: 3800 },
];

export function InteractiveCharts() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="h-[400px] glass-card animate-pulse border-white/5" />;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 border-white/5 h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Demand Forecasting</h3>
          <p className="text-sm text-white/50">Current vs AI Predicted values</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-white/70">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-white/70">Predicted</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPredicted)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
