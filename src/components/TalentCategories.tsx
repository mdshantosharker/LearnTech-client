"use client";

import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaDatabase,
  FaMicrochip,
  FaUserGraduate,
} from "react-icons/fa6";

export default function LearningCategories() {
  const categories = [
    {
      name: "Software Engineering",
      count: "45+ Professional Courses",
      skills: ["System Design", "Algorithms", "Clean Code", "Architecture"],
      icon: <FaLaptopCode className="w-6 h-6 text-[#00ffaa]" />,
      gradient: "from-[#00ffaa] via-[#02432c] to-[#00aaff]",
      shadowGlow: "group-hover:shadow-[0_0_50px_rgba(0,255,170,0.3)]",
    },
    {
      name: "Data Science & ML",
      count: "32+ Professional Courses",
      skills: ["Big Data", "Neural Nets", "Pandas", "Statistics"],
      icon: <FaDatabase className="w-6 h-6 text-[#00e5ff]" />,
      gradient: "from-[#00e5ff] via-[#082955] to-[#00ffaa]",
      shadowGlow: "group-hover:shadow-[0_0_50px_rgba(0,229,255,0.3)]",
    },
    {
      name: "Embedded Systems",
      count: "28+ Professional Courses",
      skills: ["IoT", "Firmware", "C++", "Robotics"],
      icon: <FaMicrochip className="w-6 h-6 text-[#a855f7]" />,
      gradient: "from-[#a855f7] via-[#033c3a] to-[#ff007f]",
      shadowGlow: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]",
    },
    {
      name: "Career Mentorship",
      count: "15+ Expert Programs",
      skills: [
        "Interview Prep",
        "Resume Building",
        "Soft Skills",
        "Networking",
      ],
      icon: <FaUserGraduate className="w-6 h-6 text-[#ea580c]" />,
      gradient: "from-[#ea580c] via-[#082955] to-[#facc15]",
      shadowGlow: "group-hover:shadow-[0_0_50px_rgba(234,88,12,0.3)]",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#0a0f1d] overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#00ffaa]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#00ffaa] bg-[#00ffaa]/10 border border-[#00ffaa]/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Learning Paths
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-5 tracking-tight">
            Level Up Your <span className="text-[#00ffaa]">Career</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-px rounded-3xl overflow-hidden bg-white/5 transition-all duration-500 ${cat.shadowGlow}`}
            >
              <div
                className={`absolute -inset-full bg-linear-to-r ${cat.gradient} animate-spin-slow opacity-20 group-hover:opacity-100 blur-[2px] transition-all duration-700`}
              />

              <div className="relative h-full w-full p-6 rounded-[23px] bg-[#0d1326] flex flex-col justify-between z-10">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00ffaa]/30 transition-all">
                    {cat.icon}
                  </div>

                  <h3 className="text-white text-lg font-bold mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[#00ffaa] text-[11px] font-bold uppercase tracking-wider mb-4">
                    {cat.count}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] text-gray-400 px-2 py-1 rounded-md bg-white/5 border border-white/10 font-medium group-hover:text-white group-hover:border-[#00ffaa]/20 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
