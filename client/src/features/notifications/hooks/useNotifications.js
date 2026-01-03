import { useState, useEffect } from "react";
import { getNotifications, getUnreadCount } from "../api/notificationService";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      setNotifications(response.data.notifications || []);
      setUnreadCount(response.data.unreadCount || 0);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notifications");
      console.error("Fetch notifications error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadCount();
      setUnreadCount(response.data.unreadCount || 0);
    } catch (err) {
      console.error("Fetch unread count error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refetch: fetchNotifications,
    refetchUnreadCount: fetchUnreadCount,
  };
};

