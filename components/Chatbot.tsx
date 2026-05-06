"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minimize2, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const RESPONSES: [RegExp, string][] = [
  [/^(hi|hello|hey|hii|howdy)/i,
    "Hi there! 👋 I'm TechBird's AI assistant. I can help you with our services, pricing, and more. What are you looking for?"],
  [/erp|erpnext|frappe/i,
    "TechBird is a certified ERPNext & Frappe implementation partner. We handle full-cycle deployments — from requirements gathering to go-live and ongoing support. Want to book a free discovery call?"],
  [/ai|agent|rag|llm|machine learning/i,
    "Our AI team builds custom AI agents, RAG pipelines, and LLM integrations tailored to your workflows. We've shipped production AI systems across India, UK, US and UAE 🌍"],
  [/cloud|devops|aws|azure|gcp|infrastructure/i,
    "We offer end-to-end Cloud & DevOps services — AWS/GCP/Azure deployments, CI/CD pipelines, Kubernetes, and infrastructure-as-code. Want to discuss your architecture?"],
  [/web|website|next\.?js|react|frontend/i,
    "We build high-performance web apps using Next.js, React, and Tailwind. From landing pages to full SaaS products — we've got you covered."],
  [/price|cost|pricing|quote|budget|rate/i,
    "Pricing depends on scope and requirements. We offer both project-based and monthly retainer models. Reach out at amit.thakur@techbirdit.in for a custom quote tailored to your needs."],
  [/contact|email|phone|reach|talk/i,
    "You can reach the team here:\n📧 amit.thakur@techbirdit.in\n📞 +91 89880 75977\n🌐 techbirdit.in\n\nWe typically respond within 24 hours."],
  [/about|company|who are you|techbird/i,
    "TechBird IT Services is a premier technology partner serving clients in 50+ countries. Built in Pune 🇮🇳, we deliver ERP, AI, Cloud, and custom software solutions for startups to enterprises."],
  [/portfolio|project|case study|work/i,
    "We've delivered 150+ projects including HRMS platforms, Lead Automation systems, Custom ERPs, e-commerce stores, and Financial platforms. Check out our Portfolio section above!"],
  [/service|what do you do|offer/i,
    "Our core services:\n• ERPNext / Frappe\n• Agentic AI & RAG Pipelines\n• Cloud & DevOps\n• Web & SaaS Development\n• UI/UX Design\n• Digital Marketing\n\nWhich area interests you?"],
  [/thank|thanks|thx/i,
    "You're welcome! 😊 Feel free to ask anything else or reach out at amit.thakur@techbirdit.in for a detailed conversation."],
  [/bye|goodbye|cya/i,
    "Goodbye! 👋 Don't hesitate to come back if you have more questions. Have a great day!"],
];

const DEFAULT =
  "Thanks for your message! For a detailed answer, I'd recommend reaching out to our team at amit.thakur@techbirdit.in or using the Contact section. We respond within 24 hours 🙂";

function getBotReply(input: string): string {
  for (const [pattern, reply] of RESPONSES) {
    if (pattern.test(input)) return reply;
  }
  return DEFAULT;
}

const SUGGESTIONS = ["What services do you offer?", "Tell me about ERPNext", "How can I contact you?"];

const SECTION_IDS = ["hero", "trustedby", "services", "about", "portfolio", "process", "testimonials", "blog"];

function scrollSection(dir: 1 | -1) {
  const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if (!els.length) return;
  const scrollTop = window.scrollY + 60;
  let best = 0;
  for (let i = els.length - 1; i >= 0; i--) {
    const top = els[i].getBoundingClientRect().top + window.scrollY;
    if (top <= scrollTop) { best = i; break; }
  }
  const next = Math.max(0, Math.min(els.length - 1, best + dir));
  if (next !== best) els[next].scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Hello! 👋 I'm TechBird's assistant. Ask me about our services, pricing, or anything else!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setHasNewMsg(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, role: "bot", text: getBotReply(trimmed) }]);
      setTyping(false);
    }, 900 + Math.random() * 400);
  }, []);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  }, [input, sendMessage]);

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 sm:right-8 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)] border border-white/[0.08]"
            style={{ maxHeight: "min(540px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#9b81c9] to-[#7c64b1] flex-shrink-0">
              <div className="flex items-center gap-2.5">
                {/* Logo in header */}
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center overflow-hidden p-1">
                  <Image src="/logo.png" alt="TechBird" width={28} height={28} className="object-contain" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white leading-none">TechBird AI</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-indigo-200">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-indigo-200 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0f1e]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#9b81c9] to-[#7c64b1] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 overflow-hidden p-0.5">
                      <Image src="/logo.png" alt="Bot" width={18} height={18} className="object-contain" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === "user"
                        ? "bg-gradient-to-br from-[#9b81c9] to-[#7c64b1] text-white rounded-br-sm"
                        : "bg-white/[0.06] border border-white/[0.06] text-gray-300 rounded-bl-sm"
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#9b81c9] to-[#7c64b1] flex items-center justify-center flex-shrink-0 overflow-hidden p-0.5">
                      <Image src="/logo.png" alt="Bot" width={18} height={18} className="object-contain" />
                    </div>
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/[0.06] flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-indigo-400 block"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-3 py-2 flex gap-2 flex-wrap bg-[#0a0f1e] border-t border-white/[0.04]">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 px-3 py-3 bg-[#0d1424] border-t border-white/[0.06] flex-shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500/50 transition-colors"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || typing}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9b81c9] to-[#7c64b1] flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll nav — vertically centered on the right edge */}
      <div className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
        <motion.button
          onClick={() => scrollSection(-1)}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Previous section"
          className="w-10 h-10 rounded-full glass border border-white/[0.1] hover:border-indigo-500/40 flex items-center justify-center text-gray-400 hover:text-indigo-300 transition-colors shadow-lg"
        >
          <ChevronUp className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => scrollSection(1)}
          whileHover={{ scale: 1.12, y: 2 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Next section"
          className="w-10 h-10 rounded-full glass border border-white/[0.1] hover:border-indigo-500/40 flex items-center justify-center text-gray-400 hover:text-indigo-300 transition-colors shadow-lg"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Chat FAB — bottom right */}
      <div className="fixed bottom-6 right-5 sm:right-8 z-50">
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Open chat"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#9b81c9] to-[#7c64b1] flex items-center justify-center shadow-[0_8px_32px_rgba(155,129,201,0.45)] hover:shadow-[0_8px_40px_rgba(155,129,201,0.65)] transition-shadow overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6 text-white" />
              </motion.span>
            ) : (
              <motion.span key="logo" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Image src="/logo.png" alt="TechBird Chat" width={32} height={32} className="object-contain brightness-0 invert" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {/* <AnimatePresence>
            {hasNewMsg && !open && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border-2 border-dark-900 flex items-center justify-center"
              >
                <span className="text-[9px] text-white font-bold">1</span>
              </motion.span>
            )}
          </AnimatePresence> */}
        </motion.button>
      </div>
    </>
  );
}

