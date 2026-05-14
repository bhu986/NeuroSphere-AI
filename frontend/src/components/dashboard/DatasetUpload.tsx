"use client";

import { motion } from "framer-motion";
import { UploadCloud, FileType } from "lucide-react";

export function DatasetUpload() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6 border-white/5 h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Ingest Data</h3>
      <p className="text-sm text-white/50 mb-6">Drop CSV, JSON, or connect API</p>

      <div className="flex-1 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 hover:bg-white/5 hover:border-primary/50 transition-colors cursor-pointer group min-h-[200px]">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-primary" />
        </div>
        <div className="text-white font-medium mb-1">Drag & drop files</div>
        <div className="text-white/40 text-sm mb-4">or click to browse</div>
        <button className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors">
          Select Files
        </button>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-white/40">
        <span className="flex items-center gap-1"><FileType className="w-3 h-3" /> Supported: CSV, JSON, Parquet</span>
        <span>Max: 5GB</span>
      </div>
    </motion.div>
  );
}
