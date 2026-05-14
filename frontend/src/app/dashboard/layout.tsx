import { Sidebar } from "@/components/dashboard/Sidebar";
import { CopilotPanel } from "@/components/dashboard/CopilotPanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex relative">
      <Sidebar />
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Subtle background glow for the dashboard area */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
        
        <div className="flex-1 p-6 md:p-8 overflow-x-hidden relative z-10">
          {children}
        </div>
      </main>
      <CopilotPanel />
    </div>
  );
}
