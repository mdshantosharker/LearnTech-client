"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDollarSign,
  FaClock,
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
  rating: number;
  location: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceLimit, setPriceLimit] = useState(1000);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/courses`,
        );
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };
  const handleCategory = (val: string) => {
    setCategory(val);
    setCurrentPage(1);
  };
  const handlePrice = (val: string) => {
    setPriceLimit(Number(val));
    setCurrentPage(1);
  };
  const handleSort = (val: string) => {
    setSortOrder(val);
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => {
    return [...courses]
      .filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (category === "All" || c.category === category) &&
          c.price <= priceLimit,
      )
      .sort((a, b) =>
        sortOrder === "desc" ? b.price - a.price : a.price - b.price,
      );
  }, [searchTerm, category, priceLimit, sortOrder, courses]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Atom color="#00ffaa" size="large" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Discover <span className="text-[#00ffaa]">Courses</span>
        </h2>

       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#111827] p-6 rounded-[2rem] border border-white/5 mb-10">
          <input
            placeholder="Search..."
            className="bg-[#0a0f1d] p-3 rounded-xl border border-white/10"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            className="bg-[#0a0f1d] p-3 rounded-xl border border-white/10"
            onChange={(e) => handleCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Frontend Development">Frontend</option>
            <option value="Backend Development">Backend</option>
            <option value="Design">Design</option>
          </select>
          <input
            type="number"
            placeholder="Max Price"
            className="bg-[#0a0f1d] p-3 rounded-xl border border-white/10"
            onChange={(e) => handlePrice(e.target.value || "1000")}
          />
          <select
            className="bg-[#0a0f1d] p-3 rounded-xl border border-white/10"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="desc">Price: High to Low</option>
            <option value="asc">Price: Low to High</option>
          </select>
        </div>

     
<div className="grid md:grid-cols-3 gap-8">
  <AnimatePresence mode="popLayout">
    {paginatedCourses.map((c) => (
      <motion.div
        key={c._id}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#111827] p-5 rounded-[2rem] border border-white/5"
      >
    
        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
          <Image
            src={c.imageUrl}
            alt={c.title}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="text-xl font-bold">{c.title}</h3>
        <p className="text-[#00ffaa] text-xs font-bold uppercase">
          {c.category}
        </p>
        <div className="flex justify-between mt-4">
          <span className="flex items-center">
            <FaDollarSign /> {c.price}
          </span>
          <span className="flex items-center">
            <FaClock /> {c.duration}
          </span>
        </div>
        <Link
          href={`/allcourses/${c._id}`}
          className="block mt-4 text-center py-3 bg-[#00ffaa]/10 text-[#00ffaa] font-bold rounded-xl"
        >
          View Details
        </Link>
      </motion.div>
    ))}
  </AnimatePresence>
</div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-3 bg-[#111827] rounded-full"
          >
            <FaChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-3 bg-[#111827] rounded-full"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
