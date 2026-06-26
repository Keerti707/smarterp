require("dotenv").config();

const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

async function runMigrations() {
  try {
    const migrationPath = path.join(__dirname, "migrations", "001_initial_schema.sql");
    const sql = fs.readFileSync(migrationPath, "utf8");

    await pool.query(sql);

    console.log("✅ Database schema created successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await pool.end();
  }
}

runMigrations();
