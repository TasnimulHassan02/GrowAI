import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function CreateRequestPage() {
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
    console.log("Submitting request:", form);
    alert("Dataset request submitted!");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-14 px-4">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Request a Custom Dataset
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Describe your dataset needs and let expert collectors build it for you.
              Pay only when your requirements are fulfilled.
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

            {/* TOP ACCENT */}
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500" />

            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 space-y-8"
            >

              {/* BASIC INFO */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <input
                    name="title"
                    placeholder="Request title (e.g. Street Images for Traffic AI)"
                    className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                    onChange={handleChange}
                    required
                  />

                  <textarea
                    name="description"
                    placeholder="Describe what kind of data you need, labeling rules, edge cases, etc."
                    rows="4"
                    className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* DATA SPEC */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Dataset Specifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Data Type
                    </label>
                    <select
                      name="dataType"
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                      onChange={handleChange}
                    >
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Number of Samples
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      placeholder="e.g. 1000"
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Output Format
                    </label>
                    <input
                      name="format"
                      placeholder="CSV, JSON, JPG, WAV..."
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Deadline
                    </label>
                    <input
                      name="deadline"
                      type="date"
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              {/* BUDGET */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Budget
                </h2>

                <input
                  name="budget"
                  type="number"
                  placeholder="Your maximum budget (USD)"
                  className="w-full border rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                  onChange={handleChange}
                />

                <p className="text-sm text-gray-500 mt-2">
                  💡 Tip: Higher budgets attract faster and more experienced sellers.
                </p>
              </section>

              {/* SUBMIT */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg transition"
                >
                  Submit Dataset Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
