"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Path",
      desc: "Select from 100+ curated tech specializations. From Cloud Architecture to Neural Networks.",
    },
    {
      num: "02",
      title: "Interactive Mastery",
      desc: "Engage with hands-on labs, live mentoring, and real-world projects that challenge your logic.",
    },
    {
      num: "03",
      title: "Certify & Scale",
      desc: "Earn industry-recognized credentials and unlock direct placement opportunities with global tech giants.",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1d] relative overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#00ffaa]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Your Roadmap to <br />
            <span className="text-[#00ffaa] italic">Mastery</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A seamless transition from absolute beginner to industry-ready
            expert through our guided pedagogical framework.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-16 left-10 md:left-1/2 md:-translate-x-1/2 w-0.5 h-[60%] bg-linear-to-b from-[#00ffaa] to-transparent md:w-[70%] md:h-0.5 md:bg-linear-to-r" />

          <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
                className="relative flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-20 h-20 rounded-2xl bg-[#0d1326] border border-[#00ffaa]/20 flex items-center justify-center text-3xl font-black text-[#00ffaa] shadow-[0_0_20px_rgba(0,255,170,0.1)] mb-8 z-10 relative"
                >
                  <div className="absolute inset-0 bg-[#00ffaa]/10 animate-ping rounded-2xl" />
                  {step.num}
                </motion.div>

                <div className="max-w-70">
                  <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-[#00ffaa]">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
