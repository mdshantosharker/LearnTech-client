"use client";

import { motion } from "framer-motion";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 45 },
  { month: "Mar", progress: 35 },
  { month: "Apr", progress: 70 },
  { month: "May", progress: 55 },
  { month: "Jun", progress: 95 },
];

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
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-24 pb-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto mb-20 bg-[#0d1326] p-6 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black">Engineering Velocity</h3>
            <p className="text-gray-400 text-sm">
              Real-time mastery growth metric
            </p>
          </div>
          <div className="bg-[#00ffaa]/10 text-[#00ffaa] px-4 py-2 rounded-full text-xs font-bold mt-4 md:mt-0">
            +95% IMPROVEMENT
          </div>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ffaa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00ffaa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0f1d",
                  border: "1px solid #333",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#00ffaa"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorProgress)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

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
      ></motion.div>
    </div>
  );
}
