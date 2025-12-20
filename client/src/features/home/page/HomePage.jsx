import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import DatasetCard from "../../../components/DatasetCard";

import Hero from "../components/Hero";
import Brandbar from "../components/Brandbar";
import Feature from "../components/Feature";


function HomePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <main className="space-y-16">
        <Hero />
        <div className="max-w-6xl mx-auto px-4 space-y-16">
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
