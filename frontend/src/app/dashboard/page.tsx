import { KPICards } from "@/components/dashboard/KPICards";
import { InteractiveCharts } from "@/components/dashboard/InteractiveCharts";
import { DatasetUpload } from "@/components/dashboard/DatasetUpload";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Bell, Search } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-white/60 text-sm">Welcome back. Here's what's happening with your data today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 w-full sm:w-64"
            />
          </div>
          <button className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-colors">
            <Bell className="w-4 h-4 text-white/80" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-background"></span>
          </button>
          <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 border border-white/20"></div>
        </div>
      </div>

      {/* KPI Row */}
      <KPICards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <InteractiveCharts />
        </div>
        
        {/* Insights takes up 1 column */}
        <div className="lg:col-span-1">
          <AIInsights />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DatasetUpload />
        </div>
        
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
