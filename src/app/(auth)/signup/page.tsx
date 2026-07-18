"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistrationForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    desc: "",
    isError: false,
  });

  const triggerToast = (title: string, desc: string, isError: boolean) => {
    setToastMessage({ title, desc, isError });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (isLoading) return;

    setIsLoading(true);

    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setIsLoading(false);
      triggerToast("Error", "Passwords do not match.", true);
      return;
    }

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      form.reset();
      triggerToast("Success", "Account created successfully.", false);
      router.push("/");
    } catch (err) {
      console.error(err);

      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";

      triggerToast("Error", errorMessage, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#0b111e] relative overflow-hidden border-t border-white/5 w-full flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-[#00ffcc]/10 to-[#00e5ff]/5 blur-[160px] pointer-events-none rounded-full" />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: -20, x: "-50%" }}
            className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0c1322] border backdrop-blur-xl shadow-xl ${
              toastMessage.isError
                ? "border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                : "border-[#00ffcc]/30 shadow-[0_0_40px_rgba(0,255,204,0.15)]"
            }`}
          >
            {toastMessage.isError ? (
              <FaExclamationCircle className="text-red-500 text-lg shrink-0" />
            ) : (
              <FaCheckCircle className="text-[#00ffcc] text-lg shrink-0" />
            )}
            <div className="flex flex-col">
              <p
                className={`text-xs font-black uppercase tracking-wider ${toastMessage.isError ? "text-red-400" : "text-white"}`}
              >
                {toastMessage.title}
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {toastMessage.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-3xl bg-linear-to-b from-[#0c1322] via-[#0c1322]/90 to-[#082955]/10 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,204,0.02)] relative z-10 mx-6"
      >
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#00ffcc] tracking-widest uppercase bg-[#02432c]/40 border border-[#00ffcc]/20 px-4 py-1.5 rounded-full">
            Dev Intel Network
          </span>
          <h2 className="text-3xl font-black text-white mt-5 mb-2">
            Join as{" "}
            <span className="bg-linear-to-r from-[#00ffcc] to-[#00e5ff] bg-clip-text text-transparent">
              Developer
            </span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Create your account to track engineering metrics and fast-track
            pipelines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-1">
              Full Name
            </label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
              <input
                required
                type="text"
                name="name"
                disabled={isLoading}
                placeholder="John Doe"
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none focus:border-[#00ffcc] focus:shadow-[0_0_15px_rgba(0,255,204,0.05)] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
              <input
                required
                type="email"
                name="email"
                disabled={isLoading}
                placeholder="john@example.com"
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none focus:border-[#00ffcc] focus:shadow-[0_0_15px_rgba(0,255,204,0.05)] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-1">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
              <input
                required
                type={isVisible ? "text" : "password"}
                name="password"
                disabled={isLoading}
                placeholder="••••••••"
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white text-sm outline-none focus:border-[#00ffcc] focus:shadow-[0_0_15px_rgba(0,255,204,0.05)] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-4 text-slate-400 hover:text-[#00ffcc] transition-colors focus:outline-none"
              >
                {isVisible ? (
                  <FaEyeSlash className="text-base" />
                ) : (
                  <FaEye className="text-base" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-1">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
              <input
                required
                type={isConfirmVisible ? "text" : "password"}
                name="confirmPassword"
                disabled={isLoading}
                placeholder="••••••••"
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white text-sm outline-none focus:border-[#00ffcc] focus:shadow-[0_0_15px_rgba(0,255,204,0.05)] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                className="absolute right-4 text-slate-400 hover:text-[#00ffcc] transition-colors focus:outline-none"
              >
                {isConfirmVisible ? (
                  <FaEyeSlash className="text-base" />
                ) : (
                  <FaEye className="text-base" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3.5 rounded-xl bg-linear-to-r from-[#00ffcc] to-[#00aaff] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? "Processing..." : "Claim Developer Space"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6 font-medium">
          Already verified?{" "}
          <Link
            href="/login"
            className="text-[#00e5ff] hover:text-[#00ffcc] font-bold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
