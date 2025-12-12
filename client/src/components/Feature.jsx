import React from "react";
import { Sun } from 'lucide-react';


function Feature() {
  const features = [
    {
      title: "Buy high-quality curated datasets",
      desc: "Get access to professionally prepared, clean, and reliable datasets that are reviewed for accuracy and ready to use for analytics, AI training, research, and business projects.",
    },
    {
      title: "Sell your datasets securely",
      desc: "Upload your datasets with confidence and earn money through a safe, encrypted, and trusted selling platform that protects your data and handles payments for you.",
    },
    {
      title: "Label your collected dataset",
      desc: "Easily add accurate tags, annotations, and classifications to your raw data using our built-in labeling tools, helping you prepare high-quality, AI-ready datasets.",
    },
    {
      title: "Thousands of Datasets across every Industry",
      desc: "Explore a wide collection of datasets across every category, making it easy to find exactly what you need for your projects.",
    },
  ];

  return (

    <section className="w-full flex justify-center py-20 px-4 bg-white">
      <div className="max-w-6xl w-full border bg-gray-90 border-gray-200 rounded-3xl p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12">
          <h2 className="text-4xl font-bold leading-tight text-gray-900">
            Do More With <br />
            <span className="text-[#33f29c]">More of Your Data</span>
          </h2>

          <p className="text-gray-500 text-sm max-w-xs mt-4 md:mt-0">
            Unlock the full value of your data <br /> Smart data that Drives the Future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="border border-green-400 rounded-2xl p-6 hover:shadow-md transition bg-white"
            >
              <div className="text-gray-700 mb-4 text-xl"><Sun size={38} strokeWidth={1.5} /></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;