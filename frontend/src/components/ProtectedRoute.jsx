"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "./Navigate";
import { Sparkles, Loader2 } from "lucide-react";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 overflow-hidden font-sans">
        {/* Cinematic Backdrop Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Loading Content */}
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-2xl border border-white/20 animate-ping opacity-40" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Authenticating Session...</span>
            </h3>
            <p className="text-xs text-white/40 font-medium">Securing cognitive intelligence environment</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
