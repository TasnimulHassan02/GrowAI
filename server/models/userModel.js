import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, password FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const createUser = async (name, email, hashedPassword) => {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, hashedPassword]
  );
  return rows[0];
};

export const getAllUsers = async () => {
  const { rows } = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
  );
  return rows;
};
