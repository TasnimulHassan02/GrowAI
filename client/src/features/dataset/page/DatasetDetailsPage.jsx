import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  Star,
  Download,
  ChartNoAxesCombined,
  HardDrive,
  Tag,
} from "lucide-react";

export default function DatasetDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/datasets/${id}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      });
  }, [id]);

  const dataset = data?.dataset;
  const stats = data?.stats;
  const samples = data?.samples || [];
  const feedback = data?.feedback || [];

  return (
    <>
      <Navbar />

      {/* HERO (loads immediately) */}
      <div className="relative bg-linear-to-br from-green-50 via-white to-blue-50 border-b-3 border-b-primary">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {loading ? (
            <SkeletonHero />
          ) : (
            <>
              <span className="inline-block bg-green-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                {dataset.category}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold mt-4">
                {dataset.title}
              </h1>

              <p className="text-gray-600 mt-5 max-w-3xl text-lg">
                {dataset.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {dataset.tags?.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 border-2 border-primary bg-white px-4 py-1.5 rounded-full text-sm"
                  >
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-14">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonStat key={i} />)
            ) : (
              <>
                <Stat icon={<Star />} label="Popularity" value={stats.popularity_score} />
                <Stat icon={<Download />} label="Downloads" value={stats.downloads} />
                <Stat icon={<HardDrive />} label="Size" value={`${dataset.size_mb} MB`} />
                <Stat icon={<ChartNoAxesCombined />} label="Records" value={dataset.total_records} />
              </>
            )}
          </div>

          {/* SAMPLE RECORDS */}
          <Section title="Sample Records">
            {loading ? (
              <SkeletonTable />
            ) : (
              <div className="overflow-x-auto border-2 border-gray-300 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      {samples[0] &&
                        Object.keys(samples[0].record).map(key => (
                          <th key={key} className="p-3 text-left font-semibold">
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {samples.map((s, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        {Object.values(s.record).map((val, i) => (
                          <td key={i} className="p-3">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Section>

          {/* FEEDBACK */}
          <Section title={`User Feedback (${feedback.length})`}>
            {loading ? (
              <SkeletonFeedback />
            ) : (
              <div className="space-y-6 mb-20">
                {feedback.map(f => (
                  <div key={f.id} className="border-2 border-primary rounded-2xl p-6 bg-white">
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold">User {f.user_id}</span>
                      <span className="text-yellow-500">⭐ {f.rating}/5</span>
                    </div>
                    <p className="text-gray-700">{f.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="sticky top-24">
          <div className="border-3 border-primary rounded-3xl p-8 shadow-xl bg-white">
            {loading ? (
              <SkeletonSidebar />
            ) : (
              <>
                <p className="text-4xl font-extrabold mb-2">${dataset.price}</p>
                <p className="text-sm text-gray-500 mb-6">
                  One-time purchase • Instant access
                </p>

                <ul className="space-y-4 text-sm mb-8">
                  <li>📁 Format: {dataset.format}</li>
                  <li>📄 License: {dataset.license}</li>
                  <li>📊 {dataset.total_records} records</li>
                  <li>👤 Seller: {dataset.owner_name}</li>
                </ul>

                <Link
                  to={`/checkout/${dataset.id}`}
                  state={{ price: dataset.price, title: dataset.title }}
                  className="block text-center bg-green-500 text-white py-4 rounded-full font-bold text-lg hover:bg-green-600 transition"
                >
                  Purchase Dataset
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ---------- Components ---------- */

function Stat({ icon, label, value }) {
  return (
    <div className="bg-white border border-primary rounded-xl p-6 flex gap-4">
      <div className="text-green-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

/* ---------- Skeletons ---------- */

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const SkeletonHero = () => (
  <>
    <Skeleton className="w-32 h-8 mb-4" />
    <Skeleton className="w-3/4 h-12 mb-4" />
    <Skeleton className="w-full h-6" />
  </>
);

const SkeletonStat = () => <Skeleton className="h-24" />;
const SkeletonTable = () => <Skeleton className="h-64 w-full" />;
const SkeletonFeedback = () => <Skeleton className="h-40 w-full" />;
const SkeletonSidebar = () => <Skeleton className="h-64 w-full" />;
