import { useEffect, useState } from "react";
import { fetchProfile, updateProfile, changePassword } from "../api/profileApi";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { fetchAdminStats } from "../../admin/api/adminApi"; 
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Package,
  Upload,
  Brush,
  TrendingUp,
  Briefcase,
  Users,
  Database,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    roles: [],
    auth: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          roles: data.roles || [],
          auth: data.auth_provider || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

   useEffect(() => {
      const loadDashboard = async () => {
        setLoadingAdmin(true);
        try {
          const [statsData] = await Promise.all([
            fetchAdminStats(),
          ]);
  
          setStats(statsData);
        } catch (err) {
          console.error("Admin dashboard error:", err);
        } finally {
        setLoadingAdmin(false);
        };
    }
      loadDashboard();
    }, []);

  const handleProfileUpdate = async () => {
    if (!profile.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdatingProfile(true);
    try {
      await updateProfile({ name: profile.name.trim() });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    setUpdatingPassword(true);
    try {
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password";
      toast.error(msg);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const isGoogleUser = profile.auth === "google";
  const userRoles = profile.roles || [];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              My Profile & Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need in one place — profile, security, and your dashboard
            </p>
          </div>

            {/* Role-Based Dashboard Summary */}
              {userRoles.length > 0 && (
                <div>


                  <div className="grid grid-cols-1 mb-20 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Buyer Dashboard Summary */}
                    {userRoles.includes("buyer") && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl p-8 border border-blue-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-blue-600 rounded-2xl">
                            <Package className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-blue-900">Buyer</h3>
                            <p className="text-blue-700">Purchase Datasets</p>
                          </div>
                        </div>
                        <ul className="space-y-3 text-blue-800 mb-6">
                          <li className="flex items-center gap-2">
                            <Package size={18} /> 12 Purchased Datasets
                          </li>
                          <li className="flex items-center gap-2">
                            <TrendingUp size={18} /> $450 Total Spent
                          </li>
                          <li className="flex items-center gap-2">
                            <Briefcase size={18} /> 3 Active Requests
                          </li>
                        </ul>
                        <Link
                          to="/purchases"
                          className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition"
                        >
                          Go to Buyer Dashboard →
                        </Link>
                      </div>
                    )}

                    {/* Seller Dashboard Summary */}
                    {userRoles.includes("seller") && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl p-8 border border-green-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-green-600 rounded-2xl">
                            <Upload className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-green-900">Seller</h3>
                            <p className="text-green-700">Upload & Monetize Data</p>
                          </div>
                        </div>
                        <ul className="space-y-3 text-green-800 mb-6">
                          <li className="flex items-center gap-2">
                            <Database size={18} /> 8 Active Datasets
                          </li>
                          <li className="flex items-center gap-2">
                            <TrendingUp size={18} /> $1,240 Earnings This Month
                          </li>
                          <li className="flex items-center gap-2">
                            <Users size={18} /> 142 Downloads
                          </li>
                        </ul>
                        <Link
                          to="/seller/datasets"
                          className="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl transition"
                        >
                          Go to Seller Dashboard →
                        </Link>
                      </div>
                    )}

                    {/* Labeler Dashboard Summary */}
                    {userRoles.includes("labeler") && (
                      <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl shadow-xl p-8 border border-purple-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-purple-600 rounded-2xl">
                            <Brush className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-purple-900">Labeler</h3>
                            <p className="text-purple-700">Annotate & Earn</p>
                          </div>
                        </div>
                        <ul className="space-y-3 text-purple-800 mb-6">
                          <li className="flex items-center gap-2">
                            <Briefcase size={18} /> 5 Active Jobs
                          </li>
                          <li className="flex items-center gap-2">
                            <TrendingUp size={18} /> $680 Earnings
                          </li>
                          <li className="flex items-center gap-2">
                            <Users size={18} /> 4.8★ Rating (28 reviews)
                          </li>
                        </ul>
                        <Link
                          to="/labeler/jobs"
                          className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl transition"
                        >
                          Go to Labeler Dashboard →
                        </Link>
                      </div>
                    )}

                    {/* Admin Dashboard Summary */}
                    {userRoles.includes("admin") && stats && (
                      <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-3xl shadow-xl p-8 border border-red-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-red-600 rounded-2xl">
                            <Shield className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-red-900">Administrator</h3>
                            <p className="text-red-700">Platform Management</p>
                          </div>
                        </div>
                        <ul className="space-y-3 text-red-800 mb-6">
                          <li className="flex items-center gap-2">
                            <Users size={18} /> {stats.users} Total users
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield size={18} /> {stats.pending} pending approvals
                          </li>
                          <li className="flex items-center gap-2">
                            <TrendingUp size={18} /> ${stats.revenue} Revenue
                          </li>
                        </ul>
                        <Link
                          to="/admin/dashboard"
                          className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-2xl transition"
                        >
                          Open Admin Panel →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

          {loadingProfile ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading your profile and dashboard...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Personal Information */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-primary p-6">
                  <h2 className="text-2xl font-bold text-black">Personal Information</h2>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-gray-50 text-gray-600"
                    />
                    <p className="mt-2 text-sm text-gray-500">Email cannot be changed.</p>
                  </div>

                  <button
                    onClick={handleProfileUpdate}
                    disabled={updatingProfile}
                    className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                      updatingProfile
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-primary hover:bg-green-600 text-black shadow-lg hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {updatingProfile ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></span>
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </div>



              {/* Password & Security */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <h2 className="text-2xl font-bold text-white">Password & Security</h2>
                </div>
                <div className="p-8">
                  {isGoogleUser ? (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-10 text-center">

                      <h3 className="text-2xl font-bold text-blue-900 mb-4">
                        Signed in with Google
                      </h3>
                      <p className="text-blue-800 text-lg mb-8 max-w-md mx-auto">
                        Your account is securely protected by Google. Password management is handled through your Google Account.
                      </p>
                      <a
                        href="https://myaccount.google.com/security"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all hover:shadow-2xl"
                      >
                        Manage Google Security
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6 max-w-lg mx-auto">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwords.currentPassword}
                          onChange={(e) =>
                            setPasswords({ ...passwords, currentPassword: e.target.value })
                          }
                          className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwords.newPassword}
                          onChange={(e) =>
                            setPasswords({ ...passwords, newPassword: e.target.value })
                          }
                          className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition"
                        />
                      </div>

                      <button
                        onClick={handlePasswordChange}
                        disabled={updatingPassword}
                        className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                          updatingPassword
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                        }`}
                      >
                        {updatingPassword ? (
                          <>
                            <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></span>
                            Changing Password...
                          </>
                        ) : (
                          "Change Password"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}