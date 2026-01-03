import pool from "../config/db.js";

// Create a new labeling job request
export const createJobRequest = async (req, res) => {
  const client = await pool.connect();
  try {
    const { taskType, datasetSize, deadline, budget, description, contact, status, labeler_id } = req.body;
    const userId = req.user?.id;

    // 1. COUNT YOUR COLUMNS (There are 9 here)
    const query = `
      INSERT INTO jobs (
        task_type,      
        dataset_size,   
        deadline,       
        budget,         
        description,  
        contact,  
         
        status,         
        requester_id,  
        
        labeler_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    // 2. COUNT YOUR VALUES (Must match the number of $ placeholders)
// ... inside createJobRequest
const values = [
  taskType.trim(),          // $1
  datasetSize.trim(),       // $2
  deadline,                 // $3
  parseFloat(budget),       // $4
  description.trim(),       // $5
  contact,
  status ? 'assigned' : 'pending', // $7 <-- Use labeler_id here, not 'state'
    userId,                   // $6
  labeler_id || null        // $9
];

    const result = await client.query(query, values);
    res.status(201).json({ message: "Job created!", job: result.rows[0] });

  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Failed to submit job request" });
  } finally {
    client.release();
  }
};

// Get current user's job requests
export const getMyJobs = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const query = `
      SELECT 
        id, 
        task_type, 
        dataset_size, 
        deadline, 
        budget, 
        description, 
        status, 
        created_at, 
        updated_at
      FROM jobs
      WHERE requester_id = $1
      ORDER BY created_at DESC
    `;

    const result = await client.query(query, [userId]);
    const jobs = result.rows;

    res.json({
      message: "Jobs fetched successfully",
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Failed to fetch your jobs" });
  } finally {
    client.release();
  }
};


// Get single job by ID 
export const getJobById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    
    // Check if ID is a valid number to prevent Postgres errors
    if (isNaN(id)) return res.status(400).json({ message: "Invalid Job ID" });

    const query = `
      SELECT j.*, u.username as requester_name 
      FROM jobs j
      JOIN users u ON j.requester_id = u.id
      WHERE j.id = $1
    `;

    const result = await client.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  } finally {
    client.release();
  }
};


export const getAllLabelingRequests = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        task_type,
        dataset_size,
        deadline,
        budget,
        description,
        requester_id,
        contact,
        status,
        created_at
      FROM jobs
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch labeling requests" });
  }
};
// Get jobs that the current user (Labeler) is working on
export const getMyLabelingTasks = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user?.id; // The Labeler's ID from the token

    const query = `
      SELECT * FROM jobs 
      WHERE labeler_id = $1 
      ORDER BY updated_at DESC
    `;

    const result = await client.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching labeling tasks:", error);
    res.status(500).json({ message: "Failed to fetch your tasks" });
  } finally {
    client.release();
  }
};