const pool = require("../config/db");

async function getDashboardStats(req, res) {
  try {
    const { companyId } = req.params;

    const [
      inventory,
      customers,
      suppliers,
      sales,
      purchases,
      recentSales,
      recentPurchases,
    ] = await Promise.all([
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
      pool.query(
        "SELECT COALESCE(SUM(total_amount),0)::numeric AS total FROM sales_invoices WHERE company_id=$1",
        [companyId]
      ),
      pool.query(
        "SELECT COALESCE(SUM(total_amount),0)::numeric AS total FROM purchase_invoices WHERE company_id=$1",
        [companyId]
      ),
      pool.query(
        `
        SELECT
          s.invoice_number,
          COALESCE(c.name, 'Walk-in Customer') AS party_name,
          s.total_amount,
          s.created_at,
          'sale' AS type
        FROM sales_invoices s
        LEFT JOIN customers c ON c.id = s.customer_id
        WHERE s.company_id=$1
        ORDER BY s.created_at DESC
        LIMIT 5
        `,
        [companyId]
      ),
      pool.query(
        `
        SELECT
          p.invoice_number,
          COALESCE(s.name, 'Walk-in Supplier') AS party_name,
          p.total_amount,
          p.created_at,
          'purchase' AS type
        FROM purchase_invoices p
        LEFT JOIN suppliers s ON s.id = p.supplier_id
        WHERE p.company_id=$1
        ORDER BY p.created_at DESC
        LIMIT 5
        `,
        [companyId]
      ),
    ]);

    const transactions = [
      ...recentSales.rows,
      ...recentPurchases.rows,
    ]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6);

    res.json({
      inventory: inventory.rows[0].total,
      customers: customers.rows[0].total,
      suppliers: suppliers.rows[0].total,
      sales: Number(sales.rows[0].total),
      purchases: Number(purchases.rows[0].total),
      transactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: err.message,
    });
  }
}

module.exports = {
  getDashboardStats,
};