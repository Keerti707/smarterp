const pool = require("../config/db");

async function getSuppliers(req, res) {
  try {
    const { companyId } = req.params;

    const result = await pool.query(
      "SELECT *, mobile AS phone FROM suppliers WHERE company_id=$1 ORDER BY created_at DESC",
      [companyId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch suppliers", error: err.message });
  }
}

async function createSupplier(req, res) {
  try {
    const { companyId } = req.params;
    const { name, phone, email, address, gst_number, credit_limit, tag, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO suppliers(company_id,name,mobile,email,address,gst_number,credit_limit,tag,notes)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *, mobile AS phone`,
      [companyId, name, phone, email, address, gst_number, credit_limit || 0, tag, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to create supplier", error: err.message });
  }
}

async function updateSupplier(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email, address, gst_number, credit_limit, tag, notes } = req.body;

    const result = await pool.query(
      `UPDATE suppliers
       SET name=$1,mobile=$2,email=$3,address=$4,gst_number=$5,credit_limit=$6,tag=$7,notes=$8
       WHERE id=$9
       RETURNING *, mobile AS phone`,
      [name, phone, email, address, gst_number, credit_limit || 0, tag, notes, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to update supplier", error: err.message });
  }
}

async function deleteSupplier(req, res) {
  try {
    await pool.query("DELETE FROM suppliers WHERE id=$1", [req.params.id]);
    res.json({ message: "Supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete supplier", error: err.message });
  }
}

module.exports = { getSuppliers, createSupplier, updateSupplier, deleteSupplier };