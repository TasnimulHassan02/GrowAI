import { useEffect, useState } from "react";
import { fetchDatasets } from "../api/DatasetApi";
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

export default function DatasetPage() {
  const [datasets, setDatasets] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchDatasets({ category }).then(setDatasets);
  }, [category]);

 const categories = ["All datasets", ...Array.from(new Set(datasets.map(ds => ds.category)))];

  return (
    <div>
    <Navbar />

    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 mb-16 mt-3">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Datasets
        </h1>
        <p className="text-gray-600 max-w-2xl mb-8">
          Discover high-quality datasets for research, education, and machine learning.
          Analyze trends, preview samples, and choose the right data with confidence.
        </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for any kind of datasets..."
                className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition"
              />
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-300 rounded-full hover:shadow-md transition">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

        {/* Category Pills */}
          <div className="mt-6 mb-10 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c === "All datasets" ? "" : c)}
                className={`px-6 py-3 rounded-full font-medium transition ${
                category === c || (c === "All datasets" && category === "")
                    ? "bg-primary text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        {/* Trending */}
        <SectionHeader title="Trending datasets" />
        <DatasetGrid datasets={datasets.slice(0, 6)} />

        {/* Individual Categories */}
          {categories
            .filter(c => c !== "All datasets") // skip "All datasets" for sections
            .map(c => (
              <div className="mt-16" key={c}>
                <SectionHeader title={c} />
                <DatasetGrid datasets={datasets.filter(d => d.category === c)} />
              </div>
            ))}

      </div>
    </div>
    <Footer />
   </div>
  );
}

/* ---------------- Components ---------------- */

function SectionHeader({ title }) {
  return (
    
    <div className="flex items-center justify-left gap-3 mb-6">
    <div className="p-2 bg-blue-600 rounded-2xl">
                    <Package className="w-8 h-8 text-white" />
                </div>
      <h2 className="text-xl border-gray-300 px-6 border-3 rounded-full font-bold py-2 bg-gray-50 tracking-tight">{title}</h2>
          <button className="btn text-black border-2 border-primary rounded-3xl ml-200 gap-2">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
    </div>
  );
}

function DatasetGrid({ datasets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {datasets.map(ds => (
        <div
          key={ds.id}
          className="group bg-white border-3 border-primary shadow-md rounded-2xl p-8 pb-4 transition
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
