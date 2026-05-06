"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const NODE_COLORS: [number, number, number][] = [
  [129, 140, 248],
  [167, 139, 250],
  [34, 211, 238],
];

/* ────────────────────────────────────────────
   Particle canvas — network + click bursts
──────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const COUNT = 100;
    const CONNECT = 155;
    const REPEL = 90;
    const ATTRACT = 260;

    const pts = Array.from({ length: COUNT }, () => {
      const [r, g, b] = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        rad: Math.random() * 1.8 + 0.7,
        op: Math.random() * 0.45 + 0.25,
        phase: Math.random() * Math.PI * 2,
        r, g, b,
      };
    });

    interface Burst { x: number; y: number; vx: number; vy: number; life: number; r: number; g: number; b: number; }
    const bursts: Burst[] = [];

    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx < 0 || cx > w || cy < 0 || cy > h) return;
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.25;
        const speed = Math.random() * 5 + 1.5;
        const [r, g, b] = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
        bursts.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, r, g, b });
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("click", onClick);

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < REPEL && d > 0) {
          const f = ((REPEL - d) / REPEL) * 0.028;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        } else if (d < ATTRACT && d > 0) {
          const f = ((ATTRACT - d) / ATTRACT) * 0.004;
          p.vx -= (dx / d) * f; p.vy -= (dy / d) * f;
        }

        p.vx *= 0.984; p.vy *= 0.984;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)); }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)); }

        const near = d < 160;
        const pulse = near ? 1 + (1 - d / 160) * 2.5 : 1;
        const alpha = Math.min(1, p.op + Math.sin(t * 1.8 + p.phase) * 0.12);

        if (near) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.rad * pulse * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${(1 - d / 160) * 0.18})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.rad * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${(pts[i].r + pts[j].r) >> 1},${(pts[i].g + pts[j].g) >> 1},${(pts[i].b + pts[j].b) >> 1},${(1 - d / CONNECT) * 0.28})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx; b.y += b.vy;
        b.vx *= 0.91; b.vy *= 0.91;
        b.life -= 0.022;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3.5 * b.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${b.r},${b.g},${b.b},${b.life * 0.9})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── Cursor glow ── */
function CursorGlow() {
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 65, damping: 20 });
  const sy = useSpring(my, { stiffness: 65, damping: 20 });

  useEffect(() => {
    const h = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-[700px] h-[700px] rounded-full"
      style={{
        left: sx, top: sy,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, rgba(139,92,246,0.05) 40%, transparent 68%)",
      }}
    />
  );
}

/* ── Magnetic button ── */
function MagneticButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.38);
    y.set((e.clientY - r.top - r.height / 2) * 0.38);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={primary
        ? { boxShadow: "0 0 44px rgba(155,129,201,0.6)", scale: 1.05 }
        : { scale: 1.04 }
      }
      whileTap={{ scale: 0.95 }}
      className={primary
        ? "btn-primary group flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-[#9b81c9] to-[#7c64b1] hover:from-[#a890d0] hover:to-[#8a70bc] shadow-glow-sm transition-colors duration-300"
        : "group flex items-center gap-2 px-7 py-3.5 text-base font-medium text-gray-300 hover:text-white rounded-2xl glass border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.05] transition-all duration-300"
      }
    >
      {children}
    </motion.a>
  );
}

/* ── Floating tech tag (each is its own component so hooks work per-instance) ── */
function FloatingTag({
  label, depth, left, top, delay,
  mouseX, mouseY,
}: {
  label: string; depth: number; left: string; top: string; delay: number;
  mouseX: MotionValue<number>; mouseY: MotionValue<number>;
}) {
  const cfg = { stiffness: 38, damping: 18 };
  const range = depth * 220;
  const tx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-range, range]), cfg);
  const ty = useSpring(useTransform(mouseY, [-0.5, 0.5], [-range, range]), cfg);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 0.65, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.18, opacity: 1 }}
      style={{ left, top, x: tx, y: ty }}
      className="absolute pointer-events-auto cursor-default hidden lg:block"
    >
      <div className="px-3.5 py-1.5 rounded-full glass border border-white/[0.07] hover:border-indigo-500/35 text-xs text-gray-500 hover:text-indigo-300 whitespace-nowrap select-none transition-colors duration-300 backdrop-blur-sm shadow-sm">
        {label}
      </div>
    </motion.div>
  );
}

/* ── Tilt headline ── */
function TiltHeadline({ children }: { children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 110, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className="cursor-default"
    >
      {children}
    </motion.div>
  );
}

const TAGS = [
  { label: "ERPNext", depth: 0.04, left: "7%", top: "18%", delay: 1.3 },
  { label: "RAG Pipelines", depth: 0.07, left: "82%", top: "14%", delay: 1.45 },
  { label: "AI Agents", depth: 0.05, left: "85%", top: "68%", delay: 1.6 },
  { label: "Next.js", depth: 0.06, left: "4%", top: "72%", delay: 1.5 },
  { label: "Frappe", depth: 0.03, left: "12%", top: "48%", delay: 1.35 },
  { label: "LLMs", depth: 0.08, left: "78%", top: "40%", delay: 1.7 },
  { label: "Cloud Infra", depth: 0.04, left: "43%", top: "90%", delay: 1.55 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onSectionMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) / r.width);
    mouseY.set((e.clientY - r.top - r.height / 2) / r.height);
  }, [mouseX, mouseY]);

  const cfg = { stiffness: 44, damping: 22 };
  const orb1x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), cfg);
  const orb1y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), cfg);
  const orb2x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-52, 52]), cfg);
  const orb2y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-52, 52]), cfg);
  const orb3x = useSpring(useTransform(mouseX, [-0.5, 0.5], [38, -38]), cfg);
  const orb3y = useSpring(useTransform(mouseY, [-0.5, 0.5], [38, -38]), cfg);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={onSectionMove}
    >
      {/* Animated gradient bg */}
      <div className="absolute inset-0 bg-dark-900">
        <div className="hero-gradient-anim absolute inset-0" />
      </div>

      {/* Particle network + click bursts */}
      <ParticleCanvas />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Grid */}
      <div className="absolute inset-0 grid-overlay opacity-25" />

      {/* Parallax glow orbs */}
      <motion.div style={{ x: orb1x, y: orb1y }}
        className="absolute top-[-150px] left-[-100px] w-[620px] h-[620px] rounded-full bg-indigo-600 blur-[130px] opacity-[0.15] pointer-events-none" />
      <motion.div style={{ x: orb2x, y: orb2y }}
        className="absolute bottom-[-100px] right-[-100px] w-[520px] h-[520px] rounded-full bg-violet-600 blur-[110px] opacity-[0.13] pointer-events-none" />
      <motion.div style={{ x: orb3x, y: orb3y }}
        className="absolute top-[35%] right-[15%] w-[330px] h-[330px] rounded-full bg-cyan-500 blur-[90px] opacity-[0.09] pointer-events-none" />

      {/* Floating tech tags */}
      {TAGS.map((tag) => (
        <FloatingTag key={tag.label} {...tag} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        {/* <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/25 text-sm text-indigo-300 mb-8 tracking-widest uppercase font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          ERPNext · Agentic AI · Cloud · Web
        </motion.div> */}

        {/* Tilt headline */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <TiltHeadline>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-[96px] font-bold tracking-tight leading-[1.0] mb-6">
              Move fast.
              <br />
              <span className="gradient-text">Break nothing.</span>
            </h1>
          </TiltHeadline>
        </motion.div>

        {/* Subheading */}
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-10"
        >
          ERPNext. AI agents. RAG pipelines. Cloud infrastructure.{" "}
          <span className="text-gray-300">Built in Pune,</span> shipped across{" "}
          <span className="text-gray-300">India, UK, US and UAE.</span>
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="#contact" primary>
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </MagneticButton>
          <MagneticButton href="#portfolio">
            <Play className="w-4 h-4 fill-current opacity-70" />
            View Our Work
          </MagneticButton>
        </motion.div>

        {/* Social proof */}
        {/* <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["RM", "PN", "AS", "SP"].map((initials, i) => (
                <div key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b81c9] to-[#7c64b1] flex items-center justify-center text-[10px] font-bold !text-white border-2 border-dark-900"
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
        </motion.div> */}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        {/* <span className="text-[10px] uppercase tracking-[0.22em]">scroll</span> */}
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}
