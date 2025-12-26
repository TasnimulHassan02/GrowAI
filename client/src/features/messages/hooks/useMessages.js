import { useState, useEffect } from "react";
import { getConversations, getUnreadMessageCount } from "../api/messageService";

export const useMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await getConversations();
      setConversations(response.data.conversations || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch conversations");
      console.error("Fetch conversations error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadMessageCount();
      setUnreadCount(response.data.unreadCount || 0);
    } catch (err) {
      console.error("Fetch unread count error:", err);
    }
  };

  useEffect(() => {
    fetchConversations();
    fetchUnreadCount();
    
    // Poll for new messages every 10 seconds
    const interval = setInterval(() => {
      fetchConversations();
      fetchUnreadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    conversations,
    unreadCount,
    loading,
    error,
    refetch: fetchConversations,
    refetchUnreadCount: fetchUnreadCount,
  };
};

