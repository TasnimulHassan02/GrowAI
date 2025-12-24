import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agreeToTerms) {
      setErrorMessage("You must agree to the Main Services Agreement and Privacy Policy.");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await register(form);
      console.log("Registered successfully:", response.data);
      
      navigate("/login", { state: { message: "Account created successfully! Please log in." } });
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.data?.errors) {
        setErrorMessage("Please check your input and try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border-3 border-primary">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Create Your Account
        </h2>

        {errorMessage && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center mt-4 gap-4">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              required
              disabled={loading}
            />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                I agree to GrowAI's{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">
                  Services Agreement
                </a>{" "}
                and acknowledge GrowAI's{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">
                  Privacy Policy
                </a>.
              </label>
            </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-5 cursor-pointer rounded-xl font-bold text-black shadow-md transition duration-200
              ${loading 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-primary hover:bg-green-400"
              }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-md text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;