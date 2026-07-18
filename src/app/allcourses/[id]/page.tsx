"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaLayerGroup,
  FaCheckCircle,
  FaUserGraduate,
} from "react-icons/fa";
import { Atom } from "react-loading-indicators";

interface Course {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  level: string;
  imageUrl: string;
  duration: string;
}

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`,
        );
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Atom color="#00ffaa" size="large" />
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Course not found!
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="relative h-100 w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-[#00ffaa] font-black uppercase tracking-widest text-sm mb-4">
              {course.category}
            </div>
            <h1 className="text-5xl font-black mb-6">{course.title}</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {course.description}
            </p>
            <button className="bg-[#00ffaa] text-[#0a0f1d] px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all">
              Enroll Now - ${course.price}
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-[#111827] p-8 rounded-[2rem] border border-white/5">
              <h3 className="text-2xl font-bold mb-4">Course Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <FaClock />,
                    label: "Duration",
                    val: course.duration,
                  },
                  { icon: <FaLayerGroup />, label: "Level", val: course.level },
                  {
                    icon: <FaUserGraduate />,
                    label: "Certification",
                    val: "Included",
                  },
                  {
                    icon: <FaCheckCircle />,
                    label: "Lifetime Access",
                    val: "Yes",
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="bg-[#0a0f1d] p-4 rounded-xl flex items-center gap-3"
                  >
                    <div className="text-[#00ffaa]">{spec.icon}</div>
                    <div>
                      <p className="text-[10px] uppercase text-gray-500 font-bold">
                        {spec.label}
                      </p>
                      <p className="font-bold">{spec.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#111827] p-8 rounded-[2rem] border border-white/5 h-fit"
          >
            <h3 className="text-xl font-bold mb-6">Course Rating</h3>
            <div className="text-5xl font-black text-amber-400 mb-2">4.8</div>
            <div className="flex text-amber-400 gap-1 mb-6">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-gray-400 text-sm">Based on 1,200+ students</p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
