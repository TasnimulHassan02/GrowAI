// import React from "react";
// import Hero from "../components/Hero.jsx";
// import Navbar from "../components/Navbar.jsx";
// import Brandbar from "../components/Brandbar.jsx";
// import Feature from "../components/Feature.jsx";
// import DatasetCard from "../components/DatasetCard.jsx";
// import Footer from "../components/Footer.jsx";

// function HomePage() {
//   return (
//     <div className="bg-slate-50 text-slate-900 min-h-screen">
//       <Navbar />
//       <main className="space-y-16">
//         <Hero />
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 space-y-16">
//           <Brandbar />
//           <Feature />
//           <DatasetCard />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;

import React from 'react'
import Hero from '../components/Hero.jsx';
import Navbar from '../components/Navbar.jsx';
import Brandbar from '../components/Brandbar.jsx';
import Feature from '../components/Feature.jsx';
import DatasetCard from '../components/DatasetCard.jsx';
import Footer from '../components/Footer.jsx';

function HomePage() {

  return (

    <div>

      <Navbar />
      
      <Hero />
      
      <Brandbar />

      <Feature />
      
      <DatasetCard />

      <Footer /> 

    </div>
    
  )
}

export default HomePage
