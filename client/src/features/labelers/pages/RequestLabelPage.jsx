import { useState } from "react";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

function RequestLabelPage() {
  const [form, setForm] = useState({
    taskType: "",
    datasetSize: "",
    deadline: "",
    budget: "",
    description: "",
    contact: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await api.post("/jobs", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess(true);
      setForm({  
        taskType: "",
        datasetSize: "",
        deadline: "",
        budget: "",
        description: "",
        contact: ""
      });
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto w-full p-6 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Request Dataset Labeling
          </h2>

          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
              Request submitted successfully! Labeler will reach you soon.
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={submitRequest} className="space-y-6">
            <input
              type="text"
              name="taskType"
              value={form.taskType}
              onChange={handleChange}
              placeholder="Task Type"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />

            <input
              type="text"
              name="datasetSize"
              value={form.datasetSize}
              onChange={handleChange}
              placeholder="Dataset Size"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />

            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="Budget in USD"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />

            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Mail address / Phone Number"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed labeling instructions, guidelines, examples..."
              rows="6"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-xl font-bold text-black transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-400 cursor-pointer shadow-lg"
              }`}
            >
              {loading ? "Submitting Request..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RequestLabelPage;