const pool = require("../config/db");

async function getInventory(req, res) {
  try {
    const { companyId } = req.params;

    const result = await pool.query(
      `
      SELECT
        i.*,
        c.name AS category_name,
        u.name AS unit_name,
        u.short_name
      FROM inventory_items i
      LEFT JOIN inventory_categories c
        ON i.category_id = c.id
      LEFT JOIN inventory_units u
        ON i.unit_id = u.id
      WHERE i.company_id = $1
      ORDER BY i.created_at DESC
      `,
      [companyId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch inventory",
      error: err.message,
    });
  }
}

async function createInventoryItem(req, res) {
  try {
    const { companyId } = req.params;

    const {
      category_id,
      unit_id,
      name,
      sku,
      hsn_code,
      purchase_price,
      selling_price,
      opening_stock,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO inventory_items (
        company_id,
        category_id,
        unit_id,
        name,
        sku,
        hsn_code,
        purchase_price,
        selling_price,
        opening_stock,
        current_stock
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9)
      RETURNING *
      `,
      [
        companyId,
        category_id || null,
        unit_id || null,
        name,
        sku,
        hsn_code,
        purchase_price || 0,
        selling_price || 0,
        opening_stock || 0,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create inventory item",
      error: err.message,
    });
  }
}

module.exports = {
  getInventory,
  createInventoryItem,
};
