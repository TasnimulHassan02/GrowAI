import React from "react";

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-6 py-8 mt-3">

      <button
        className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
      >
        ← Prev
      </button>

      <button className="w-10 h-10 rounded-full bg-primary text-black font-semibold">
        1
      </button>
      <button className="w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
        2
      </button>
      <button className="w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
        3
      </button>
      <span className="px-2 text-gray-400">...</span>
      <button className="w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
        10
      </button>

      <button
        className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
