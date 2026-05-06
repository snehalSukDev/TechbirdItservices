"use client";

import { motion } from "framer-motion";
import { clients } from "@/lib/data";

export default function TrustedBy() {
  const doubled = [...clients, ...clients];

  return (
    <section id="trustedby" className="py-16 relative overflow-hidden border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800/50 to-dark-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-500 uppercase tracking-widest font-medium"
        >
          Trusted by innovative teams worldwide
        </motion.p>
      </div>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {doubled.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 flex items-center gap-2 group"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500/40 group-hover:bg-indigo-400 transition-colors duration-300" />
              <span className="text-gray-500 hover:text-gray-300 font-semibold text-sm tracking-wide transition-colors duration-300 whitespace-nowrap select-none">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
