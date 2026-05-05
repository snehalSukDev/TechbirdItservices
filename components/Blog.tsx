"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  return (
    <section id="blog" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div
        className="glow-orb w-[500px] h-[500px] bg-violet-600 top-[-100px] right-[10%]"
        style={{ opacity: 0.06 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-sm text-blue-300 mb-5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Insights & Ideas
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              From Our{" "}
              <span className="gradient-text">Blog</span>
            </h2>
          </div>
          <a
            href="#"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-xl glass border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
          >
            All articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-3xl glass border border-white/[0.06] hover:border-white/[0.12] hover:shadow-card-hover overflow-hidden transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

                {/* Category */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${post.color}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-indigo-300 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="flex items-center gap-1 mt-4 text-sm text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>Read article</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
