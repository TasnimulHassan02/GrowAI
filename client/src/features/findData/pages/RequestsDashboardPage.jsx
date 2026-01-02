import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import RequestBar from "../components/RequestBar";
import api from "../../../api/axios";
export default function RequestsDashboardPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");


  useEffect(() => {
    const fetchRequests = async () => {
  try {
    const res = await api.get("/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRequests(res.data);
  } catch (err) {
    console.error("Error loading requests", err);
  } finally {
    setLoading(false);
  }
};

    fetchRequests();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Dataset Collection Requests
              </h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Browse live dataset collection jobs and start earning by collecting
                or labeling high-quality data.
              </p>
            </div>
        
            {/* CREATE REQUEST BUTTON */}
            
            <button
              className="px-6 py-3 bg-primary cursor-pointer text-black font-semibold rounded-xl shadow hover:bg-green-500 transition"
            >
              <a href="/createrequest">+ Create Request</a>
            </button>
         
          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500 mt-10">
              Loading requests...
            </p>
          )}

          {/* EMPTY */}
          {!loading && requests.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No dataset requests available right now.
            </p>
          )}

          {/* REQUEST LIST */}
          <div className="space-y-4">
            {requests.map((req) => (
              <RequestBar key={req.id} request={req} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}



