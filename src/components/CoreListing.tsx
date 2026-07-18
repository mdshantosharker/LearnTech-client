"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock, FaLayerGroup, FaChevronRight } from "react-icons/fa6";

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

export default function CoreListing() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#0a0f1d] overflow-hidden">
      <div className="max-w-350 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Master the <span className="text-[#00ffaa]">Digital Frontier</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">High-impact courses designed to accelerate your engineering career.</p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-112.5 bg-[#111827] animate-pulse rounded-[2rem] border border-white/5" />
              ))
            : courses.slice(0, 8).map((course) => <CourseCard key={course._id} course={course} />)}
        </div>

      
        {!loading && (
          <div className="flex justify-center mt-16">
            <Link
              href="/courses"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#00ffaa]/10 border border-[#00ffaa]/20 text-[#00ffaa] font-bold text-sm hover:bg-[#00ffaa] hover:text-[#0a0f1d] transition-all duration-300"
            >
              <span>Explore All Courses</span>
              <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col h-112.5 w-full rounded-[2rem] bg-[#111827] border border-white/10 p-5 hover:border-[#00ffaa]/50 transition-all duration-300 group"
    >
      <div className="relative w-full h-40 rounded-[1.5rem] overflow-hidden mb-5 bg-[#0a0f1d]">
        <Image src={course.imageUrl} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#00ffaa] border border-[#00ffaa]/20">
          {course.level}
        </div>
      </div>

      <div className="flex flex-col grow justify-between">
        <div>
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-1">{course.title}</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">{course.description}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2"><FaLayerGroup className="text-[#00ffaa]" /> {course.category}</span>
            <span className="flex items-center gap-2"><FaClock className="text-[#00aaff]" /> {course.duration}</span>
          </div>
          <div className="w-full h-px bg-white/5" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-black text-white">$ {course.price}</span>
            <Link 
              href={`/allcourses/${course._id}`}
              className="flex items-center gap-2 text-[10px] font-black uppercase text-[#00ffaa] hover:gap-3 transition-all"
            >
              View Details <FaChevronRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}