import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { storeSeller } from "../api/storeSeller";
import toast from "react-hot-toast"; 

export default function SellerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); 

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    organization: "",
    dataType: "",
    paymentMethod: "",
    description: "",
    agree: false,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); 

    if (!form.agree) {
      toast.error("You must agree to the terms");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("full_name", form.fullName);
      formData.append("phone", form.phone);
      formData.append("organization", form.organization);
      formData.append("data_type", form.dataType);
      formData.append("payment_method", form.paymentMethod);
      formData.append("description", form.description);
      if (form.photo) {
        formData.append("photo", form.photo);
      }

      await storeSeller(formData);

      // Success feedback
      toast.success("Application submitted successfully!");
      setMessage({
        text: "Thank you! Your seller application has been submitted. We will review it soon.",
        type: "success",
      });

      // Redirect after short delay so user sees success
      setTimeout(() => {
        navigate("/");
      }, 4000);

    } catch (err) {
      console.error("Seller registration error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to register as seller. Please try again.";

      setMessage({ text: errorMsg, type: "error" });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl border-2 border-primary my-10 bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold mb-2">
            Become a Data Seller
          </h1>
          <p className="text-gray-600 mb-6">
            Register to sell datasets and receive payments securely.
          </p>

          {/* Inline Success / Error Message */}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border-gray-300 border rounded-xl px-4 py-3"
            />

            {/* PHONE */}
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* ORGANIZATION */}
            <input
              name="organization"
              placeholder="Organization / Individual"
              value={form.organization}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* DATA TYPE */}
            <select
              name="dataType"
              value={form.dataType}
              onChange={handleChange}
              required
              className="w-full border-gray-300 border rounded-xl px-4 py-3"
            >
              <option value="">Type of Data</option>
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="tabular">Tabular</option>
              <option value="mixed">Mixed</option>
            </select>

            {/* PAYMENT METHOD */}
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              required
              className="w-full border-gray-300 border rounded-xl px-4 py-3"
            >
              <option value="">Preferred Payment Method</option>
              <option value="bank">Bank Transfer</option>
              <option value="bkash">bKash</option>
              <option value="rocket">Rocket</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>

            {/* PHOTO */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="photo"
                onChange={handleChange}
                className="block w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-green-600 cursor-pointer"
              />
            </div>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Describe your data source, quality, size..."
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border-gray-300 border rounded-xl px-4 py-3"
            />

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
                I confirm I own the rights to sell this data and agree to the
                platform policies.
              </p>
            </div>

            {/* SUBMIT */}
            <button
              disabled={loading}
              className="w-full bg-primary hover:bg-green-500 cursor-pointer text-black font-bold py-3 rounded-xl transition"
              href="#">
              {loading ? "Submitting..." : "Register as Seller"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}