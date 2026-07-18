"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

export default function LearningFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the LearnTech certification process work?",
      a: "Our certification is based on project-based assessments. You must complete a capstone project that is peer-reviewed and verified by industry mentors to earn your badge.",
    },
    {
      q: "Can I access course materials after completion?",
      a: "Yes! Lifetime access is included with all our premium learning paths, including all future updates to course content and source code.",
    },
    {
      q: "Do you offer placement assistance?",
      a: "Absolutely. We have a dedicated 'Career Connect' portal where top-tier students get direct interview access to our partner tech companies.",
    },
    {
      q: "What if I get stuck while coding?",
      a: "You'll have access to our 24/7 AI-powered 'Study Buddy' and a vibrant Discord community of over 50k+ fellow learners and mentors.",
    },
    {
      q: "Are the courses suitable for absolute beginners?",
      a: "Yes, we provide foundational 'Bridge Courses' designed to take you from 'Hello World' to complex architectural design patterns.",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1d] w-full">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">
            Got <span className="text-[#00ffaa]">Questions?</span>
          </h2>
          <p className="text-gray-400">
            Everything you need to know about your learning journey.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={false}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white/5 border-[#00ffaa]/30"
                    : "bg-white/2 border-white/5"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span
                    className={`font-bold transition-colors ${isOpen ? "text-[#00ffaa]" : "text-white"}`}
                  >
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FaChevronDown
                      className={isOpen ? "text-[#00ffaa]" : "text-gray-500"}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
