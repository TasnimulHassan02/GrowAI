import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { googleAuth } from "../api/authService";



function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError("");
      const res = await googleAuth({
        credential: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.onGoogleLibraryLoad = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "pill",
          width: "100%",
        }
      );
    };

    script.onload = () => {
      if (window.google) window.onGoogleLibraryLoad();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border-3 border-primary">
    
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
        className="btn px-18 ml-22 mt-5 cursor-pointer rounded-4xl font-bold text-black shadow-md transition duration-200 bg-primary hover:bg-green-400"
      >
        Login
      </button>
    </form>
    <div className="flex items-center my-6">
      <div className="grow border-2 border-t border-gray-300"></div>
      <span className="px-3 text-sm text-gray-500">OR</span>
      <div className="grow border-2 border-t border-gray-300"></div>
    </div>
    <div id="google-signin-button" className="flex justify-center"></div>

    <p className="text-center text-md text-gray-600 mt-6">
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
