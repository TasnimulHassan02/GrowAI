import pool from "../config/db.js";

export const findSellerByUserId = (userId) => {
  return pool.query(
    "SELECT id FROM sellers WHERE user_id = $1",
    [userId]
  );
};

export const createSeller = (data) => {
  const {
    user_id,
    full_name,
    phone,
    organization,
    data_type,
    payment_method,
    description,
    photo,
  } = data;

  return pool.query(
    `INSERT INTO sellers
     (user_id, full_name, phone, organization, data_type, payment_method, description, photo)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      user_id,
      full_name,
      phone,
      organization,
      data_type,
      payment_method,
      description,
      photo,
    ]
  );
};
