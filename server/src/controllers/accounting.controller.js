const pool = require("../config/db");

async function getAccountingSummary(req, res) {
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
      sales: totalSales,
      purchases: totalPurchases,
      grossProfit: totalSales - totalPurchases,
      cashInHand: totalSales,
      payable: totalPurchases,
      receivable: totalSales,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load accounting summary",
      error: err.message,
    });
  }
}

module.exports = {
  getAccountingSummary,
};