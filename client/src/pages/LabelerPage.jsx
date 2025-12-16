import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {Search} from "lucide-react";
import Card from "../components/Card";
import Pagination from "../components/pagination";
import Footer from "../components/Footer";
import api from "../api/axios";

const ProfilePlaceholder = "https://i.pravatar.cc/150";
const VerifiedIcon = "https://cdn-icons-png.flaticon.com/512/845/845646.png";

function LabelerPage() {
  const [search, setSearch] = useState("");
  const [personnelList, setPersonnelList] = useState([]);

useEffect(() => {
 const fetchLabelers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Using token:", token);
      const response = await api.get("/labelers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });
      setPersonnelList(response.data);
    }  catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error(
            "Failed to fetch labelers:", error
          );
        }
      }
    };
  fetchLabelers();
}, []);

  const filteredPersonnel = personnelList.filter(
    (p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.expertise.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="text-center my-16 px-6">
        <h2 className="text-5xl font-medium leading-snug mb-4">
          Our Data Labelers <br /> will take it from here
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Our Data Labelers specialize in offering accurate, consistent, and
          quality data labeling for Machine Learning, Computer Vision, and AI.
        </p>

        {/* Search */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <svg
              className="absolute left-4 top-3/5 -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search for any kind of labeling expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 mt-4 rounded-3xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Labeler Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {filteredPersonnel.map((person) => (
          <Card key={person.id + person.name} person={person} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-10">
        <Pagination />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LabelerPage;