import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNotifications } from "../hooks/useNotifications";
import { markAsRead, markAllAsRead } from "../api/notificationService";
import { Bell, Check, CheckCheck } from "lucide-react";

function NotificationsPage() {
  const { notifications, unreadCount, loading, refetch } = useNotifications();
  const [filter, setFilter] = useState("all"); // all, unread, read

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      refetch();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      refetch();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "purchase":
        return "💰";
      case "upload_approval":
        return "✅";
      case "upload_rejected":
        return "❌";
      case "dataset_update":
        return "📊";
      case "message":
        return "💬";
      case "job_update":
        return "📝";
      default:
        return "🔔";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.is_read;
    if (filter === "read") return notif.is_read;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading notifications...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="btn btn-primary btn-sm gap-2"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === "all"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === "unread"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === "read"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Read
            </button>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  {filter === "unread"
                    ? "No unread notifications"
                    : filter === "read"
                    ? "No read notifications"
                    : "No notifications yet"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    !notification.is_read
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{notification.title}</h3>
                          <p className="text-gray-700">{notification.message}</p>
                        </div>
                        {!notification.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="ml-4 p-2 hover:bg-white rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-5 h-5 text-gray-400 hover:text-primary" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-3">
                        {formatTime(notification.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NotificationsPage;

