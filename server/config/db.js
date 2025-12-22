import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("select 1")
  .then(() => console.log("✅ Supabase DB connected"))
  .catch(err => console.error("❌ DB connection failed", err));

export default pool;
