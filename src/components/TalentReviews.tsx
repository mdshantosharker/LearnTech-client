"use client";

import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

const studentVoices = [
  {
    name: "Samiul Haque",
    role: "Frontend Mastery Grad",
    text: "LearnTech provided the exact roadmap I needed. The project-based learning is light-years ahead of standard video tutorials.",
    rating: 5,
    tag: "Student",
  },
  {
    name: "Fatima Zahra",
    role: "Cloud Architecture Lead",
    text: "The mentoring sessions helped me debug my complex deployments in minutes. Absolutely worth the investment.",
    rating: 5,
    tag: "Student",
  },
  {
    name: "Rahul Dev",
    role: "AI Engineer",
    text: "From 'Hello World' to building custom neural networks—LearnTech made the journey feel seamless and professional.",
    rating: 5,
    tag: "Student",
  },
];

const mentorVoices = [
  {
    name: "Dr. Ayesha Khan",
    role: "Senior Architect @ Google",
    text: "Seeing students translate theory into production-grade code is rewarding. This is the future of tech education.",
    rating: 5,
    tag: "Mentor",
  },
  {
    name: "Robert Miller",
    role: "Cloud DevOps Expert",
    text: "The curriculum here challenges students with real-world architectural bottlenecks that most universities ignore.",
    rating: 5,
    tag: "Mentor",
  },
  {
    name: "Jessica Chen",
    role: "Full-Stack Lead @ Stripe",
    text: "LearnTech produces engineers who are ready to push code to production on day one. Impressive standards.",
    rating: 5,
    tag: "Mentor",
  },
];

export default function CommunityVoice() {
  const allVoices = [...studentVoices, ...mentorVoices, ...studentVoices];

  return (
    <section className="py-24 bg-[#0a0f1d] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Voices of <span className="text-[#00ffaa]">Excellence</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Join thousands of learners and industry experts who are redefining
          technical mastery.
        </p>
      </div>

      <div className="relative flex flex-col gap-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex gap-8"
        >
          {allVoices.map((voice, idx) => (
            <div
              key={idx}
              className="w-87.5 shrink-0 p-8 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-xl hover:bg-[#00ffaa]/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <FaQuoteLeft className="text-[#00ffaa]/20 text-3xl" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#00ffaa] text-xs" />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                {voice.text}
              </p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-12 h-12 rounded-full bg-[#0a0f1d] border border-[#00ffaa]/20 flex items-center justify-center text-[#00ffaa]">
                  {voice.tag === "Student" ? (
                    <FaUserGraduate />
                  ) : (
                    <FaChalkboardTeacher />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{voice.name}</h4>
                  <p className="text-[#00ffaa] text-[10px] uppercase font-bold tracking-widest">
                    {voice.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
