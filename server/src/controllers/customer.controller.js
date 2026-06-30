const pool = require("../config/db");

async function getCustomers(req, res) {
  try {
    const { companyId } = req.params;

    const result = await pool.query(
      `
      SELECT
        *,
        mobile AS phone
      FROM customers
      WHERE company_id = $1
      ORDER BY created_at DESC
      `,
      [companyId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: err.message,
    });
  }
}

async function createCustomer(req, res) {
  try {
    const { companyId } = req.params;

    const {
      name,
      phone,
      email,
      address,
      gst_number,
      credit_limit,
      tag,
      notes,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO customers(
        company_id,
        name,
        mobile,
        email,
        address,
        gst_number,
        credit_limit,
        tag,
        notes
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *, mobile AS phone
      `,
      [
        companyId,
        name,
        phone,
        email,
        address,
        gst_number,
        credit_limit || 0,
        tag,
        notes,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create customer",
      error: err.message,
    });
  }
}

async function updateCustomer(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      phone,
      email,
      address,
      gst_number,
      credit_limit,
      tag,
      notes,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE customers
      SET
        name=$1,
        mobile=$2,
        email=$3,
        address=$4,
        gst_number=$5,
        credit_limit=$6,
        tag=$7,
        notes=$8
      WHERE id=$9
      RETURNING *, mobile AS phone
      `,
      [
        name,
        phone,
        email,
        address,
        gst_number,
        credit_limit || 0,
        tag,
        notes,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update customer",
      error: err.message,
    });
  }
}

async function deleteCustomer(req, res) {
  try {
    await pool.query("DELETE FROM customers WHERE id=$1", [req.params.id]);

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: err.message,
    });
  }
}

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
