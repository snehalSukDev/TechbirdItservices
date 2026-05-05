"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-overlay opacity-100" />

      {/* Glow orbs */}
      <div
        className="glow-orb w-[600px] h-[600px] bg-indigo-600 top-[-200px] left-[-150px]"
        style={{ opacity: 0.12 }}
      />
      <div
        className="glow-orb w-[500px] h-[500px] bg-violet-600 bottom-[-100px] right-[-100px]"
        style={{ opacity: 0.1 }}
      />
      <div
        className="glow-orb w-[300px] h-[300px] bg-cyan-500 top-[40%] right-[20%]"
        style={{ opacity: 0.07 }}
      />

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[700px] h-[700px] rounded-full border border-indigo-500/20"
        />
        <motion.div
          animate={{ scale: [1.1, 1.02, 1.1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[950px] h-[950px] rounded-full border border-violet-500/10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">


        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Driving{" "}
          <span className="gradient-text">Digital</span>
          <br />
          Transformation
          <br />
          <span className="text-gray-400">for the Future</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-10"
        >
          TechBird IT Services turns complex operational challenges into streamlined
          digital solutions — through expert ERP, custom software, AI integration,
          and cloud infrastructure that scales from startup to enterprise.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="btn-primary group flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#portfolio"
            className="group flex items-center gap-2 px-7 py-3.5 text-base font-medium text-gray-300 hover:text-white rounded-2xl glass border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
          >
            <Play className="w-4 h-4 fill-current opacity-70" />
            View Our Work
          </a>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["RM", "PN", "AS", "SP"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold !text-white border-2 border-dark-900"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>100+ happy clients</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span>5.0 rating</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span>150+ projects delivered</span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}
