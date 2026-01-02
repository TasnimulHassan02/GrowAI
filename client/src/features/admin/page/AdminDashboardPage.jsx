import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  Users,
  Database,
  CheckCircle,
  XCircle,
  Shield,
  BarChart3,
  CircleCheckBig,
} from "lucide-react";

import {
  fetchAdminStats,
  fetchPendingApprovals,
  updateApprovalStatus,
} from "../api/adminApi";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, approvalData] = await Promise.all([
          fetchAdminStats(),
          fetchPendingApprovals(),
        ]);

        setStats(statsData);
        setApprovals(approvalData);
      } catch (err) {
        console.error("Admin dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);
  
const handleAction = async (id, type, action) => {
  try {
    await updateApprovalStatus({ id, type, action });
    setApprovals(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.error("Approval action failed:", err);
  }
};


  if (loading) {
    return <div className="pb-160 text-center pt-40 text-3xl">Loading admin dashboard...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen mb-15 bg-gray-50 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Oversee users, datasets, approvals, and platform health.
            </p>
          </div>
    
          {/* STATS */}
          <div className="grid grid-cols-3 grid-rows-2 gap-6">
            <StatCard title="Total Users" value={stats.users} icon={<Users size={22} />} />
            <StatCard title="Sellers" value={stats.sellers} icon={<Users size={22} />} />
            <StatCard title="Labelers" value={stats.labelers} icon={<Users size={22} />} />
            <StatCard title="Datasets" value={stats.datasets} icon={<Database size={22} />} />
            <StatCard title="Pending Approvals" value={stats.pending} icon={<Shield size={22} />} />
            <StatCard title="Revenue" value={`$${stats.revenue}`} icon={<BarChart3 size={22} />} />
          </div>

          {/* APPROVALS */}
          <Section title="Pending Approvals " count={approvals.length}>
            {approvals.length === 0 ? (
              <p className="text-gray-500 ">No pending approvals</p>
            ) : (
              approvals.map(item => (
            <ApprovalRow
            key={item.id}
            name={item.name}
            role={item.type}
            onApprove={() => handleAction(item.id, item.type, "approve")}
            onReject={() => handleAction(item.id, item.type, "reject")}
            />

              ))
            )}
          </Section>
  

        </div>
      </div>

      <Footer />
    </>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Section({ title, count, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4 border-l-4 border-primary">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {count !== undefined && (
          <span className="px-4 py-2 flex justify-between gap-3 rounded-xl bg-primary text-black font-semibold">
            <CircleCheckBig />{count} 
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className=" bg-white border-4 border-primary rounded-2xl shadow p-9 flex items-center gap-4 hover:shadow-xl transition-all duration-300">
      <div className="p-5 bg-primary rounded-xl text-black">
        {icon}
      </div>  
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}

function ApprovalRow({ name, role, onApprove, onReject }) {
  return (
    <div className="flex flex-col bg-gray-50 sm:flex-row sm:items-center sm:justify-between gap-4 border-3 border-primary rounded-xl p-4 hover:shadow-xl transition-all">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500 capitalize">{role} Registration</p>
      </div>

      <div className="flex gap-2">
        <ActionButton type="approve" onClick={onApprove} />
        <ActionButton type="reject" onClick={onReject} />
      </div>
    </div>
  );
}

function ActionButton({ type, onClick }) {
  const isApprove = type === "approve";

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition
        ${
          isApprove
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }
      `}
    >
      {isApprove ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {isApprove ? "Approve" : "Reject"}
    </button>
  );
}

