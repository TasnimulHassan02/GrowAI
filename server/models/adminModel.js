import pool from "../config/db.js";

/* ---------- STATS ---------- */
export const fetchAdminStats = async () => {
  const users = await pool.query("SELECT COUNT(*) FROM users");
  const sellers = await pool.query("SELECT COUNT(*) FROM sellers");
  const labelers = await pool.query("SELECT COUNT(*) FROM labelers");
  // const datasets = await pool.query("SELECT COUNT(*) FROM datasets");
  const sellCount = await pool.query(
    "SELECT COUNT(*) FROM sellers WHERE status = 'pending'"
  );
    const labelCount = await pool.query(
    "SELECT COUNT(*) FROM labelers WHERE status = 'pending'"
  );
  const datasetcount = 100;

  const totalCount = Number(sellCount.rows[0].count) + Number(labelCount.rows[0].count)


  return {
    users: Number(users.rows[0].count),
    datasets: 100,
    pending: totalCount,
    revenue: 120520,
    sellers: Number(sellers.rows[0].count),
    labelers: Number(labelers.rows[0].count),
    // datasets: Number(datasets.rows[0].count),
  };
};


export const updateSellerStatus = async (id, status) => {
  await pool.query(
    "UPDATE sellers SET status = $1 WHERE id = $2",
    [status, id]
  );
};

export const updateLabelerStatus = async (id, status) => {
  await pool.query(
    "UPDATE labelers SET status = $1 WHERE id = $2",
    [status, id]
  );
};

export const updateDatasetStatus = async (id, status) => {
  await pool.query(
    "UPDATE datasets SET status = $1 WHERE id = $2",
    [status, id]
  );
};

export const getAllPendingApprovals = async () => {
  const sellers = await pool.query(`
    SELECT 
      id,
      full_name AS name,
      'seller' AS type
    FROM sellers
    WHERE status = 'pending'
  `);

  const labelers = await pool.query(`
    SELECT
      id,
      full_name AS name,
      'labeler' AS type
    FROM labelers
    WHERE status = 'pending'
  `);

  // const datasets = await pool.query(`
  //   SELECT
  //     id,
  //     title AS name,
  //     'dataset' AS type
  //   FROM datasets
  //   WHERE status = 'pending'
  // `);

  return [
    ...sellers.rows,
    ...labelers.rows,
    // ...datasets.rows,
  ];
};
