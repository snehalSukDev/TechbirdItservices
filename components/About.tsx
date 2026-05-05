"use client";

import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Briefcase, Clock } from "lucide-react";
import { stats } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Award, Users, Briefcase, Clock,
};

const statIconMap = [Award, Users, Briefcase, Clock];

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/30 to-dark-900" />
      <div
        className="glow-orb w-[600px] h-[600px] bg-violet-600 top-[-100px] right-[-200px]"
        style={{ opacity: 0.07 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 text-sm text-violet-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              About WebTech
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Your Premier{" "}
              <span className="gradient-text">Technology</span>
              {" "}Partner
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              TechBird IT Services is a premier technology partner dedicated to driving
              digital transformation for businesses ranging from agile startups to
              large-scale enterprises across 50+ countries.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              We specialize in turning complex operational challenges into streamlined
              digital solutions through expert consultancy, custom software development,
              Frappe & ERPNext implementations, and cutting-edge AI integration. We build
              scalable, secure, and future-ready technology foundations that align with
              your core business goals.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass border border-white/[0.06] hover:border-indigo-500/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-indigo-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Our Mission</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Empowering growth through scalable, intelligent technology that
                  solves real business challenges and creates lasting impact.
                </p>
              </div>
              <div className="p-5 rounded-2xl glass border border-white/[0.06] hover:border-violet-500/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 text-violet-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Our Vision</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  To be the most trusted global technology partner, enabling businesses
                  worldwide to thrive in the digital era.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => {
              const Icon = statIconMap[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-3xl glass border border-white/[0.06] hover:border-indigo-500/20 hover:shadow-card-hover transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}

            {/* Extra card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="col-span-2 p-6 rounded-3xl bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 text-center"
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="text-white font-semibold">Global reach, local expertise.</span>{" "}
                TechBird serves clients across 50+ countries, bringing diverse
                perspectives and round-the-clock execution to every project.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
