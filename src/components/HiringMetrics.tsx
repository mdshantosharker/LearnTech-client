"use client";

import { motion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaNetworkWired,
  FaShield,
  FaCloud,
  FaBolt,
} from "react-icons/fa6";

export default function DeepTechKnowledge() {
  const content = [
    {
      icon: <FaCode />,
      title: "System Architecture",
      desc: "Build scalable, high-concurrency systems using microservices patterns and event-driven design.",
    },
    {
      icon: <FaDatabase />,
      title: "Data Engineering",
      desc: "Optimizing SQL/NoSQL performance and managing high-velocity real-time data streams.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Distributed Networks",
      desc: "Mastering Git-flow, PR reviews, and technical documentation within distributed team environments.",
    },
    {
      icon: <FaShield />,
      title: "Security Protocols",
      desc: "Cybersecurity hardening, OAuth flows, and production-grade authentication logic.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Infrastructure",
      desc: "Deploying production-grade applications using Kubernetes, Docker, and CI/CD pipelines.",
    },
    {
      icon: <FaBolt />,
      title: "Performance Tuning",
      desc: "Memory management, latency reduction, and database optimization techniques.",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1d] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Core <span className="text-[#00ffaa]">Capability</span>
          </motion.h2>
          <div className="h-1 w-24 bg-[#00ffaa] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {content.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-6 group"
            >
              <div className="mt-1 shrink-0 w-16 h-16 flex items-center justify-center bg-[#00ffaa]/5 text-[#00ffaa] text-2xl rounded-2xl group-hover:bg-[#00ffaa] group-hover:text-[#0a0f1d] transition-all duration-500">
                {item.icon}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00ffaa] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.desc}
                </p>

                <div className="mt-4 h-px w-0 bg-[#00ffaa] group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
