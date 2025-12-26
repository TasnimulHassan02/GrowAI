import pool from './db.js';

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255),
      google_id TEXT UNIQUE,
      auth_provider TEXT DEFAULT 'local',
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


const createJobsTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  task_type TEXT NOT NULL,
  dataset_size TEXT NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  budget NUMERIC(10, 2) NOT NULL,
  contact VARCHAR(200),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in-progress', 'completed')),
  requester_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Foreign key constraint to users table
  CONSTRAINT fk_requester
    FOREIGN KEY (requester_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
  );
`;

  try {
    await pool.query(query);
    console.log('Jobs table ready');
  } catch (err) {
    console.error('Error creating jobs table:', err);
  }
}


const createDataReqTable = async () => {
  const query = `
 CREATE TABLE IF NOT EXISTS dataset_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  data_type VARCHAR(50),
  quantity INTEGER,
  format VARCHAR(50),
  deadline DATE,
  budget NUMERIC(10,2),
  status VARCHAR(30) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`;

  try {
    await pool.query(query);
    console.log('Dataset Request table ready');
  } catch (err) {
    console.error('Error creating Dataset Request table:', err);
  }
}

const createNotificationsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      type VARCHAR(50) NOT NULL CHECK (type IN ('purchase', 'upload_approval', 'upload_rejected', 'dataset_update', 'message', 'job_update', 'general')),
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      related_id INTEGER,
      related_type VARCHAR(50),
      is_read BOOLEAN DEFAULT FALSE,
      email_sent BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      
      CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
    
  `;

  try {
    await pool.query(query);
    console.log('Notifications table ready');
  } catch (err) {
    console.error('Error creating notifications table:', err);
  }
}

createUsersTable();

createLabelsTable();

createJobsTable();

createDataReqTable();

createNotificationsTable();



