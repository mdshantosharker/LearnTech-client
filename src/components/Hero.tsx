"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full  flex items-center justify-center overflow-hidden bg-[#0a0f1d] pt-40 z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[#00ffaa]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center"
      >
        <motion.div
          variants={itemVariants}
          className="px-4 py-1.5 rounded-full border border-[#00ffaa]/20 bg-[#00ffaa]/5 text-[#00ffaa] text-xs font-semibold mb-6 flex items-center gap-2"
        >
          <FaGraduationCap /> LEARN TECHNOLOGY ANYWHERE
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
        >
          Master Skills for the <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ffaa] to-[#00aaff]">
            Future of Tech
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-base md:text-lg max-w-xl mb-8 px-2"
        >
          LearnTech provides high-quality interactive courses designed to bridge
          the gap between theory and industry demands.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/all-courses"
            className="group px-8 py-3.5 bg-[#00ffaa] text-[#0a0f1d] font-bold rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,170,0.2)] flex items-center gap-2 whitespace-nowrap"
          >
            Explore Courses
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <FaArrowRight size={14} />
            </motion.span>
          </Link>

          <Link
            href="/about"
            className="px-8 py-3.5 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-all border border-white/10 whitespace-nowrap"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
