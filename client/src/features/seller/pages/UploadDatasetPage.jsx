import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { 
  Upload, FileText, Tag, Lock, Globe, Database, 
  ShieldCheck, CircleDollarSign, Info, CheckCircle2, AlertCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { sendNotification } from "../../../../../server/controllers/notificationController";
import api from "../../../api/axios";

export default function UploadDatasetPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", summary: "", description: "", category: "", tags: "",
    format: "", total_records: "", size_mb: "", source: "",
    update_frequency: "one-time", license: "", citation: "",
    ethics_note: "", price: "", visibility: "public", is_free: false,
  });

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token")
  const canSubmit = file && form.title && form.description;


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) formData.append("file_path", file);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    const res = await api.post(
      "/datasets",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      navigate("/datasets")
    );
    // await sendNotification(
    //   userId,
    //   "upload_success",
    //   "New Dataset Add Successful!",
    //   `You now have aSuccessfully added new dataset to the system.`,
    //   "dataset"
    // );

    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "❌ Failed to upload dataset");
  } finally {
    setLoading(false);
  }
};


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Calculate "Trust Score" based on form completion
  const completionRate = Object.values(form).filter(v => v !== "").length / Object.keys(form).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-12">
  
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
            Deploy your <span className="text-emerald-600">Dataset</span>
          </h1>
          <p className="text-md text-slate-600 mt-3 max-w-2xl">
            Join the elite circle of data providers. Monetize the new opportunity. High-quality documentation leads to 4x higher acquisition rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN FORM AREA */}

          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-10">

            {/* 1. Basics */}
            <FormCard icon={<Database className="text-emerald-600 " />} title="Dataset Identity">
              <Input label="Title" name="title" placeholder="e.g. Global Stock Market Sentiment 2024" value={form.title} onChange={handleChange} />
              <Textarea label="Short Summary" name="summary" placeholder="One sentence describing the value of this data..." value={form.summary} onChange={handleChange} />
              <Textarea label="Full Documentation" name="description" rows={6} placeholder="Methodology, data cleaning steps, and variable definitions..." value={form.description} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Category" name="category" placeholder="e.g. Finance" value={form.category} onChange={handleChange} />
                <Input label="Tags" name="tags" placeholder="e.g. stocks, sentiment, nlp" value={form.tags} onChange={handleChange} />
              </div>
            </FormCard>

            {/* 2. Technical */}
            <FormCard icon={<FileText className="text-blue-600" />} title="Technical Specification">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Dataset Format" name="format" placeholder="e.g. CSV, Parquet, JSON" value={form.format} onChange={handleChange} />
                <Input label="Total Records" type="number" name="total_records" placeholder="e.g. 150,000" value={form.total_records} onChange={handleChange} />
                <Input label="Uncompressed Size (MB)" type="number" name="size_mb" value={form.size_mb} onChange={handleChange} />
                <Input label="Original Source" name="source" placeholder="e.g. API, Web Scraping, Direct" value={form.source} onChange={handleChange} />
              </div>
              <Select 
                label="Update Cadence" 
                name="update_frequency" 
                value={form.update_frequency} 
                onChange={handleChange} 
                options={["one-time", "weekly", "monthly", "real-time"]} 
              />
              <Select
  label="License Type"
  name="license"
  value={form.license}
  onChange={handleChange}
  options={[
    "CC-BY-4.0",
    "CC-BY-SA-4.0",
    "MIT",
    "Apache-2.0",
    "Proprietary"
  ]}
/>

<Input
  label="How should users cite this dataset?"
  name="citation"
  placeholder="Author (Year). Dataset Name. Platform."
  value={form.citation}
  onChange={handleChange}
/>


            </FormCard>

            {/* 3. Ingestion (Files) */}
            <FormCard icon={<Upload className="text-purple-600" />} title="Dataset Upload">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UploadBox 
                  label="Primary Dataset" 
                  subLabel="CSV, JSON, or ZIP (Max 1GB)"
                  file={file}
                  onChange={e => setFile(e.target.files[0])} 
                />
                <UploadBox 
                  label="Branding Thumbnail" 
                  subLabel="JPG or PNG (Ratio 16:9)"
                  file={thumbnail}
                  accept="image/*"
                  onChange={e => setThumbnail(e.target.files[0])} 
                />
              </div>
            </FormCard>

            {/* 4. Commercials */}
            <FormCard icon={<CircleDollarSign className="text-amber-600" />} title="Monetization Terms">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Input label="Access Price (USD)" name="price" type="number" value={form.price} onChange={handleChange} disabled={form.is_free} />
                  {form.is_free && <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] mt-6 rounded-lg" />}
                </div>
                <Select label="Visibility" name="visibility" value={form.visibility} onChange={handleChange} options={["public", "private", "invite-only"]} />
              </div>
              <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <input type="checkbox" name="is_free" checked={form.is_free} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="font-semibold text-slate-700">Release as Open Data (Free)</span>
              </label>
            </FormCard>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full bg-primary text-black py-5 rounded-2xl text-xl font-bold hover:bg-green-400 cursor-pointer hover:shadow-2xl transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Processing Pipeline..." : "Publish to Marketplace"}
            </button>
          </form>

          {/* SIDEBAR DASHBOARD */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              {/* Trust Score Card */}
              <div className="bg-white border-3 border-primary rounded-3xl p-8 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 text-2xl flex items-center gap-2">
                   <ShieldCheck className="text-emerald-500" /> Quality Score
                </h3>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-500">Metadata Completeness</span>
                    <span className="text-emerald-600">{Math.round(completionRate * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500" 
                      style={{ width: `${completionRate * 100}%` }}
                    />
                  </div>
                </div>

                <ul className="space-y-4">
                  <ScoreItem active={form.title.length > 10} text="Descriptive Title" />
                  <ScoreItem active={form.description.length > 50} text="Rich Methodology Details" />
                  <ScoreItem active={!!file} text="Data Upload Ready" />
                  <ScoreItem active={!!thumbnail} text="Visual Brand Identity" />
                </ul>
              </div>

              {/* Status Mini-Card */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Target Status</p>
                    <p className="text-lg font-bold flex items-center gap-2">
                      {form.visibility === "public" ? <Globe size={18} className="text-emerald-400" /> : <Lock size={18} className="text-amber-400" />}
                      {form.visibility.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Fee</p>
                    <p className="text-lg font-bold">{form.is_free ? "FREE" : `$${form.price || "0.00"}`}</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 text-white/5 rotate-12">
                   <Database size={120} />
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function FormCard({ icon, title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="group">
      <label className="text-sm font-bold text-slate-700 mb-1.5 block ml-1">{label}</label>
      <input 
        {...props} 
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-400" 
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700 mb-1.5 block ml-1">{label}</label>
      <textarea 
        {...props} 
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-400" 
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700 mb-1.5 block ml-1">{label}</label>
      <select 
        {...props} 
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}

function UploadBox({ label, subLabel, file, ...props }) {
  return (
    <label className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer group ${file ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-emerald-400'}`}>
      <input type="file" {...props} className="absolute inset-0 opacity-0 cursor-pointer" />
      <div className={`p-4 rounded-full mb-3 ${file ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 group-hover:text-emerald-500 group-hover:scale-110 transition-all shadow-sm'}`}>
        {file ? <CheckCircle2 size={24} /> : <Upload size={24} />}
      </div>
      <p className="font-bold text-slate-900">{file ? file.name : label}</p>
      <p className="text-xs text-slate-500 mt-1 font-medium">{file ? `${(file.size / 1024).toFixed(1)} KB` : subLabel}</p>
    </label>
  );
}

function ScoreItem({ active, text }) {
  return (
    <li className={`flex items-center gap-3 text-sm font-medium transition-colors ${active ? 'text-slate-900' : 'text-slate-400'}`}>
      {active ? <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} /> : <AlertCircle className="text-slate-200 flex-shrink-0" size={18} />}
      {text}
    </li>
  );
}