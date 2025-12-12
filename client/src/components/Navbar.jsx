import React from 'react'


function Navbar () {

  return (
    <div>
      <nav className="flex justify-between bg-white items-center px-10 py-4 ">
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="w-14"><img src='./src/asset/Logo.png'></img></span> GrowAI
        </div>
        <ul className="menu menu-horizontal px-3 text-[18px] font-medium gap-6">
          <li><a>Home</a></li>
          <li><a>About us</a></li>
          <li><a>Datasets</a></li>
          <li><a>Solutions</a></li>
        </ul>
        <div className="flex gap-3">
          <button className="btn btn-neutral rounded-3xl px-8">Log In</button>
          <button className="btn bg-[#50ffaf] text-black px-8 rounded-3xl">Sign Up</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;