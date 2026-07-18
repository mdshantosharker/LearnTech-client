"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
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
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google sign-in failed.";
      triggerToast("Error", message, true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      triggerToast("Success", "Logged in successfully.", false);
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials.";
      triggerToast("Error", message, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 pt-40 bg-[#0b111e] relative w-full flex items-center justify-center">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-10 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0c1322] border backdrop-blur-xl ${
              toastMessage.isError ? "border-red-500/30" : "border-[#00ffcc]/30"
            }`}
          >
            {toastMessage.isError ? (
              <FaExclamationCircle className="text-red-500" />
            ) : (
              <FaCheckCircle className="text-[#00ffcc]" />
            )}
            <div>
              <p className="text-xs font-black uppercase text-white">
                {toastMessage.title}
              </p>
              <p className="text-slate-400 text-[11px]">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl bg-[#0c1322] border border-white/10 shadow-2xl mx-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-2">
            Sign in to continue your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3.5 text-slate-500 text-xs" />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 py-3 text-white text-sm outline-none focus:border-[#00ffcc]"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-3.5 text-slate-500 text-xs" />
            <input
              name="password"
              type={isVisible ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm outline-none focus:border-[#00ffcc]"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-4 top-3.5 text-slate-400"
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#00ffcc] text-[#0c1322] font-black uppercase text-xs hover:opacity-90 transition-all"
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[10px] text-slate-500 uppercase font-bold">
            OR
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold text-sm transition-all"
        >
          <FaGoogle className="text-[#00ffcc]" />
          Sign in with Google
        </button>

        <p className="text-center text-slate-400 text-xs mt-6">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="text-[#00ffcc] font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
