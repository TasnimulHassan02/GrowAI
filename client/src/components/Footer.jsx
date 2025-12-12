import React from "react";

function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-neutral-content rounded-4xl">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold flex mb- items-center gap-2">
                <span className="w-14"><img src='./src/asset/Dark-logo.png'></img></span> <h1 className='text-[#50ffaf] text-3xl'>GrowAI</h1>
            </div>
            </div>

            <p className="text-neutral-300 max-w-xs leading-relaxed">
              Explore the principles of GrowAI, significantly changing the industry tomorrow.
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition">
                <span className="text-primary text-xl">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition">
                <span className="text-primary text-xl">ig</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition">
                <span className="text-primary text-xl">X</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition">
                <span className="text-primary text-xl">yt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Solutions", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-neutral-400 hover:text-primary transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white uppercase tracking-wider mb-6">Contact</h3>
            <div className="space-y-4 text-neutral-400">
              <p className="max-w-xs">
                Gulshan Link Road, 12<br />
                Badda, Dhaka 1000
              </p>
              <p className="text-primary font-medium">+661 7632 2323</p>
            </div>
          </div>

          {/* Subscribe Card - Mint Green */}
          <div className="lg:col-span-4">
            <div className="bg-[#00f5a0] rounded-3xl p-6 shadow-2xl text-neutral">
              <h3 className="text-2xl font-bold mb-6">Subscribe For Updates!</h3>

              <form className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="input input-bordered w-full bg-white text-neutral placeholder-neutral-500 rounded-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Your Mail"
                    className="input input-bordered w-full bg-white text-neutral placeholder-neutral-500 rounded-full"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-neutral w-full rounded-full font-bold hover:bg-neutral-focus shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" pt-3 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} GrowAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;