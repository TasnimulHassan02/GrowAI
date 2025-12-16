import React from 'react';
import Logo from '../asset/Logo.png'; 
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const loggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <nav className="flex justify-between bg-white items-center px-10 py-4">
      <div className="text-2xl font-bold flex items-center gap-2">
        <span className="w-14">
          <img src={Logo} alt="GrowAI Logo" />
        </span>
        GrowAI
      </div>

      <ul className="menu menu-horizontal px-3 text-[18px] font-medium gap-6">
        <li><a href="/">Home</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Datasets</a></li>
        <li><a href="/labelers">Solutions</a></li>
      </ul>

      <div className="flex gap-3">
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="btn bg-primary text-black px-8 rounded-3xl"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              className="btn btn-neutral rounded-3xl px-8"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="btn bg-[#50ffaf] text-black px-8 rounded-3xl"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
