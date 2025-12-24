import React from "react";
import { DatabaseZap } from "lucide-react";

const datasets = [
  {
    title: "2023 Gaza War",
    category: "Geopolitical • Conflict",
    usability: 9.8,
    size: "42.1 MB",
    rows: "127K",
    badge: "Trending",
  },
  {
    title: "Supermarket Sales Dashboard",
    category: "Retail • E-commerce",
    usability: 9.6,
    size: "18.7 MB",
    rows: "89K",
    badge: "Popular",
  },
  {
    title: "Global Employee Salary Dataset",
    category: "HR • Business",
    usability: 9.5,
    size: "95.4 MB",
    rows: "1.2M",
    badge: null,
  },
  {
    title: "Diabetes Health Indicators",
    category: "Healthcare • Medical",
    usability: 9.7,
    size: "33.2 MB",
    rows: "253K",
    badge: "New",
  },
  {
    title: "Worldwide House Price Index",
    category: "Real Estate • Finance",
    usability: 9.4,
    size: "67.8 MB",
    rows: "890K",
    badge: null,
  },
  {
    title: "Social Media Engagement 2025",
    category: "Marketing • Social",
    usability: 9.9,
    size: "112 MB",
    rows: "2.1M",
    badge: "Hot",
  },
];

function DatasetCard() {
  return (
    <section className="px-6 py-20 mx-20">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-base-content">Explore Datasets</h2>
            <p className="mt-3 text-lg text-base-content/70">
              564K+ high-quality, curated, and ready-to-use public datasets
            </p>
          </div>
          <button className="btn text-black btn-primary rounded-3xl gap-2">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {datasets.map((dataset, i) => (
            <div
              key={i}
              className="group relative bg-slate-50 rounded-3xl border-2 border-primary overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              {dataset.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="badge badge-primary rounded-1xl badge-lg font-semibold shadow-lg">
                    {dataset.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                  <DatabaseZap />
                </div>

                <h3 className="text-xl font-bold text-base-content mb-2  transition">
                  {dataset.title}
                </h3>
                <p className="text-sm text-emerald-600 font-medium mb-4">{dataset.category}</p>

                <p className="text-base-content/70 text-sm line-clamp-2 mb-6">
                  Clean, structured, and production-ready dataset used by researchers and companies worldwide.
                </p>
                <div className="flex items-center justify-between text-md">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600">{dataset.usability}</span>
                    <span className="text-base-content/60 ml-1">/10 Usability</span>
                  </div>
                  <div className="flex items-center gap-4 text-base-content/60">
                    <span>{dataset.rows} rows</span>
                    <span>•</span>
                    <span>{dataset.size}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t-2 border-base-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="btn btn-primary font-medium rounded-3xl btn-sm w-full">
                    Preview Dataset
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24 mb-16">
          <p className="text-base-content/60 mb-6">From avocado prices to satellite imagery — we have it all.</p>
          <button className="btn btn-primary rounded-4xl btn-lg">
            Explore All 564,000+ Datasets
          </button>
        </div>
      </div>
    </section>
  );
}

export default DatasetCard;