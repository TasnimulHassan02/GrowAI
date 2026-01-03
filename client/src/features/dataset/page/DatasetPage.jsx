import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Download,
  Star,
  CircleDollarSign,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axios from "axios";

const ITEMS_PER_PAGE = 5;

export default function DatasetPage() {
  const [datasets, setDatasets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const role = localStorage.getItem("role") || "";

  const [filters, setFilters] = useState({
    q: "",
    category: "",
    price: "",
    sort: "",
  });

  const fetchDatasets = async () => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const res = await axios.get(
        `http://localhost:3000/api/datasets/search?${params.toString()}`
      );

      setDatasets(res.data);
      setCurrentPage(1); // reset page on filter change
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, [filters]);

  /* ---------- Pagination Logic ---------- */
  const totalPages = Math.ceil(datasets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDatasets = datasets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const categories = ["All datasets", ...new Set(datasets.map(ds => ds.category))];

  return (
    <>
      <Navbar />

      <div className="min-h-screen max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-3">Datasets</h1>
            <p className="text-gray-600 max-w-2xl">
              Discover high-quality datasets for research, education, and machine learning.
            </p>
          </div>

          {role.includes("seller") && (
            <a
              href="/seller/upload"
              className="px-6 py-3 flex items-center bg-primary font-semibold rounded-xl hover:bg-green-500"
            >
              + Add Dataset
            </a>
          )}
        </div>

        {/* Search */}
        <div className="mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search datasets..."
            value={filters.q}
            onChange={e => setFilters({ ...filters, q: e.target.value })}
            className="w-full pl-12 pr-6 py-4 rounded-full border focus:ring-4 focus:ring-green-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 bg-gray-50 p-4 rounded-full border-2 border-primary">
          <select
            className="select rounded-full"
            value={filters.category}
            onChange={e => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            <option value="Educational">Educational</option>
          </select>

          <select
            className="select rounded-full"
            onChange={e => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Any Price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <select
            className="select rounded-full"
            onChange={e => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="">Sort By</option>
            <option value="popular">Popularity</option>
            <option value="downloads">Downloads</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(c => (
            <button
              key={c}
              onClick={() =>
                setFilters({ ...filters, category: c === "All datasets" ? "" : c })
              }
              className={`px-6 py-2 rounded-full ${
                filters.category === c || (c === "All datasets" && !filters.category)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dataset Grid */}
        {currentDatasets.length > 0 ? (
          <DatasetGrid datasets={currentDatasets} />
        ) : (
          <div className="text-center py-20 text-gray-500">
            No datasets found.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 border-2 border-primary rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-green-500 text-white"
                    : "border-2 border-primary" 
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 border-2 border-primary rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

/* ---------------- Components ---------------- */

function DatasetGrid({ datasets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {datasets.map(ds => (
        <div
          key={ds.id}
          className="bg-white border-3 border-primary rounded-2xl p-8 shadow-md hover:shadow-xl transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package size={28} />
            <span className="px-3 py-1 rounded-full bg-primary/30">
              {ds.category}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">{ds.title}</h3>
          <p className="text-gray-600 mb-4">
            {ds.description?.slice(0, 60)}...
          </p>

          <div className="flex justify-between text-sm font-semibold mb-4">
            <span className="flex items-center gap-1 text-yellow-500">
              <Star size={14} /> {ds.popularity_score}
            </span>
            <span className="flex items-center gap-1 text-green-500">
              <Download size={14} /> {ds.downloads}
            </span>
            <span className="flex items-center gap-1 text-blue-500">
              <CircleDollarSign size={14} /> {ds.price}$
            </span>
          </div>

          <a href={`/datasets/${ds.id}`}>
            <button className="w-full bg-green-500 text-white rounded-full py-2">
              See Details
            </button>
          </a>
        </div>
      ))}
    </div>
  );
}
