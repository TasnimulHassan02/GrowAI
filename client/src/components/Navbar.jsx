import React from 'react';
import Logo from '../asset/Logo.png'; 
import { UserRoundPen } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import NotificationBell from '../features/notifications/components/NotificationBell';

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const loggedIn = Boolean(token);
  const role = localStorage.getItem("role")

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <nav id = "nav" className="flex justify-between bg-white items-center px-10 py-4">
      <a href="/">
      <div className="text-2xl font-bold flex items-center gap-2">
        <span className="w-14">
          <img src={Logo} alt="GrowAI Logo" />
        </span>
        GrowAI
      </div>
      </a>

      <ul className="menu menu-horizontal text-[16px] font-medium gap-4">
        <li><a href="/subscriptions">GrowAI Pro</a></li>
        <li><a href="/datasets">Datasets</a></li>
         {(role.includes('labeler')) && (
        <li><a href="/labeler/dashboard">Data Labeling</a></li>)}
        {!(role.includes('labeler')) && (
        <li><a href="/labelers">Data Labeling</a></li>)}
          {(role.includes('buyer')) && (role.includes('seller')) ? (
          <li><a href="/datarequest">Find Data</a></li>
        ) : role.includes('buyer') ? (
          <li><a href="/createrequest">Find Data</a></li>
        ) : null}
        {console.log(role)}
        {!((role.includes('labeler')) && (role.includes('seller'))) && (
         <li>
        <details>
          <summary>Earn Money</summary>
          
          <ul className="bg-base-100 rounded-t-none p-2">
            {!(role.includes('seller')) && (
            <li><a href='/sellers/register'>Sell Data</a></li>
            )}
            {!(role.includes('labeler')) && (
            <li><a href='/labelers/register'>Label Data</a></li>
            )}
          </ul>
        </details>
      </li>
        )}
      </ul>
 


      

      <div className="flex gap-3 items-center">
        {loggedIn ? (
          <>
            <NotificationBell />
            <Link to="/messages" className="btn btn-ghost">
              Messages
            </Link>
            <div className='mr-5 border-5 rounded-4xl p-2 border-primary'>
                <a href='/profile'><UserRoundPen size={24} /></a>
            </div>
              {role.includes("admin") && (
                  <a
                    href="/admin/dashboard"
                    className="px-4 py-2 rounded-3xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
                  >
                    Admin Panel
                  </a>
                )}
            <button
              onClick={handleLogout}
              className="btn bg-primary text-black px-8 rounded-3xl"
            >
              Sign Out
            </button>
            
          </>
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
