"use client";

import { motion } from "framer-motion";

export default function PlatformMetrics() {
  const metrics = [
    { value: "50K+", label: "Active Learners" },
    { value: "120+", label: "Industry Courses" },
    { value: "95%", label: "Completion Rate" },
    { value: "4.9/5", label: "Student Ratings" },
    { value: "800+", label: "Expert Mentors" },
    { value: "15K+", label: "Jobs Landed" },
  ];

  return (
    <section className="relative py-24 bg-[#0a0f1d] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#00ffaa] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#00aaff] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#00ffaa] uppercase">
              Platform Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Building the Future <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ffaa] to-[#00aaff]">
                of Digital Education
              </span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              LearnTech is not just a course provider; it is an ecosystem
              designed to bridge the gap between academic theory and high-stakes
              industry requirements. Every metric represents a success story.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#00ffaa] text-[#0a0f1d] font-bold rounded-full text-sm"
            >
              Explore Success Stories
            </motion.button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {metrics.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-[#00ffaa]/30 transition-colors group"
                >
                  <h3 className="text-3xl font-black text-white mb-2 group-hover:text-[#00ffaa] transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
