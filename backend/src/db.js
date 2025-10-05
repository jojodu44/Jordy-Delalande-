import pkg from "pg";
import config from "./config.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: config.dbSsl // pour Render PostgreSQL
});

export const query = (text, params) => pool.query(text, params);
export default pool;
