"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaNetworkWired,
  FaRocket,
  FaShieldHalved,
  FaArrowRight,
} from "react-icons/fa6";

export default function AboutLearnTech() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-32">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter"
        >
          Redefining <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ffaa] to-[#00aaff]">
            Technical Mastery.
          </span>
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-16 border-t border-white/10 pt-16">
          <p className="flex-1 text-2xl text-gray-400 font-medium leading-relaxed">
            LearnTech is not a classroom it is a high-velocity engineering
            simulation. We strip away the fluff of traditional courses,
            providing a direct pipeline to production-grade knowledge.
          </p>
          <div className="flex-1 space-y-4">
            <h4 className="text-[#00ffaa] font-black uppercase tracking-[0.2em] text-xs">
              Our North Star
            </h4>
            <p className="text-gray-300 text-lg italic">
              To close the gap between academic theory and real-world execution,
              enabling the next generation of 10x engineers.
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-x-20 gap-y-24 mb-32"
      >
        {[
          {
            icon: <FaGraduationCap />,
            title: "Precision Curriculum",
            desc: "Curated modules that mirror actual production requirements, removing 90% of irrelevant theory.",
          },
          {
            icon: <FaNetworkWired />,
            title: "Collaborative Intelligence",
            desc: "Learn by doing with PR-based code reviews and distributed team workflows, mirroring elite tech companies.",
          },
          {
            icon: <FaRocket />,
            title: "Accelerated Feedback",
            desc: "Our automated telemetry engine provides instant analysis on your code quality, complexity, and performance.",
          },
          {
            icon: <FaShieldHalved />,
            title: "Production Hardening",
            desc: "We teach security-first engineering. Master authentication, infrastructure-as-code, and resilient system design.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group relative"
          >
            <div className="text-[#00ffaa] text-4xl mb-8 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
            <div className="mt-8 h-0.5 w-12 bg-[#00ffaa]/30 group-hover:w-24 transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-5xl mx-auto bg-[#0d1326] rounded-[3rem] lg:p-16 border border-white/5 shadow-[0_0_100px_rgba(0,255,170,0.03)]">
        <h2 className="text-4xl font-black mb-16 text-center">
          Why we are different?
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[
              "Real-world architectural constraints.",
              "Mentorship from FAANG-tier engineers.",
              "AI-assisted code analysis tools.",
              "Live production-grade projects.",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 text-xl font-bold"
              >
                <div className="w-6 h-6 rounded-full bg-[#00ffaa]/10 flex items-center justify-center text-[#00ffaa] text-xs">
                  ✓
                </div>
                {text}
              </div>
            ))}
          </div>
          <div className="bg-[#0a0f1d] p-10 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#00ffaa] to-[#00aaff]" />
            <p className="text-xl leading-relaxed text-gray-400 mb-8">
              LearnTech was not just a course, it was a career pivot. I went
              from tutorial hell to leading my team iss migration to a
              microservices architecture in under 6 months.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5" />
              <div>
                <h5 className="font-bold text-white">Shanto</h5>
                <p className="text-[#00ffaa] text-xs uppercase font-black">
                  Senior Engineering Lead
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-32 text-center">
        <h3 className="text-5xl font-black mb-10">
          Ready to break the ceiling?
        </h3>
        <button className="group bg-white text-[#0a0f1d] px-12 py-6 rounded-2xl font-black text-lg hover:bg-[#00ffaa] transition-all flex items-center gap-3 mx-auto">
          Start Mastering{" "}
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}
