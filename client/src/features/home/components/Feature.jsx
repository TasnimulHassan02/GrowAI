import React from "react";
import { ShieldCheck, Sparkles, Clock3, Workflow } from "lucide-react";

function Feature() {

  const features = [
    {
      title: "Buy high-quality curated datasets",
      desc: "Professionally prepared, clean, and governed datasets ready for analytics, AI training, and research.",
      tag: "Marketplace",
      icon: ShieldCheck,
    },
    {
      title: "Sell your datasets securely",
      desc: "Encrypted uploads, payouts handled, and fine-grained access controls to protect your IP.",
      tag: "Monetize",
      icon: Workflow,
    },
    {
      title: "Label your collected dataset",
      desc: "Fast, accurate labeling with QA workflows so models ship with confidence.",
      tag: "Labeling",
      icon: Sparkles,
    },
    {
      title: "Thousands of datasets across industries",
      desc: "Search across every domain with relevance boosting and freshness signals.",
      tag: "Coverage",
      icon: Clock3,
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

          {features.map((item, index) => {
            const Icon = item.icon;
            return (
            <div
              key={index}
              className="border border-green-400 rounded-2xl p-6 hover:shadow-md transition bg-white"
            >
              <div className="flex items-start gap-4 p-3">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <Icon size={24} />
                </div>
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                    {item.tag}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}

export default Feature;