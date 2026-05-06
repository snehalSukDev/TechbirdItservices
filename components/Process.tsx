"use client";

import { motion } from "framer-motion";
import { Search, Pen, Code2, Rocket } from "lucide-react";
import { process as steps } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Search, Pen, Code2, Rocket,
};

export default function Process() {
  return (
    <section id="process" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/20 to-dark-900" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div
        className="glow-orb w-[500px] h-[500px] bg-indigo-500 top-[30%] right-[-100px]"
        style={{ opacity: 0.06 }}
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/20 text-sm text-emerald-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            How We Work
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            A battle-tested, four-phase workflow that takes your idea from rough
            concept to polished, production-grade product.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          {steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col items-center text-center p-6 rounded-3xl glass border border-white/[0.06] hover:border-indigo-500/20 hover:shadow-card-hover transition-all duration-300"
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bg} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300`} />

                {/* Step number */}
                <div className="relative z-10 mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.bg} border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  {/* Step badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-400">{step.step}</span>
                  </div>
                </div>

                <h3 className={`relative z-10 text-xl font-bold text-white mb-3 group-hover:${step.color} transition-colors duration-300`}>
                  {step.title}
                </h3>
                <p className="relative z-10 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>

                {/* Arrow connector (mobile) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-6 text-gray-600">
                    <svg className="w-5 h-5 mx-auto rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-gray-400 mb-4">
            Ready to start your project?
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-[#9b81c9] to-[#7c64b1] hover:from-[#a890d0] hover:to-[#8a70bc] shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
          >
            Start a Project
            <Rocket className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
