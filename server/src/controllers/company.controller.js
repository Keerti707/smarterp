const pool = require("../config/db");

async function createCompany(req, res) {
  try {
    const {
      name,
      address,
      gst_number,
      financial_year,
      state,
      contact_email,
      contact_phone,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Company name is required" });
    }

    const countResult = await pool.query(
      "SELECT COUNT(*) FROM companies WHERE user_id = $1",
      [req.user.id]
    );

    if (Number(countResult.rows[0].count) >= 5) {
      return res.status(400).json({ message: "Maximum 5 companies allowed per user" });
    }

    const result = await pool.query(
      `INSERT INTO companies
      (user_id, name, address, gst_number, financial_year, state, contact_email, contact_phone)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [req.user.id, name, address, gst_number, financial_year, state, contact_email, contact_phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create company", error: error.message });
  }
}

async function getCompanies(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM companies WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies", error: error.message });
  }
}

async function updateCompany(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      address,
      gst_number,
      financial_year,
      state,
      contact_email,
      contact_phone,
    } = req.body;

    const result = await pool.query(
      `UPDATE companies
       SET name = COALESCE($1, name),
           address = COALESCE($2, address),
           gst_number = COALESCE($3, gst_number),
           financial_year = COALESCE($4, financial_year),
           state = COALESCE($5, state),
           contact_email = COALESCE($6, contact_email),
           contact_phone = COALESCE($7, contact_phone)
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [name, address, gst_number, financial_year, state, contact_email, contact_phone, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update company", error: error.message });
  }
}

async function deleteCompany(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM companies WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company", error: error.message });
  }
}

module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
};