import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AnimatedStatsSection } from "@/components/AnimatedStatsSection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AIWorkflowAnimation } from "@/components/AIWorkflowAnimation";
import { LiveAnalyticsPreview } from "@/components/LiveAnalyticsPreview";
import { AIAssistantDemo } from "@/components/AIAssistantDemo";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans">
      
      {/* Global Subtle Noise Overlay for Cinematic Depth */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-50"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Global Ambient Aurora Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-[160px] -z-10 pointer-events-none animate-[pulse_6s_infinite]" />
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/15 via-pink-600/10 to-blue-600/15 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[180px] -z-10 pointer-events-none" />

      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section with 3D Tilt Cards & Spotlight */}
      <HeroSection />

      {/* 3. Live Telemetry Counters */}
      <AnimatedStatsSection />

      {/* 4. Infinite Scrolling Logo Marquee */}
      <LogoMarquee />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* 5. Enterprise Capabilities Grid */}
      <FeaturesSection />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* 6. 4-Stage AI Neural Pipeline Animation */}
      <AIWorkflowAnimation />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* 7. Live Interactive Recharts Preview */}
      <LiveAnalyticsPreview />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* 8. Interactive Natural Language Copilot Chat Widget */}
      <AIAssistantDemo />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* 9. Executive Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* 10. Predictable Investment Pricing Grid */}
      <PricingSection />

      {/* 11. Footer */}
      <Footer />

    </main>
  );
}
