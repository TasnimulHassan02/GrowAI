import {
  createNotification,
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../models/notificationModel.js";
import { findUserById } from "../models/userModel.js";
import { sendNotificationEmail } from "../utils/emailService.js";

// Helper function to create and send notification
export const sendNotification = async (userId, type, title, message, relatedId = null, relatedType = null) => {
  try {
    // Create notification in database
    const notification = await createNotification(userId, type, title, message, relatedId, relatedType);
    
    // Get user email
    const user = await findUserById(userId);
    if (user && user.email) {
      // Send email notification
      const emailResult = await sendNotificationEmail(user.email, user.name, {
        type,
        title,
        message,
      });
      
    //   if (emailResult.success) {
    //     await updateEmailSentStatus(notification.id);
    //   }
    }
    
    return notification;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

// Get user's notifications
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const notifications = await getUserNotifications(userId, limit, offset);
    const unreadCount = await getUnreadNotificationCount(userId);

    res.status(200).json({
      notifications,
      unreadCount,
      total: notifications.length,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const notification = await markNotificationAsRead(id, userId);
    
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Mark notification as read error:", error);
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;

    await markAllNotificationsAsRead(userId);

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    res.status(500).json({ message: "Failed to update notifications" });
  }
};

// Get unread count
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const count = await getUnreadNotificationCount(userId);

    res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error("Get unread count error:", error);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};

