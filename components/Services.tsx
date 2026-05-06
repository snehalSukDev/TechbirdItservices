"use client";

import { useRef } from "react";
import {
  motion, useScroll, useTransform, useSpring,
} from "framer-motion";
import {
  Globe, Palette, Layers, Cpu, Cloud, Sparkles, ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Globe, Palette, Layers, Cpu, Cloud, Sparkles,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  /*
   * Full scroll journey:
   *  0   = section just enters viewport from bottom
   *  0.3 = section top reaches viewport top (fully "in")
   *  1   = section bottom reaches viewport top (fully scrolled past)
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* ── Entry: slides up, rounded corners flatten ── */
  const rawY      = useTransform(scrollYProgress, [0, 0.28], [70, 0]);
  const rawScale  = useTransform(scrollYProgress, [0, 0.28, 0.75, 1], [0.96, 1, 1, 0.94]);
  const rawRadius = useTransform(scrollYProgress, [0, 0.28], [28, 0]);
  const rawOpacity= useTransform(scrollYProgress, [0, 0.15, 0.72, 1], [0.85, 1, 1, 0.82]);

  const y       = useSpring(rawY,      { stiffness: 90, damping: 22 });
  const scale   = useSpring(rawScale,  { stiffness: 90, damping: 22 });
  const radius  = useSpring(rawRadius, { stiffness: 90, damping: 22 });

  /* top shadow that appears as section "lifts over" the one above */
  const shadowY = useTransform(scrollYProgress, [0, 0.28], [0, 1]);

  return (
    /* outer div provides the scroll target (full natural height) */
    <div ref={ref}>
      <motion.section
        id="services"
        style={{
          y,
          scale,
          opacity: rawOpacity,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          boxShadow: useTransform(
            shadowY,
            [0, 1],
            ["0 -8px 0px 0px rgba(0,0,0,0)", "0 -40px 80px 20px rgba(0,0,0,0.55)"]
          ),
        }}
        className="relative overflow-hidden bg-dark-900 py-28 will-change-transform"
      >
        {/* Background glow */}
        <div
          className="glow-orb w-[800px] h-[800px] bg-indigo-600 absolute top-[50%] left-[50%]"
          style={{ transform: "translate(-50%, -50%)", opacity: 0.04 }}
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/20 text-sm text-indigo-300 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              What We Do
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              Services Built for{" "}
              <span className="gradient-text">Scale</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
              From pixel-perfect interfaces to enterprise-grade infrastructure —
              we deliver end-to-end digital solutions that drive real business results.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`group relative p-6 rounded-3xl glass border border-white/[0.06] ${service.border} transition-all duration-300 hover:shadow-card-hover cursor-pointer overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`svc-icon w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} border border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: `0 0 20px ${service.glow}` }}
                    >
                      <Icon className="w-6 h-6 dark:text-white" />
                    </div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 group-hover:border-white/[0.1] group-hover:text-gray-300 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-400 hover:text-white rounded-2xl glass border border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300"
            >
              Discuss your project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
