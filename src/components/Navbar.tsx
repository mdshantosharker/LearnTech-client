"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { FaGraduationCap, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notification, setNotification] = useState("");

  const navLinks = user
    ? [
        { name: "Home", href: "/" },
        { name: "All Courses", href: "/allcourses" },
        { name: "Add Course", href: "/add" },
        { name: "Manage Courses", href: "/manage-courses" },
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "All Courses", href: "/allcourses" },
        { name: "About Us", href: "/about" },
      ];

  const confirmLogout = async () => {
    await authClient.signOut();
    setShowLogoutModal(false);
    setNotification("Successfully logged out!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <>
    
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-5 z-50 bg-[#00ffaa] text-black px-6 py-3 rounded-xl font-bold text-sm shadow-xl"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

    
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#0c1322] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Confirm Logout</h3>
              <p className="text-slate-400 mb-8 text-sm">Are you sure you want to log out of your account?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-white/10">Cancel</button>
                <button onClick={confirmLogout} className="flex-1 py-3 rounded-xl bg-[#00ffaa] text-black font-bold text-sm hover:opacity-90">Yes, Logout</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full z-40 px-4 mt-5">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-[#0a0f1d]/90 border border-white/20 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2">
            <div className="bg-[#00ffaa]/20 p-2 rounded-full text-[#00ffaa]">
              <FaGraduationCap size={20} />
            </div>
            <span className="text-white text-lg font-bold tracking-tight">LearnTech</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span whileHover={{ color: "#00ffaa" }} className={`text-sm font-semibold transition-colors ${pathname === link.href ? "text-[#00ffaa]" : "text-white"}`}>
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login" className="text-white hover:text-[#00ffaa] text-sm font-medium transition-colors">Log In</Link>
                <Link href="/signup" className="px-5 py-2 bg-[#00ffaa] text-black text-sm font-bold rounded-full hover:bg-white transition-all">Sign Up</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-white text-xs bg-white/10 px-3 py-1 rounded-full border border-white/10">{user?.name}</span>
                <button onClick={() => setShowLogoutModal(true)} className="text-rose-400 hover:text-rose-300 transition-colors">
                  <FaSignOutAlt size={18} />
                </button>
              </div>
            )}
          </div>

          <button className="lg:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu (আপনার আগের কোড অনুযায়ী) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden fixed inset-0 z-30 pt-24 px-6 bg-[#0a0f1d]/95 backdrop-blur-lg flex flex-col items-center">
            <div className="flex flex-col gap-6 w-full max-w-xs text-center">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-white text-xl font-medium border-b border-white/10 pb-4">
                  {link.name}
                </Link>
              ))}
              {!user ? (
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-white text-xl font-bold">Log In</Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="px-5 py-3 bg-[#00ffaa] text-black font-bold rounded-full">Sign Up</Link>
                </div>
              ) : (
                <button onClick={() => { setShowLogoutModal(true); setIsOpen(false); }} className="text-rose-400 text-xl font-bold flex items-center justify-center gap-2 mt-4">
                  <FaSignOutAlt /> Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}