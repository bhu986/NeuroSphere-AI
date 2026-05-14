import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Global subtle noise texture for that premium feel */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-50"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>
      
      <Navbar />
      <HeroSection />
      
      {/* Separator gradient */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />
      
      <FeaturesSection />
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />
      
      <PricingSection />
      
      <Footer />
    </main>
  );
}
