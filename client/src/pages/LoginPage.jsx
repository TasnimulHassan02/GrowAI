import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);

      console.log("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
    
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
      Welcome Back
    </h2>

    {error && (
      <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>
    )}

    <form onSubmit={handleLogin} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="mt-1 w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="flex flex-col relative">
        <label className="text-sm font-semibold text-gray-700 mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-black font-bold rounded-xl hover:text-gray-400 shadow-md transition duration-200"
      >
        Login
      </button>
    </form>

    <p className="text-center text-sm text-gray-600 mt-6">
      Don’t have an account?{" "}
      <Link to="/register" className="text-green-500 font-semibold hover:underline">
        Sign up
      </Link>
    </p>
  </div>
</div>

  );
}

export default LoginPage;