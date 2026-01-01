import { useState } from "react";
import { storeLabeler } from "../api/storeLabeler";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterLabelerPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    expertise: "",
    payment_method: "",
    hourly_rate: "",
    description: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    try {
      setLoading(true);
      const res = await storeLabeler(formData);

      toast.success("Application submitted successfully! We'll review it soon.");
      setMessage({
        text: "Thank you! Your labeler application has been submitted.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 4000);

    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to submit application. Please try again.";

      // Show error inline + toast
      setMessage({ text: errorMsg, type: "error" });
      toast.error(errorMsg);

      // Special friendly message if already registered
      if (err.response?.data?.message?.includes("already registered")) {
        toast.info("You are already registered as a labeler.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl border-2 border-primary my-20 bg-white shadow rounded-xl p-8">
          <h1 className="text-3xl font-extrabold mb-2">
            Become a Labeler
          </h1>
          <p className="text-gray-600 mb-6">
            Provide your details to start working as a data labeler
          </p>

          {/* Inline Success/Error Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg text-center font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Expertise
              </label>
              <input
                type="text"
                name="expertise"
                value={form.expertise}
                onChange={handleChange}
                required
                placeholder="Medical, Agriculture, NLP, etc."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Payment & Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Method
                </label>
                <select
                  name="payment_method"
                  value={form.payment_method}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Select method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="bkash">bKash</option>
                  <option value="paypal">PayPal</option>
                  <option value="Rocket">Rocket</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Hourly Rate
                </label>
                <input
                  type="number"
                  name="hourly_rate"
                  value={form.hourly_rate}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Briefly describe your experience"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-green-600 cursor-pointer"
              />
            </div>

            {/* AGREEMENT */}
            <div className="border-gray-300 flex gap-2 items-start">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-gray-600">
                I confirm that all provided information is accurate, I have the skills to perform high-quality data labeling, and I agree to GrowAI's platform policies.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary cursor-pointer hover:bg-green-500 text-black font-bold py-3 rounded-xl transition"
            >
              {loading ? "Submitting..." : "Register as Labeler"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}