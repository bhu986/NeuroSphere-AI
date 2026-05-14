"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams getting started with AI analytics.",
    features: ["Up to 100k data points/mo", "Basic dashboards", "Email support", "3 Team members"],
    highlighted: false
  },
  {
    name: "Pro",
    price: "$199",
    description: "For growing companies that need advanced cognitive processing.",
    features: ["Unlimited data points", "Predictive modeling", "Priority 24/7 support", "Unlimited team members", "Custom integrations"],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Dedicated infrastructure and bespoke AI models for large orgs.",
    features: ["Dedicated compute cluster", "On-premise deployment option", "Dedicated success manager", "Custom AI training", "SLA guarantee"],
    highlighted: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            Choose the plan that fits your intelligence needs. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 relative ${tier.highlighted ? 'border-primary/50 shadow-2xl shadow-primary/20 md:-translate-y-4 bg-white/10' : 'border-white/10'}`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-white/60">/month</span>}
              </div>
              <p className="text-white/60 mb-8 h-12">{tier.description}</p>
              
              <button className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${tier.highlighted ? 'bg-white text-black hover:bg-white/90 cursor-pointer' : 'bg-white/10 text-white hover:bg-white/20 cursor-pointer'}`}>
                {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>

              <div className="space-y-4">
                {tier.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
