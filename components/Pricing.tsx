"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { pricing } from "@/lib/data";

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/20 to-dark-900" />
      <div
        className="glow-orb w-[600px] h-[600px] bg-indigo-600 top-[50%] left-[50%]"
        style={{ transform: "translate(-50%, -50%)", opacity: 0.05 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-amber-500/20 text-sm text-amber-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Simple,{" "}
            <span className="gradient-text">Honest</span> Pricing
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            No hidden fees, no surprises. Pick the plan that matches your ambition.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: plan.highlight ? -8 : -4 }}
              className={`relative p-7 rounded-3xl border transition-all duration-300 flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-br from-indigo-600/15 to-violet-600/10 border-indigo-500/40 shadow-glow-md"
                  : `glass ${plan.border}`
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-xs font-semibold text-white shadow-glow-sm">
                    <Zap className="w-3 h-3 fill-white" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={plan.highlight ? "mt-3" : ""}>
                {/* Plan name */}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-7">
                  <div className="flex items-end gap-2">
                    <span
                      className={`text-5xl font-bold tracking-tight ${
                        plan.highlight ? "gradient-text" : "text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm mb-2">/ {plan.period}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                          plan.highlight
                            ? "bg-indigo-500/20 text-indigo-400"
                            : "bg-white/[0.05] text-gray-400"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className={`mt-auto block text-center py-3.5 px-6 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? "btn-primary bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-glow-sm hover:shadow-glow-md"
                    : "glass border border-white/[0.08] text-gray-300 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          All plans include source code ownership. Need something custom?{" "}
          <a href="#contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Let&apos;s talk.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
