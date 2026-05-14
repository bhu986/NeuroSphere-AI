"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield, Database, LayoutDashboard, Fingerprint } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Cognitive Processing",
    description: "Advanced neural networks process your unstructured data to find hidden patterns and correlations."
  },
  {
    icon: <Zap className="w-6 h-6 text-secondary" />,
    title: "Real-time Analytics",
    description: "Stream and analyze millions of data points with zero latency for split-second decision making."
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC2 compliance ensure your proprietary data never leaks."
  },
  {
    icon: <Database className="w-6 h-6 text-secondary" />,
    title: "Unified Data Lake",
    description: "Connect silos instantly. We integrate with 100+ databases and APIs out of the box."
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    title: "Dynamic Dashboards",
    description: "AI-generated views that adapt to what matters most to your business context."
  },
  {
    icon: <Fingerprint className="w-6 h-6 text-secondary" />,
    title: "Identity Intelligence",
    description: "Understand user behavior at a granular level with privacy-first tracking."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Everything you need to scale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            NeuroSphere provides a complete suite of intelligence tools designed for modern, data-driven enterprises.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
