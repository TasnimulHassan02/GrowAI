import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Pagination from "../../../components/pagination";
import CardGrid from "../components/CardGrid.jsx";
import { useLabelers } from "../hooks/useLabelers";


function LabelerPage() {
  const [search, setSearch] = useState("");
  const { labelers } = useLabelers();

  const filteredLabelers = labelers.filter(
    (p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.expertise.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="text-center my-16 px-6">
        <h2 className="text-5xl font-medium mb-4">
          Our Data Labelers <br /> will take it from here
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Accurate, consistent, and quality data labeling for AI & ML.
        </p>

        {/* Search */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-6 py-4 rounded-3xl border"
          />
        </div>
      </div>

      <CardGrid labelers={filteredLabelers} />

      <div className="flex justify-center my-10">
        <Pagination />
      </div>

      <Footer />
    </div>
  );
}

export default LabelerPage;
