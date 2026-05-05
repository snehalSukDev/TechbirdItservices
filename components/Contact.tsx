"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/30 to-dark-900" />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div
        className="glow-orb w-[600px] h-[600px] bg-indigo-600 bottom-[-200px] right-[-100px]"
        style={{ opacity: 0.08 }}
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
            Get in Touch
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Let&apos;s Build{" "}
            <span className="gradient-text">Something</span>
            <br />
            Remarkable
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Tell us about your project. We typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "amit.thakur@techbirdit.in",
                sub: "We reply within 24h",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 89880 75977",
                sub: "Mon–Sat, 9am–7pm IST",
              },
              {
                icon: MapPin,
                label: "Website",
                value: "techbirdit.in",
                sub: "Global remote-first team",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-2xl glass border border-white/[0.06] hover:border-indigo-500/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                  <div className="text-sm font-medium text-white">{item.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="flex-1 min-h-[200px] rounded-2xl overflow-hidden glass border border-white/[0.06] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830894607!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)", minHeight: "200px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WebTech Office Location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="p-7 sm:p-8 rounded-3xl glass border border-white/[0.06]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm">
                    Thanks for reaching out. We&apos;ll review your project details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-2 px-5 py-2.5 text-sm font-medium text-indigo-400 hover:text-white rounded-xl glass border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-field w-full px-4 py-3 rounded-xl text-sm text-white bg-[#0d1424] border border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="web">Web Development</option>
                      <option value="design">UI/UX Design</option>
                      <option value="saas">SaaS Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="security">Cybersecurity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project, timeline, and budget..."
                      className="input-field w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
