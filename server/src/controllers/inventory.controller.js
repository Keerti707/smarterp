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
        ON c.id = i.category_id
      LEFT JOIN inventory_units u
        ON u.id = i.unit_id
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
      INSERT INTO inventory_items(
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
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$9)
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

async function updateInventoryItem(req, res) {
  try {
    const { id } = req.params;

    const {
      category_id,
      unit_id,
      name,
      sku,
      hsn_code,
      purchase_price,
      selling_price,
      current_stock,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE inventory_items
      SET
        category_id=$1,
        unit_id=$2,
        name=$3,
        sku=$4,
        hsn_code=$5,
        purchase_price=$6,
        selling_price=$7,
        current_stock=$8
      WHERE id=$9
      RETURNING *
      `,
      [
        category_id || null,
        unit_id || null,
        name,
        sku,
        hsn_code,
        purchase_price,
        selling_price,
        current_stock,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update inventory item",
      error: err.message,
    });
  }
}

async function deleteInventoryItem(req, res) {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM inventory_items WHERE id=$1",
      [id]
    );

    res.json({
      message: "Inventory item deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete inventory item",
      error: err.message,
    });
  }
}

module.exports = {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
