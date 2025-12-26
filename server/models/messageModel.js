import pool from "../config/db.js";

export const createMessage = async (conversationId, senderId, message) => {
  const query = `
    INSERT INTO messages (conversation_id, sender_id, message)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [conversationId, senderId, message]);
  return rows[0];
};

export const getConversationMessages = async (conversationId, userId, limit = 50, offset = 0) => {
  // First verify user has access to this conversation
  const verifyQuery = `
    SELECT id FROM conversations
    WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)
  `;
  const verify = await pool.query(verifyQuery, [conversationId, userId]);
  
  if (verify.rows.length === 0) {
    throw new Error("Unauthorized access to conversation");
  }
  
  // Mark messages as read when fetching
  await pool.query(`
    UPDATE messages
    SET is_read = TRUE
    WHERE conversation_id = $1 AND sender_id != $2 AND is_read = FALSE
  `, [conversationId, userId]);
  
  // Get messages
  const query = `
    SELECT 
      m.*,
      u.name as sender_name,
      u.email as sender_email
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.conversation_id = $1
    ORDER BY m.created_at ASC
    LIMIT $2 OFFSET $3
  `;
  
  const { rows } = await pool.query(query, [conversationId, limit, offset]);
  return rows;
};

export const getUnreadMessageCount = async (userId) => {
  const query = `
    SELECT COUNT(*) as count
    FROM messages m
    JOIN conversations c ON m.conversation_id = c.id
    WHERE (c.buyer_id = $1 OR c.seller_id = $1)
    AND m.sender_id != $1
    AND m.is_read = FALSE
  `;
  
  const { rows } = await pool.query(query, [userId]);
  return parseInt(rows[0].count);
};

