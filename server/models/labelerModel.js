import pool from "../config/db.js";

export const getAllLabelers = async () => {
const query = `
    SELECT
      id,
      full_name,
      expertise,
      hourly_rate,
      rating,
      review_count,
      is_verified,
      profile_image
    FROM labelers 
    WHERE status = 'approved'
    ORDER BY rating DESC
  `;

  const { rows } = await pool.query(query);
  return rows;
};

export const findLabelerByUserId = async (userId) => {
  return pool.query(
    "SELECT * FROM labelers WHERE user_id = $1",
    [userId]
  );
};

export const createLabeler = async ({
  user_id,
  full_name,
  phone,
  description,
  profile_image,
  expertise,
  payment_method,
  hourly_rate,
}) => {
  return pool.query(
    `INSERT INTO labelers (
        user_id,
        full_name,
        phone,
        description,
        profile_image,
        expertise,
        payment_method,
        hourly_rate
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      user_id,
      full_name,
      phone,
      description,
      profile_image,
      expertise,
      payment_method,
      hourly_rate,
    ]
  );
};


