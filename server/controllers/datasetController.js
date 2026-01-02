
import pool from "../config/db.js";

export const getDatasets = async (req, res) => {
  const { category, q } = req.query;

  let query = `
    SELECT d.*, s.views, s.downloads, s.popularity_score
    FROM datasets d
    JOIN dataset_stats s ON s.dataset_id = d.id
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    params.push(category);
    query += ` AND d.category = $${params.length}`;
  }

  if (q) {
    params.push(`%${q}%`);
    query += ` AND d.title ILIKE $${params.length}`;
  }

  query += " ORDER BY s.popularity_score DESC LIMIT 12";

  const { rows } = await pool.query(query, params);
  res.json(rows);
};


export const getDatasetDetails = async (req, res) => {
  const { id } = req.params;

  const dataset = await pool.query(
    `SELECT d.*, s.*
     FROM datasets d
     JOIN dataset_stats s ON s.dataset_id = d.id
     WHERE d.id = $1`,
    [id]
  );

  const feedback = await pool.query(
    `SELECT rating, comment FROM dataset_feedback WHERE dataset_id = $1`,
    [id]
  );
  
  const stats = await pool.query(
    "SELECT * FROM dataset_stats WHERE dataset_id = $1",
    [id]
  );

  const samples = await pool.query(
    `SELECT record FROM dataset_samples WHERE dataset_id = $1 LIMIT 5`,
    [id]
  );

  res.json({
    dataset: dataset.rows[0],
    feedback: feedback.rows,
     stats: stats.rows[0],
    samples: samples.rows,
  });
};

