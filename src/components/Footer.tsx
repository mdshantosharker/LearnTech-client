"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="relative w-full pt-20 pb-10 px-6 bg-linear-to-b from-[#0a0f1d] via-[#022922] to-[#011815]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#00ffaa] p-2 rounded-xl text-black shadow-[0_0_20px_#00ffaa]">
                <FaGraduationCap size={28} />
              </div>
              <span className="text-white text-2xl font-black">LearnTech</span>
            </div>
            <p className="text-teal-200/70 text-sm">
              Master the future of technology with industry-leading courses.
            </p>
          </div>

          <div>
            <h4 className="text-[#00ffaa] font-bold mb-6 uppercase tracking-widest text-sm">
              Platform
            </h4>
            <ul className="space-y-4">
              {["Courses", "Mentorship", "Pricing"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-teal-100/60 hover:text-[#00ffaa] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#00ffaa] font-bold mb-6 uppercase tracking-widest text-sm">
              Company
            </h4>
            <ul className="space-y-4">
              {["About Us", "Careers", "Support"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-teal-100/60 hover:text-[#00ffaa] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#00ffaa] font-bold mb-6 uppercase tracking-widest text-sm">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                FaXTwitter,
                FaInstagram,
                FaLinkedinIn,
                FaGithub,
                FaDiscord,
                HiOutlineMail,
              ].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/30 text-[#00ffaa] hover:bg-[#00ffaa] hover:text-black flex items-center justify-center transition-all"
                >
                  <Icon size={18} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
