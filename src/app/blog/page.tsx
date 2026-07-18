"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const blogPosts = [
  {
    id: "01",
    title: "The Future of Edge Computing",
    category: "Infrastructure",
    date: "July 18, 2026",
  },
  {
    id: "02",
    title: "Next.js 15: Performance Benchmarks",
    category: "Development",
    date: "July 15, 2026",
  },
  {
    id: "03",
    title: "AI-Driven Data Analytics",
    category: "Artificial Intelligence",
    date: "July 12, 2026",
  },
  {
    id: "04",
    title: "Securing Microservices Architecture",
    category: "Cybersecurity",
    date: "July 10, 2026",
  },
  {
    id: "05",
    title: "React Server Components Deep Dive",
    category: "Development",
    date: "July 08, 2026",
  },
  {
    id: "06",
    title: "Scaling Distributed Databases",
    category: "System Design",
    date: "July 05, 2026",
  },
];

export default function ProfessionalBlogSection() {
  return (
    <section className="py-24 bg-[#0b111e] text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20 border-b border-white/10 pb-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Technical <span className="text-[#00ffaa]">Insights</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg">
            Deep dives into modern engineering, system design, and the latest in
            web technology. Curated for developers who build the future.
          </p>
        </div>

        <div className="flex flex-col">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between py-8 border-b border-white/5 hover:border-[#00ffaa]/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-10">
                <span className="text-[#00ffaa] font-black text-xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {post.id}
                </span>
                <div>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#00ffaa]/70 mb-2">
                    {post.category}
                    <span className="text-white/20">•</span>
                    <span className="text-slate-500">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-[#00ffaa] transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <FaArrowRight className="text-[#00ffaa] text-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 text-[#00ffaa] font-bold uppercase tracking-widest text-sm hover:underline"
          >
            Explore Full Archive <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
