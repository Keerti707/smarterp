const ExcelJS = require("exceljs");
const pool = require("../config/db");

async function exportSales(req, res) {
  try {
    const { companyId } = req.params;

    const { rows } = await pool.query(
      `
      SELECT
        invoice_number,
        invoice_date,
        total_amount
      FROM sales_invoices
      WHERE company_id = $1
      ORDER BY created_at DESC
      `,
      [companyId]
    );

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sales");

    sheet.columns = [
      { header: "Invoice No", key: "invoice_number", width: 22 },
      { header: "Invoice Date", key: "invoice_date", width: 18 },
      { header: "Amount", key: "total_amount", width: 18 },

    ];

    sheet.getRow(1).font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4F46E5" },
    };

    rows.forEach((row) => sheet.addRow(row));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="sales-report.xlsx"'
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (err) {
    res.status(500).json({
      message: "Failed to export sales report",
      error: err.message,
    });
  }
}

module.exports = {
  exportSales,
};