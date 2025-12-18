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
    ORDER BY rating DESC
  `;

  const { rows } = await pool.query(query);
  return rows;
};

