import pool from "../config/db.js";

// Create a new labeling job request
export const createJobRequest = async (req, res) => {
  const client = await pool.connect();
  try {
    const { taskType, datasetSize, deadline, budget, description, contact } = req.body;

    if (!taskType || !datasetSize || !deadline || !budget || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const userId = req.user?.userId; //
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    
    const query = `
      INSERT INTO jobs (task_type, dataset_size, deadline, budget, description, requester_id, status, contact)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7)
      RETURNING 
        id, 
        task_type, 
        dataset_size, 
        deadline, 
        budget, 
        description, 
        status,
        contact 
        created_at
    `;
    
    const values = [
      taskType.trim(),
      datasetSize.trim(),
      deadline,
      parseFloat(budget),
      description.trim(),
      userId,
      contact
    ];

    const result = await client.query(query, values);
    const job = result.rows[0];

    res.status(201).json({
      message: "Job request submitted successfully!",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    if (error.code === "23503") { // Foreign key violation
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (error.code === "23502") { // NOT NULL violation
      return res.status(400).json({ message: "Missing required field" });
    }

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

// Get single job by ID (owned by user)
export const getJobById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
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
      WHERE id = $1 AND requester_id = $2
    `;

    const result = await client.query(query, [parseInt(id), userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Job not found or access denied" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  } finally {
    client.release();
  }
};