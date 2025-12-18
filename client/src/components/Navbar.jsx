// import React from "react";
// import Logo from "../asset/Logo.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "Datasets", href: "#datasets" },
//   { label: "Solutions", href: "/labelers" },
//   { label: "About", href: "#about" },
// ];

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const loggedIn = Boolean(localStorage.getItem("token"));

//   const isActive = (href) =>
//     href === "/" ? location.pathname === "/" : location.pathname === href;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <header className="sticky top-4 z-50 px-4">
//       <div className="mx-auto max-w-6xl">
//         <nav className="flex items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl">
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 text-lg font-semibold text-slate-900"
//           >
//             <span className="w-12 shrink-0">
//               <img src={Logo} alt="GrowAI logo" />
//             </span>
//             GrowAI
//           </button>

//           <ul className="hidden items-center gap-4 text-sm font-semibold text-slate-600 md:flex">
//             {navItems.map((item) => (
//               <li key={item.label}>
//                 {item.href.startsWith("#") ? (
//                   <a
//                     href={item.href}
//                     className="rounded-full px-3 py-2 transition hover:text-slate-900"
//                   >
//                     {item.label}
//                   </a>
//                 ) : (
//                   <Link
//                     to={item.href}
//                     className={`rounded-full px-3 py-2 transition hover:text-slate-900 ${
//                       isActive(item.href) ? "bg-slate-100 text-slate-900" : ""
//                     }`}
//                   >
//                     {item.label}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => navigate("/labelers")}
//               className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
//             >
//               Book a demo
//             </button>

//             {loggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5"
//               >
//                 Sign out
//               </button>
//             ) : (
//               <>
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
//                 >
//                   Log in
//                 </button>
//                 <button
//                   onClick={() => navigate("/register")}
//                   className="inline-flex items-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5"
//                 >
//                   Start free
//                 </button>
//               </>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;


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
