
import pool from "../config/db.js";
import path from "path";

export const getDatasets = async (req, res) => {
  const { category, q, sort } = req.query;
  let query = `
    SELECT d.*, 
           COALESCE(s.views, 0) as views, 
           COALESCE(s.downloads, 0) as downloads, 
           COALESCE(s.popularity_score, 0) as popularity_score
    FROM datasets d
    LEFT JOIN dataset_stats s ON s.dataset_id = d.id
    WHERE d.visibility = 'public' 
  `;
  
  const params = [];

  // Category Filter
  if (category && category !== 'All') {
    params.push(category);
    query += ` AND d.category = $${params.length}`;
  }

  // Search Filter (Title & Summary for better UX)
  if (q) {
    params.push(`%${q}%`);
    query += ` AND (d.title ILIKE $${params.length} OR d.summary ILIKE $${params.length})`;
  }

  // 3. Dynamic Sorting logic
  if (sort === 'newest') {
    query += " ORDER BY d.created_at DESC";
  } else if (sort === 'price_low') {
    query += " ORDER BY d.price ASC";
  } else {
    query += " ORDER BY s.popularity_score DESC NULLS LAST";
  }

  query += " LIMIT 30";

  try {
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Error retrieving datasets" });
  }
};

export const getDatasetDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Start all queries simultaneously
    const [datasetRes, feedbackRes, statsRes, samplesRes] = await Promise.all([
      pool.query(`
        SELECT d.*, s.views, s.downloads, s.popularity_score 
        FROM datasets d 
        LEFT JOIN dataset_stats s ON s.dataset_id = d.id 
        WHERE d.id = $1`, [id]),
      pool.query(`SELECT user_id, rating, comment FROM dataset_feedback WHERE dataset_id = $1`, [id]),
      pool.query(`SELECT * FROM dataset_stats WHERE dataset_id = $1`, [id]),
      pool.query(`SELECT record FROM dataset_samples WHERE dataset_id = $1 LIMIT 5`, [id])
    ]);

    // Handle case where dataset doesn't exist
    if (datasetRes.rows.length === 0) {
      return res.status(404).json({ message: "Dataset not found" });
    }
    pool.query(
          "UPDATE dataset_stats SET views = views + 1 WHERE dataset_id = $1", 
          [id]
        ).catch(err => console.error("Stats Update Error:", err));
    res.json({
      dataset: datasetRes.rows[0],
      feedback: feedbackRes.rows,
      stats: statsRes.rows[0] || {}, // Fallback if no stats exist yet
      samples: samplesRes.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching details" });
  }
};

export const uploadDataset = async (req, res) => {
  try {
    const {
      title, summary, description, category, tags,
      format, total_records, size_mb, source,
      update_frequency, license, citation, ethics_note,
      price, is_free, visibility,
    } = req.body;

    // 1. Correctly extract the file information
    const datasetFile = req.files?.file_path?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!datasetFile) {
      return res.status(400).json({ message: "Dataset file required" });
    }

    // 2. Prepare the values for SQL (Strings, not Objects)
    const datasetPath = datasetFile.path;
    const thumbnailPath = thumbnailFile ? thumbnailFile.path : null;
    const parsedTags = tags ? tags.split(",").map(t => t.trim()) : [];
    
    // 3. Convert stringified form data back to types
    const numericPrice = is_free === 'true' ? 0 : parseFloat(price || 0);
    const boolIsFree = is_free === 'true';

    const result = await pool.query(
      `INSERT INTO datasets (
        title, summary, description, category, tags,
        format, total_records, size_mb, source,
        update_frequency, license, citation, ethics_note,
        price, is_free, visibility,
        file_path, thumbnail,
        created_by, owner_name
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
      RETURNING *`,
      [
        title, summary, description, category, parsedTags,
        format, parseInt(total_records || 0), parseInt(size_mb || 0), source,
        update_frequency, license, citation, ethics_note,
        numericPrice, boolIsFree, visibility,
        datasetPath, thumbnailPath,
        req.user.id, req.user.name
      ]
    );
    

    res.status(201).json({ message: "Success", dataset: result.rows[0] });
  } catch (err) {
    console.error("DATABASE ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
export const searchDatasets = async (req, res) => {
  try {
    const { q, category, price, license, sort, time } = req.query;

    let query = `
      SELECT d.*, 
             COALESCE(s.popularity_score, 0) as popularity_score, 
             COALESCE(s.downloads, 0) as downloads,
             COALESCE(s.views, 0) as views
      FROM datasets d
      LEFT JOIN dataset_stats s ON d.id = s.dataset_id
      WHERE d.visibility = 'public'
    `;

    const values = [];
    let idx = 1;

    // 🔍 Search by title / summary / tags
// 🔍 Search by title / summary / tags
if (q) {
  // Define the index first
  const idx_clean = idx; 
  
  query += ` AND (d.title ILIKE $${idx} OR d.summary ILIKE $${idx} OR $${idx_clean} = ANY(d.tags))`;
  
  values.push(`%${q}%`);
  idx++;
}

    // 📂 Category filter
    if (category && category !== "All datasets") {
      query += ` AND d.category = $${idx}`;
      values.push(category);
      idx++;
    }

    // 💰 Price filter
    if (price === "free") query += ` AND d.is_free = true`;
    else if (price === "paid") query += ` AND d.is_free = false`;

    // 📜 License filter
    if (license) {
      query += ` AND d.license = $${idx}`;
      values.push(license);
      idx++;
    }

    // ⏱ Sorting logic
    if (sort === "popular") query += ` ORDER BY s.popularity_score DESC NULLS LAST`;
    else if (sort === "downloads") query += ` ORDER BY s.downloads DESC NULLS LAST`;
    else if (time === "latest") query += ` ORDER BY d.created_at DESC`;
    else if (time === "oldest") query += ` ORDER BY d.created_at ASC`;
    else query += ` ORDER BY d.created_at DESC`; // Default

    query += " LIMIT 50";

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Failed to search datasets" });
  }
};









export const downloadDataset = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Find the dataset file path in the database
    const result = await pool.query('SELECT file_path FROM datasets WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Dataset record not found" });
    }

    const relativePath = result.rows[0].file_path; // e.g., "uploads/datasets/file.zip"
    const absolutePath = path.resolve(relativePath);

    // 2. Return the URL or stream the file
    // For now, let's return the URL as your frontend expects
    res.json({ 
      success: true, 
      url: `http://localhost:3000/${relativePath}` 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during download" });
  }
};
