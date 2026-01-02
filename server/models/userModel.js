import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
   `SELECT id, name, email, password, google_id FROM users WHERE email = $1`,
    [email]
  );
  return rows[0];
};


export const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, auth_provider, created_at FROM users WHERE id = $1",
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

export const updateUser = async (googleId, email) => {
  const { rows } = await pool.query(
    ` UPDATE users
      SET google_id = $1,
      auth_provider = 'both'
      WHERE email = $2
      RETURNING id, name, email`,
      [googleId, email]
  );
  return rows[0];
};

export const createGoogleUser = async (name, email, googleId) => {
  const { rows } = await pool.query( `
    INSERT INTO users (name, email, google_id, auth_provider)
    VALUES ($1, $2, $3, 'google')
    RETURNING id, name, email
    `,
    [name, email, googleId]
  );
  return rows[0];
};


export const assignRoleToUser = async (userId, roleName) => {
  const roleResult = await pool.query(
    "SELECT id FROM roles WHERE name = $1",
    [roleName]
  );

  if (roleResult.rows.length === 0) {
    throw new Error("Role not found");
  }

  const roleId = roleResult.rows[0].id;

  await pool.query(
    "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
    [userId, roleId]
  );
};


/* ---------- FIND USER WITH PASSWORD ---------- */
export const findUserWithPassword = async (id) => {
  const res = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0];
};

/* ---------- UPDATE PROFILE ---------- */
export const updateUserProfile = async (id, name, email) => {
  const res = await pool.query(
    `UPDATE users
     SET name = $1, email = $2
     WHERE id = $3
     RETURNING id, name, email`,
    [name, email, id]
  );
  return res.rows[0];
};

/* ---------- UPDATE PASSWORD ---------- */
export const updateUserPassword = async (id, hashedPassword) => {
  await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, id]
  );
};


export const fetchUserProfile = async (userId) => {
  const query = `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.auth_provider,
      u.created_at,
      COALESCE(
        json_agg(r.name) FILTER (WHERE r.name IS NOT NULL), 
        '[]'
      ) AS roles
    FROM users u
    LEFT JOIN user_roles ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    WHERE u.id = $1
    GROUP BY u.id
  `;

  const { rows } = await pool.query(query, [userId]);
  return rows[0] || null;
};