"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";

const footerLinks = {
  Services: ["Web Development", "UI/UX Design", "SaaS Development", "AI Integration", "Cybersecurity", "Cloud & DevOps"],
  Company: ["About Us", "Our Work", "Process", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-dark-900" />
      <div
        className="glow-orb w-[400px] h-[400px] bg-indigo-600 bottom-[-200px] left-[20%]"
        style={{ opacity: 0.05 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="inline-flex items-center gap-2 mb-5 group">
              <AnimatedLogo size={36} />
              <span className="dark:text-white text-slate-900 font-bold text-lg tracking-tight">
                TechBird<span className="gradient-text"> IT</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
              Premier technology partner driving digital transformation across 50+
              countries. ERP, AI, Cloud, and custom software — built to scale.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/40 outline-none transition-all"
              />
              <button className="px-4 py-2.5 text-sm font-medium !text-white rounded-xl bg-gradient-to-r from-[#9b81c9] to-[#7c64b1] hover:from-[#a890d0] hover:to-[#8a70bc] transition-all duration-300 flex-shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} TechBird IT Services. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -2 }}
                className="w-8 h-8 rounded-lg glass border border-white/[0.06] hover:border-white/[0.12] flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>

          {/* Status indicator */}
          {/* <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div> */}
        </div>
      </div>
    </footer>
  );
}
