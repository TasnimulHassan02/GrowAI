import pool from "../config/db.js";

export const createNotification = async (userId, type, title, message, relatedId = null, relatedType = null) => {
  const query = `
    INSERT INTO notifications (user_id, type, title, message, related_id, related_type)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [userId, type, title, message, relatedId, relatedType]);
  return rows[0];
};

export const getUserNotifications = async (userId, limit = 50, offset = 0) => {
  const query = `
    SELECT 
      id,
      type,
      title,
      message,
      related_id,
      related_type,
      is_read,
      created_at
    FROM notifications
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
  
  const { rows } = await pool.query(query, [userId, limit, offset]);
  return rows;
};

export const getUnreadNotificationCount = async (userId) => {
  const query = `
    SELECT COUNT(*) as count
    FROM notifications
    WHERE user_id = $1 AND is_read = FALSE
  `;
  
  const { rows } = await pool.query(query, [userId]);
  return parseInt(rows[0].count);
};

export const markNotificationAsRead = async (notificationId, userId) => {
  const query = `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [notificationId, userId]);
  return rows[0];
};

export const markAllNotificationsAsRead = async (userId) => {
  const query = `
    UPDATE notifications
    SET is_read = TRUE
    WHERE user_id = $1 AND is_read = FALSE
    RETURNING COUNT(*)
  `;
  
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

export const updateEmailSentStatus = async (notificationId) => {
  const query = `
    UPDATE notifications
    SET email_sent = TRUE
    WHERE id = $1
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [notificationId]);
  return rows[0];
};


