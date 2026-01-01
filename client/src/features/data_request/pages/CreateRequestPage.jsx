import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import toast from "react-hot-toast"; 

export default function CreateRequestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dataType: "image",
    quantity: "",
    format: "",
    deadline: "",
    budget: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to submit a request.");
      }

      const res = await fetch("http://localhost:3000/api/dataset_requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          budget: Number(form.budget),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      // Success!
      setSuccess(true);
      toast.success("Dataset request submitted successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        dataType: "image",
        quantity: "",
        format: "",
        deadline: "",
        budget: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {
      const errorMsg = err.message || "Something went wrong. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen mb-10 py-14 px-4">
        <div className="max-w-5xl mb-16 mx-auto">
          {/* Success Message */}
          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center font-medium border border-green-300">
              Dataset request submitted successfully!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 text-center font-medium border border-red-300">
             {error}
            </div>
          )}

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Request a Custom Dataset
            </h1>
            <p className="mt-3 text-gray-600">
              Describe your dataset needs and let expert collectors build it for you.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-300 overflow-hidden">
            <div className="h-2 bg-linear-to-br from-green-400 to-emerald-500" />
            
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
              {/* BASIC INFO */}
              <section>
                <h2 className="text-xl font-bold mb-4">Basic Information</h2>

                <input
                  name="title"
                  placeholder="Dataset title"
                  value={form.title}
                  className="w-full border border-gray-400 rounded-xl px-5 py-3 mb-4"
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="description"
                  placeholder="Describe what kind of data you need, labeling rules, edge cases, etc."
                  rows="4"
                  value={form.description}
                  className="w-full border border-gray-400 rounded-xl px-5 py-3"
                  onChange={handleChange}
                />
              </section>

              {/* SPEC */}
              <section>
                <h2 className="text-xl font-bold mb-4">Dataset Specifications</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <select
                    name="dataType"
                    value={form.dataType}
                    className="border border-gray-400 rounded-xl px-4 py-3"
                    onChange={handleChange}
                  >
                    <option value="image">Image</option>
                    <option value="text">Text</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>

                  <input
                    name="quantity"
                    type="number"
                    placeholder="Number of samples"
                    value={form.quantity}
                    className="border border-gray-400 rounded-xl px-4 py-3"
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="format"
                    placeholder="CSV, JSON, JPG..."
                    value={form.format}
                    className="border border-gray-400 rounded-xl px-4 py-3"
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    className="border border-gray-400 rounded-xl px-4 py-3"
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>

              {/* BUDGET */}
              <section>
                <h2 className="text-xl font-bold mb-4">Budget</h2>
                <input
                  name="budget"
                  type="number"
                  placeholder="USD"
                  value={form.budget}
                  className="w-full border border-gray-400 rounded-xl px-5 py-3"
                  onChange={handleChange}
                  required
                />
              </section>

              {/* SUBMIT */}
              <button
                disabled={loading}
                className="w-full cursor-pointer mb-4 bg-primary text-black font-bold py-4 rounded-2xl"
              >
                {loading ? "Submitting..." : "Submit Dataset Request"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}