"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEye, FaExclamationTriangle } from "react-icons/fa";
import { Atom } from "react-loading-indicators";
import Link from "next/link";
import toast from "react-hot-toast";

interface Developer {
  _id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export default function ManageDevelopersPage() {
  const [devs, setDevs] = useState<Developer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/developers`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch developers");
        }

        const data = await response.json();
        setDevs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/developers/${deleteModal.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setDevs((prev) => prev.filter((d) => d._id !== deleteModal.id));
        setDeleteModal({ isOpen: false, id: null });
        toast.success("Delete Successful");
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1322]">
        <Atom color="#00ffcc" size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1322] text-white p-4 md:p-8 lg:pt-32">
      <div className="flex mt-20 justify-center items-center">
        <h2 className=" my-10 text-3xl md:text-5xl font-black text-white mt-5 tracking-tight">
          Manage{" "}
          <span className=" bg-linear-to-r from-[#00ffcc] via-[#00e5ff] to-[#a855f7] bg-clip-text text-transparent">
            Developers or engineers
          </span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1a2333] border-b border-white/10">
              <tr>
                <th className="p-4">Developer</th>
                <th className="p-4">Price/hr</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devs.length > 0 ? (
                devs.map((dev) => (
                  <tr
                    key={dev._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700">
                        <img
                          src={dev.imageUrl}
                          alt={dev.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {dev.title}
                    </td>
                    <td className="p-4">${dev.price}</td>
                    <td className="p-4 text-[#00ffcc]">{dev.rating}</td>
                    <td className="p-4 flex gap-4 justify-center">
                      <Link
                        href={`/developers/${dev._id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FaEye size={18} />
                      </Link>
                      <button
                        onClick={() =>
                          setDeleteModal({ isOpen: true, id: dev._id })
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-500">
                    No developers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] p-8 rounded-2xl border border-white/20 max-w-sm w-full text-center">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">Delete Developer?</h3>
            <p className="text-slate-400 mb-8">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
