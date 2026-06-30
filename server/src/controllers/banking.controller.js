const pool = require("../config/db");

async function getBankingSummary(req, res) {
  try {
    const { companyId } = req.params;

    const [sales, purchases] = await Promise.all([
      pool.query(
        `SELECT COALESCE(SUM(total_amount),0)::numeric AS total
         FROM sales_invoices
         WHERE company_id = $1`,
        [companyId]
      ),
      pool.query(
        `SELECT COALESCE(SUM(total_amount),0)::numeric AS total
         FROM purchase_invoices
         WHERE company_id = $1`,
        [companyId]
      ),
    ]);

    const totalSales = Number(sales.rows[0].total);
    const totalPurchases = Number(purchases.rows[0].total);

    res.json({
      openingBalance: 0,
      totalReceipts: totalSales,
      totalPayments: totalPurchases,
      closingBalance: totalSales - totalPurchases,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load banking summary",
      error: err.message,
    });
  }
}

module.exports = {
  getBankingSummary,
};