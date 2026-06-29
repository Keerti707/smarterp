require("dotenv").config();

const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, "migrations");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      await pool.query(sql);
      console.log(`✅ Ran migration: ${file}`);
    }

    console.log("✅ All migrations completed");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await pool.end();
  }
}

runMigrations();
