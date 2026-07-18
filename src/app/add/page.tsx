"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";
import { FaGraduationCap, FaSpinner } from "react-icons/fa6";

export default function AddCoursePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    level: "Beginner",
    imageUrl: "",
    duration: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to add courses");
      router.push("/login");
    }
  }, [session, isPending, router]);

  
  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1d] text-[#00ffaa]">
        <FaSpinner className="animate-spin text-4xl mb-4" />
        <p className="font-bold tracking-widest uppercase text-sm">
          Initializing Secure Portal...
        </p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Deploying course...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!res.ok) throw new Error();
      toast.dismiss(loadingToast);
      toast.success("Course published successfully!");
      router.push("/allcourses");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to publish course!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white py-32 px-6">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <FaGraduationCap className="text-[#00ffaa]" /> Create New Course
          </h1>
          <p className="text-gray-400">
            Share your expertise with the LearnTech ecosystem.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1326]/50 backdrop-blur-xl p-10 rounded-[2rem] border border-white/5 shadow-2xl space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="title"
              placeholder="Course Title"
              required
              onChange={handleChange}
              className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa] transition-all"
            />
            <input
              name="category"
              placeholder="Category (e.g. Frontend)"
              required
              onChange={handleChange}
              className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa] transition-all"
            />
          </div>

          <textarea
            name="description"
            placeholder="Course Syllabus & Details"
            rows={5}
            required
            onChange={handleChange}
            className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa] transition-all"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              required
              onChange={handleChange}
              className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa]"
            />
            <input
              name="duration"
              placeholder="Duration (e.g. 10 weeks)"
              required
              onChange={handleChange}
              className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa]"
            />
            <select
              name="level"
              onChange={handleChange}
              className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa] text-gray-400"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <input
            name="imageUrl"
            placeholder="Course Thumbnail URL"
            onChange={handleChange}
            className="w-full bg-[#0a0f1d] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00ffaa]"
          />

          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#00ffaa] to-[#00aaff] text-[#0a0f1d] font-black py-5 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Publish Course
          </button>
        </form>
      </div>
    </div>
  );
}
