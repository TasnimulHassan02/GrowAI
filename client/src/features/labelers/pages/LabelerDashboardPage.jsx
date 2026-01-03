import { useEffect, useState } from "react";
import axios from "axios";
import { Play, Calendar, Database, DollarSign } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function LabelerDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/jobs/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error loading tasks", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Labeling Tasks</h1>
            <p className="text-gray-600 mt-1">
              Track and work on datasets you've been assigned
            </p>
          </div>

          {/* Empty State */}
          {tasks.length === 0 ? (
            <div className="bg-white border-2 border-dashed rounded-2xl p-12 text-center">
              <h3 className="text-xl font-semibold mb-2">
                No active tasks yet
              </h3>
              <p className="text-gray-500 mb-6">
                Browse the marketplace and claim labeling jobs to get started.
              </p>
              <a
                href="/marketplace"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600"
              >
                Find Jobs
              </a>
            </div>
          ) : (
            <div className="grid gap-6">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}
function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-primary shadow-sm hover:shadow-md transition">
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">
            {task.task_type}
          </h3>
          <p className="text-lg text-gray-500">
            Job ID: #{task.id}
          </p>
        </div>

        <StatusBadge status={task.status} />
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg mb-6">
        <Meta icon={<Calendar size={16} />} label="Deadline" value={new Date(task.deadline).toLocaleDateString()} />
        <Meta icon={<Database size={16} />} label="Dataset Size" value={`${task.dataset_size} samples`} />
        <Meta icon={<DollarSign size={16} />} label="Budget" value={`$${task.budget}`} />
        <Meta icon={<Database size={16} />} label="Task Type" value={task.task_type} />
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600">
          <Play size={18} />
          Start Task
        </button>
      </div>
    </div>
  );
}
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}
function Meta({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-green-600">{icon}</div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
