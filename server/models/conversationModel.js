import pool from "../config/db.js";

export const createOrGetConversation = async (buyerId, sellerId, datasetId = null, jobId = null, subject = null) => {
  // First, try to find existing conversation
  let query = `
    SELECT * FROM conversations
    WHERE buyer_id = $1 AND seller_id = $2
  `;
  const params = [buyerId, sellerId];
  
  if (datasetId) {
    query += ` AND dataset_id = $3`;
    params.push(datasetId);
  } else if (jobId) {
    query += ` AND job_id = $4`;
    params.push(jobId);
  } else {
    query += ` AND dataset_id IS NULL AND job_id IS NULL`;
  }
  
  const existing = await pool.query(query, params);
  
  if (existing.rows.length > 0) {
    return existing.rows[0];
  }
  
  // Create new conversation
  const insertQuery = `
    INSERT INTO conversations (buyer_id, seller_id, dataset_id, job_id, subject)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const { rows } = await pool.query(insertQuery, [buyerId, sellerId, datasetId, jobId, subject]);
  return rows[0];
};

export const getUserConversations = async (userId) => {
  const query = `
    SELECT 
      c.*,
      CASE 
        WHEN c.buyer_id = $1 THEN u2.name
        ELSE u1.name
      END as other_user_name,
      CASE 
        WHEN c.buyer_id = $1 THEN u2.email
        ELSE u1.email
      END as other_user_email,
      CASE 
        WHEN c.buyer_id = $1 THEN u2.id
        ELSE u1.id
      END as other_user_id,
      (
        SELECT message 
        FROM messages 
        WHERE conversation_id = c.id 
        ORDER BY created_at DESC 
        LIMIT 1
      ) as last_message,
      (
        SELECT created_at 
        FROM messages 
        WHERE conversation_id = c.id 
        ORDER BY created_at DESC 
        LIMIT 1
      ) as last_message_time,
      (
        SELECT COUNT(*) 
        FROM messages 
        WHERE conversation_id = c.id 
        AND sender_id != $1 
        AND is_read = FALSE
      ) as unread_count
    FROM conversations c
    LEFT JOIN users u1 ON c.buyer_id = u1.id
    LEFT JOIN users u2 ON c.seller_id = u2.id
    WHERE c.buyer_id = $1 OR c.seller_id = $1
    ORDER BY c.last_message_at DESC
  `;
  
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const getConversationById = async (conversationId, userId) => {
  const query = `
    SELECT 
      c.*,
      CASE 
        WHEN c.buyer_id = $2 THEN u2.name
        ELSE u1.name
      END as other_user_name,
      CASE 
        WHEN c.buyer_id = $2 THEN u2.email
        ELSE u1.email
      END as other_user_email,
      CASE 
        WHEN c.buyer_id = $2 THEN u2.id
        ELSE u1.id
      END as other_user_id
    FROM conversations c
    LEFT JOIN users u1 ON c.buyer_id = u1.id
    LEFT JOIN users u2 ON c.seller_id = u2.id
    WHERE c.id = $1 AND (c.buyer_id = $2 OR c.seller_id = $2)
  `;
  
  const { rows } = await pool.query(query, [conversationId, userId]);
  return rows[0];
};

export const updateConversationLastMessage = async (conversationId) => {
  const query = `
    UPDATE conversations
    SET last_message_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [conversationId]);
  return rows[0];
};

