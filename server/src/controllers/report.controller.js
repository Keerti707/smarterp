const pool = require("../config/db");

async function getReports(req, res) {
  try {
    const { companyId } = req.params;

    const [
      sales,
      purchases,
      inventory,
      customers,
      suppliers,
    ] = await Promise.all([
      pool.query(
        "SELECT COALESCE(SUM(total_amount),0)::numeric AS total FROM sales_invoices WHERE company_id=$1",
        [companyId]
      ),
      pool.query(
        "SELECT COALESCE(SUM(total_amount),0)::numeric AS total FROM purchase_invoices WHERE company_id=$1",
        [companyId]
      ),
      pool.query(
        "SELECT COUNT(*)::int AS total FROM inventory_items WHERE company_id=$1",
        [companyId]
      ),
      pool.query(
        "SELECT COUNT(*)::int AS total FROM customers WHERE company_id=$1",
        [companyId]
      ),
      pool.query(
        "SELECT COUNT(*)::int AS total FROM suppliers WHERE company_id=$1",
        [companyId]
      ),
    ]);

    const salesTotal = Number(sales.rows[0].total);
    const purchaseTotal = Number(purchases.rows[0].total);

    res.json({
      sales: salesTotal,
      purchases: purchaseTotal,
      profit: salesTotal - purchaseTotal,
      inventory: inventory.rows[0].total,
      customers: customers.rows[0].total,
      suppliers: suppliers.rows[0].total,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load reports",
      error: err.message,
    });
  }
}

module.exports = {
  getReports,
};