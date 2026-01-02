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
    user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    description TEXT,
    profile_image TEXT,
    expertise TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    hourly_rate NUMERIC(10, 2) NOT NULL CHECK (hourly_rate >= 0),
    rating NUMERIC(3, 2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INT DEFAULT 0 CHECK (review_count >= 0),
    is_verified BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_labelers_available ON labelers(is_available) WHERE is_available = TRUE;
CREATE INDEX IF NOT EXISTS idx_labelers_verified ON labelers(is_verified) WHERE is_verified = TRUE;
CREATE INDEX IF NOT EXISTS idx_labelers_expertise ON labelers USING GIN (to_tsvector('english', expertise));
CREATE INDEX IF NOT EXISTS idx_labelers_hourly_rate ON labelers(hourly_rate);
CREATE INDEX IF NOT EXISTS idx_labelers_rating ON labelers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_labelers_status ON labelers(status);
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


const createConversationsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS conversations (
      id SERIAL PRIMARY KEY,
      buyer_id INTEGER NOT NULL,
      seller_id INTEGER NOT NULL,
      dataset_id INTEGER,
      job_id INTEGER,
      subject VARCHAR(255),
      last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      
      CONSTRAINT fk_conversation_buyer
        FOREIGN KEY (buyer_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_conversation_seller
        FOREIGN KEY (seller_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
      CONSTRAINT unique_conversation UNIQUE (buyer_id, seller_id, dataset_id, job_id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_conversations_buyer ON conversations(buyer_id);
    CREATE INDEX IF NOT EXISTS idx_conversations_seller ON conversations(seller_id);
  `;

  try {
    await pool.query(query);
    console.log('Conversations table ready');
  } catch (err) {
    console.error('Error creating conversations table:', err);
  }
}

const createMessagesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      conversation_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      
      CONSTRAINT fk_message_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES conversations(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_message_sender
        FOREIGN KEY (sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
    
    CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
    CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
    CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
  `;

  try {
    await pool.query(query);
    console.log('Messages table ready');
  } catch (err) {
    console.error('Error creating messages table:', err);
  }
}


const createRolesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
  );

  `;

  try {
    await pool.query(query);
    console.log('Roles table ready');
  } catch (err) {
    console.error('Error creating roles table:', err);
  }
};

const addRoles = async () => {
  const query = `
    INSERT INTO roles (name) VALUES
    ('buyer'),
    ('seller'),
    ('labeler'),
    ('admin') ON CONFLICT (name) DO NOTHING;
  `;

  try {
    await pool.query(query);
  } catch (err) {
    console.error('Error creating roles:', err);
  }
};

const createUserrolesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_roles (
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      role_id INT REFERENCES roles(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, role_id)
    );
  `;

  try {
    await pool.query(query);
    console.log('UserRoles table ready');
  } catch (err) {
    console.error('Error creating UserRoles Table:', err);
  }
};


const createSellersTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS sellers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  organization VARCHAR(150),
  data_type VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  description TEXT,
  photo TEXT,

  status VARCHAR(20) DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    
  `;

  try {
    await pool.query(query);
    console.log('Sellers table ready');
  } catch (err) {
    console.error('Error creating sellers table:', err);
  }
}



const createDatasetTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS datasets (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  license TEXT,
  price NUMERIC(10,2) DEFAULT 0,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);    
  `;

  try {
    await pool.query(query);
    console.log('Dataset table ready');
  } catch (err) {
    console.error('Error creating Dataset table:', err);
  }
}


const createDatasetStatsTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS dataset_stats (
    dataset_id INTEGER PRIMARY KEY REFERENCES datasets(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    popularity_score NUMERIC(3,1) DEFAULT 0
  );

  `;

  try {
    await pool.query(query);
    console.log('Dataset Stats table ready');
  } catch (err) {
    console.error('Error creating Dataset Stats table:', err);
  }
}

const createDatasetFeedbackTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS dataset_feedback (
      id SERIAL PRIMARY KEY,
      dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id),
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );


  `;

  try {
    await pool.query(query);
    console.log('Dataset Feedback table ready');
  } catch (err) {
    console.error('Error creating Dataset Feedback table:', err);
  }
}


const createDatasetSampleTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS dataset_samples (
      id SERIAL PRIMARY KEY,
      dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
      record JSONB
    );
  `;

  try {
    await pool.query(query);
    console.log('Dataset Sample table ready');
  } catch (err) {
    console.error('Error creating Dataset Sample table:', err);
  }
}


createUsersTable();

createLabelsTable();

createJobsTable();

createDataReqTable();

createNotificationsTable();

createMessagesTable();

createConversationsTable();

createRolesTable();

addRoles();

createUserrolesTable();

createSellersTable();

createDatasetTable();

createDatasetStatsTable();

createDatasetFeedbackTable();

createDatasetSampleTable();

// UPDATE dataset_stats
// SET popularity_score = ROUND(
//   (downloads * 0.6 + views * 0.4) / 1000,
//   1
// );


