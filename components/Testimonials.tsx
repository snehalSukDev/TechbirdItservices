"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

const INTERVAL = 3000;
const CARD_W = 400;
const GAP = 28;
const CARD_STEP = CARD_W + GAP;

export default function Testimonials() {
  const [[active, dir], setActive] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* measure container */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const navigate = useCallback((newDir: number) => {
    setActive(([cur]) => {
      const next = (cur + newDir + testimonials.length) % testimonials.length;
      return [next, newDir];
    });
    setProgress(0);
  }, []);

  const goTo = useCallback((idx: number) => {
    setActive(([cur]) => [idx, idx >= cur ? 1 : -1]);
    setProgress(0);
  }, []);

  /* auto-advance */
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    timerRef.current = setInterval(() => navigate(1), INTERVAL);
    progressRef.current = setInterval(
      () => setProgress((p) => Math.min(p + 100 / (INTERVAL / 50), 100)),
      50
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, active, navigate]);

  /* track x: center the active card */
  const offset = containerW / 2 - CARD_W / 2;
  const trackX = offset - active * CARD_STEP;

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="glow-orb w-[600px] h-[600px] bg-violet-600 top-[20%] left-[30%]" style={{ opacity: 0.05 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-500/20 text-sm text-pink-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Client Stories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Loved by{" "}
            <span className="gradient-text">Builders</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Don&apos;t take our word for it — hear from the teams we&apos;ve helped build remarkable things.
          </p>
        </motion.div>

        {/* Carousel track */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); setProgress(0); }}
        >
          <motion.div
            className="flex"
            animate={{ x: trackX }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            style={{ gap: GAP }}
          >
            {testimonials.map((t, i) => {
              const dist = Math.abs(i - active);
              const isActive = i === active;
              const isAdjacent = dist === 1;

              return (
                <motion.div
                  key={t.id}
                  animate={{
                    scale: isActive ? 1 : isAdjacent ? 0.9 : 0.82,
                    opacity: isActive ? 1 : isAdjacent ? 0.55 : 0.2,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0 cursor-pointer"
                  style={{ width: CARD_W }}
                  onClick={() => !isActive && goTo(i)}
                >
                  <div
                    className={`h-full rounded-2xl overflow-hidden transition-all duration-400 ${isActive
                        ? "glass border border-indigo-500/25 shadow-[0_0_40px_rgba(99,102,241,0.12)]"
                        : "glass border border-white/[0.05]"
                      }`}
                  >
                    {/* Top: quote + text */}
                    <div className="p-8 pb-6">
                      {/* Big quote mark */}
                      <div className={`text-6xl font-bold leading-none mb-4 select-none ${isActive ? "gradient-text" : "text-indigo-900"}`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        "
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <svg key={s} className={`w-4 h-4 fill-current ${isActive ? "text-amber-400" : "text-amber-900"}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote text */}
                      <p className={`text-[15px] leading-relaxed ${isActive ? "text-gray-200" : "text-gray-500"}`}>
                        {t.text}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className={`mx-8 h-px ${isActive ? "bg-white/[0.08]" : "bg-white/[0.03]"}`} />

                    {/* Author */}
                    <div className="flex items-center gap-4 px-8 py-5">
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${isActive ? "text-white" : "text-gray-500"}`}>
                          {t.name}
                        </div>
                        <div className={`text-xs mt-0.5 ${isActive ? "text-indigo-400" : "text-gray-600"}`}>
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          {/* Prev */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous"
            className="w-10 h-10 rounded-full glass border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots + progress */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                >
                  <motion.span
                    animate={{
                      width: i === active ? 28 : 8,
                      backgroundColor: i === active ? "#818cf8" : "rgba(255,255,255,0.15)",
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="block h-2 rounded-full"
                  />
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="w-24 h-px bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0 }}
              />
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            aria-label="Next"
            className="w-10 h-10 rounded-full glass border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
