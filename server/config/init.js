import pool from './db.js';

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Users table ready');
  } catch (err) {
    console.error('Error creating users table:', err);
  }
};

const createLabelsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS labelers (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      profile_image TEXT,
      expertise TEXT NOT NULL,
      hourly_rate NUMERIC(10,2) NOT NULL,
      rating NUMERIC(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
      review_count INT DEFAULT 0,
      is_verified BOOLEAN DEFAULT FALSE,
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  try {
    await pool.query(query);
    console.log('Labelers table ready');
  } catch (err) {
    console.error('Error creating labelers table:', err);
  }
}

createUsersTable();

createLabelsTable();