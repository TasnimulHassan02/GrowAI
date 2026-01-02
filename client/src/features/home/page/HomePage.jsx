import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import DatasetCard from "../../../components/DatasetCard";

import Hero from "../components/Hero";
import Brandbar from "../components/Brandbar";
import Feature from "../components/Feature";
import Welcome from "../components/Welcome";


function HomePage() {
  const token = localStorage.getItem("token")
  return (
    <div className="min-h-screen">
      <Navbar />
      {token && (<Welcome />)}
      

      <main>
        <Hero />
        
        <div className="mx-auto px-4 space-y-10">
          <Brandbar />
          <Feature />
          <DatasetCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
