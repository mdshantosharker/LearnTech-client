"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEye, FaExclamationTriangle, FaPlus } from "react-icons/fa";
import { Atom } from "react-loading-indicators";
import Link from "next/link";
import toast from "react-hot-toast";

interface Item {
  _id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ManageItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/courses`,
          {
            cache: "no-store",
          },
        );
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async () => {
    try {
      // Fetch JWT token from local Next.js API
      const jwtRes = await fetch("/api/jwt");
      if (!jwtRes.ok) throw new Error("Auth token retrieval failed");
      const { token } = await jwtRes.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${deleteModal.id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== deleteModal.id));
        setDeleteModal({ isOpen: false, id: null });
        toast.success("Item deleted successfully!");
      } else {
        toast.error("Delete failed!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred during deletion.");
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
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 mt-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Manage{" "}
            <span className="bg-linear-to-r from-[#00ffcc] to-[#a855f7] bg-clip-text text-transparent">
              Items
            </span>
          </h2>
          <Link
            href="/add"
            className="mt-4 md:mt-0 flex items-center gap-2 bg-[#00ffcc] text-[#0c1322] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            <FaPlus /> Add New Item
          </Link>
        </div>

        <div className="bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1a2333] border-b border-white/10">
                <tr>
                  <th className="p-4">No</th>
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 text-slate-400">{index + 1}</td>
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-700"
                        />
                        <span className="font-semibold">{item.title}</span>
                      </td>
                      <td className="p-4 text-slate-400">{item.category}</td>
                      <td className="p-4">${item.price}</td>
                      <td className="p-4">
                        <div className="flex justify-center items-center gap-4">
                          <Link
                            href={`/allcourses/${item._id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <FaEye size={18} />
                          </Link>
                          <button
                            onClick={() =>
                              setDeleteModal({ isOpen: true, id: item._id })
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      No items available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] p-8 rounded-2xl border border-white/20 max-w-sm w-full text-center">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">Delete Item?</h3>
            <p className="text-slate-400 mb-8">
              This will permanently remove the item.
            </p>
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
