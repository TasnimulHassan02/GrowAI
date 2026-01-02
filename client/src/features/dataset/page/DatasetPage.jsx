import { useEffect, useState } from "react";
// import { fetchDatasets } from "../api/DatasetApi";
import {
  Search,
  Filter,
  Package,
  Download,
  Star,
  CircleDollarSign,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer"
import axios from "axios";
import Pagination from "../../../components/pagination";
export default function DatasetPage() {
  const [datasets, setDatasets] = useState([]);
  const role = localStorage.getItem("role") || "";
  
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    price: "",
    license: "",
    sort: "",
    time: "",
  });

  const fetchDatasets = async () => {
    try {
      const params = new URLSearchParams();
      // Only add params that have values
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const res = await axios.get(`http://localhost:3000/api/datasets/search?${params.toString()}`);
      setDatasets(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, [filters]); // This triggers whenever ANY filter changes

  // Dynamic categories from existing data
  const categories = ["All datasets", ...new Set(datasets.map(ds => ds.category))];

  return (
    <div>
      <Navbar />
      
      <div className="min-h-screen max-w-7xl mx-auto px-6 py-12">
         {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Datasets
            </h1>
            <p className="text-gray-600 max-w-2xl mb-8">
              Discover high-quality datasets for research, education, and machine learning.
              Analyze trends, preview samples, and choose the right data with confidence.
            </p>
          </div>
        {role.includes("seller") && (
          <div>
              <button className="px-6 mt-2 py-3 bg-primary cursor-pointer text-black font-semibold rounded-xl shadow hover:bg-green-500 transition">
                <a href="/seller/upload">+ Add Dataset</a>
              </button>
          </div>
        )}
        </div>
        

        {/* MAIN SEARCH BAR (Connected to State) */}
        <div className=" mb-10 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for any kind of datasets..."
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:ring-4 focus:ring-green-200 outline-none transition"
            />
          </div>
        </div>

        {/* TOP SELECTORS (For quick filtering) */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 w-6/7 ml-24 bg-gray-50 p-3 rounded-full border-2 border-primary">
          <select 
            className="select rounded-full select-bordered"
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            value={filters.category}
          >
            <option value="">All Categories</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            <option value="Educational">Educational</option>
          </select>

          <select className="select rounded-full select-bordered" onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
            <option value="">Any Price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <select className="select rounded-full select-bordered" onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
            <option value="">Sort By</option>
            <option value="popular">Popularity</option>
            <option value="downloads">Downloads</option>
          </select>
        </div>

        {/* CATEGORY PILLS (Connected to State) */}
        <div className="mt-6 mb-10 flex justify-center flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c === "All datasets" ? "" : c })}
              className={`px-6 py-2 rounded-full font-medium transition ${
                (filters.category === c || (c === "All datasets" && filters.category === ""))
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* DATASET RESULTS */}
        <SectionHeader title={filters.category || "All Datasets"} />
        {datasets.length > 0 ? (
          <DatasetGrid datasets={datasets} />
        ) : (
          <div className="text-center py-20 text-gray-500">No datasets found matching your criteria.</div>
        )}
      </div>
      <Pagination />
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

/* ---------------- Components ---------------- */

function SectionHeader({ title }) {
  return (
    
    <div className="flex items-center mt-20 justify-left gap-3 mb-6">
    <div className="p-2 bg-blue-600 rounded-2xl">
                    <Package className="w-8 h-8 text-white" />
                </div>
      <h2 className="text-xl border-gray-300 px-6 border-3 rounded-full font-bold py-2 bg-gray-50 tracking-tight">{title}</h2>

    </div>
  );
}

function DatasetGrid({ datasets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {datasets.map(ds => (
        <div
          key={ds.id}
          className="dataset-card group bg-white border-3 border-primary shadow-md rounded-2xl p-8 pb-4 transition
                     hover:shadow-xl hover:-translate-y-1 duration-300 overflow-hidden"
        >    
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 text-gray-600 p-2 rounded-lg">
                <Package size={30} />
              </div>
              <span className=" font-semibold bg-gray-100 px-3 bg-primary/40 py-1 rounded-full">
                {ds.category}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl leading-snug mb-2 group-hover:text-green-600">
            {ds.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-5">
            {ds.description?.slice(0, 40)}...
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-xl font-semibold text-gray-600">
            <div className="flex items-center text-yellow-500 gap-1">
              <Star size={14} />
              <span>{ds.popularity_score}</span>
            </div>
            <div className="flex items-center text-green-500 gap-1">
              <Download size={14} />
              <span>{ds.downloads}</span>
            </div>
            <div className="flex items-center text-blue-500 gap-1">
              <CircleDollarSign size={14} />
              <span>{ds.price}$</span>
            </div>
          </div>
            <div className="mt-4 pt-4 border-t-2 border-base-300 opacity-5 group-hover:opacity-100 transition-opacity">
                <a href={`/datasets/${ds.id}`}><button className="btn bg-green-500 rounded-3xl text-white  text-sm btn-sm w-full">
                See Details

                </button></a>
            </div>
        </div>
      ))}
    </div>
  );
}
