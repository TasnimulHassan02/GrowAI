import pool from "../config/db.js";

export const createDatasetRequest = async (userId, data) => {
  const {
    title,
    description,
    dataType,
    quantity,
    format,
    deadline,
    budget,
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO dataset_requests
     (user_id, title, description, data_type, quantity, format, deadline, budget)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      userId,
      title,
      description,
      dataType,
      quantity,
      format,
      deadline,
      budget,
    ]
  );

  return rows[0];
};

export const getAllRequests = async () => {
  const { rows } = await pool.query(
    `SELECT dr.*, u.name AS buyer_name
     FROM dataset_requests dr
     JOIN users u ON dr.user_id = u.id
     ORDER BY dr.created_at DESC`
  );
  return rows;
};
