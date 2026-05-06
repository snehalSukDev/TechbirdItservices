"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import AnimatedLogo from "@/components/AnimatedLogo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [popup, setPopup] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      setScrolled(y > 20);
      setPopup(y > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <>
      <AnimatePresence mode="wait">
        {!popup ? (
          /* ── Full-width navbar (normal) ── */
          <motion.header
            key="full"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled
                ? "py-3 dark:bg-[#030712]/85 bg-white/90 backdrop-blur-xl border-b dark:border-white/[0.06] border-black/[0.06] shadow-sm"
                : "py-5 bg-transparent"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <Logo />
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <NavLink key={link.label} {...link} />
                ))}
              </nav>
              <div className="hidden md:flex items-center gap-2">
                {mounted && <ThemeToggle isDark={isDark} toggle={toggleTheme} />}
                <a
                  href="#contact"
                  className="btn-primary px-5 py-2 text-sm font-medium !text-white rounded-xl bg-gradient-to-r from-[#9b81c9] to-[#7c64b1] hover:from-[#a890d0] hover:to-[#8a70bc] shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
                >
                  Get Started
                </a>
              </div>
              <div className="md:hidden flex items-center gap-2">
                {mounted && <ThemeToggle isDark={isDark} toggle={toggleTheme} />}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 rounded-lg dark:text-gray-400 text-slate-500 hover:text-indigo-500 dark:hover:bg-white/[0.05] hover:bg-black/[0.05] transition-all"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.header>
        ) : (
          /* ── Popup pill navbar (after 80% scroll) ── */
          <motion.div
            key="popup"
            initial={{ y: -60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl dark:bg-[#0d1424]/90 bg-white/95 backdrop-blur-xl dark:border dark:border-white/[0.1] border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <Logo compact />
              <div className="hidden sm:flex items-center gap-0.5 mx-1">
                {navLinks.map((link) => (
                  <NavLink key={link.label} {...link} compact />
                ))}
              </div>
              <div className="flex items-center gap-2 ml-1">
                {mounted && <ThemeToggle isDark={isDark} toggle={toggleTheme} compact />}
                <a
                  href="#contact"
                  className="btn-primary px-4 py-1.5 text-xs font-semibold !text-white rounded-xl bg-gradient-to-r from-[#9b81c9] to-[#7c64b1] hover:from-[#a890d0] hover:to-[#8a70bc] shadow-glow-sm transition-all duration-300 whitespace-nowrap"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && !popup && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 dark:bg-[#0a0f1e]/95 bg-white/95 backdrop-blur-xl border-b dark:border-white/[0.06] border-black/[0.06] md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm dark:text-gray-300 text-slate-600 hover:text-indigo-500 rounded-xl dark:hover:bg-white/[0.05] hover:bg-black/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t dark:border-white/[0.06] border-black/[0.06] mt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block text-center px-5 py-3 text-sm font-medium !text-white rounded-xl bg-gradient-to-r from-[#9b81c9] to-[#7c64b1]"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sub-components ── */

function Logo({ compact }: { compact?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2 group flex-shrink-0">
      <AnimatedLogo size={compact ? 28 : 34} />
      {!compact && (
        <span className="dark:text-white text-slate-900 font-bold text-lg tracking-tight">
          TechBird<span className="gradient-text"> IT</span>
        </span>
      )}
    </a>
  );
}

function NavLink({ label, href, compact }: { label: string; href: string; compact?: boolean }) {
  return (
    <a
      href={href}
      className={`dark:text-gray-400 text-slate-500 hover:text-indigo-500 dark:hover:text-white rounded-lg dark:hover:bg-white/[0.05] hover:bg-black/[0.04] transition-all duration-200 ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      {label}
    </a>
  );
}

function ThemeToggle({
  isDark,
  toggle,
  compact,
}: {
  isDark: boolean;
  toggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`rounded-lg dark:bg-white/[0.05] bg-black/[0.04] dark:border-white/[0.08] border-black/[0.08] border dark:text-gray-300 text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-200 ${
        compact ? "p-1.5" : "p-2"
      }`}
    >
      {isDark ? (
        <Sun className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      ) : (
        <Moon className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      )}
    </button>
  );
}
