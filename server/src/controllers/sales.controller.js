const pool = require("../config/db");

async function getSalesInvoices(req, res) {
  try {
    const { companyId } = req.params;

    const result = await pool.query(
      `
      SELECT s.*, c.name AS customer_name
      FROM sales_invoices s
      LEFT JOIN customers c ON c.id = s.customer_id
      WHERE s.company_id = $1
      ORDER BY s.created_at DESC
      `,
      [companyId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sales invoices", error: err.message });
  }
}

async function createSalesInvoice(req, res) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { companyId } = req.params;
    const { customer_id, invoice_number, notes, items } = req.body;

    let subtotal = 0;
    let gstAmount = 0;

    for (const item of items) {
      const lineBase = Number(item.quantity) * Number(item.rate);
      const lineGst = lineBase * (Number(item.gst_percent || 0) / 100);
      subtotal += lineBase;
      gstAmount += lineGst;
    }

    const total = subtotal + gstAmount;

    const invoiceResult = await client.query(
      `
      INSERT INTO sales_invoices(
        company_id, customer_id, invoice_number, subtotal, gst_amount, total_amount, notes
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [companyId, customer_id || null, invoice_number, subtotal, gstAmount, total, notes]
    );

    const invoice = invoiceResult.rows[0];

    for (const item of items) {
      const lineBase = Number(item.quantity) * Number(item.rate);
      const lineGst = lineBase * (Number(item.gst_percent || 0) / 100);
      const lineTotal = lineBase + lineGst;

      await client.query(
        `
        INSERT INTO sales_invoice_items(
          invoice_id, inventory_item_id, item_name, quantity, rate, gst_percent, line_total
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        `,
        [
          invoice.id,
          item.inventory_item_id || null,
          item.item_name,
          item.quantity,
          item.rate,
          item.gst_percent || 0,
          lineTotal,
        ]
      );

      if (item.inventory_item_id) {
        await client.query(
          `
          UPDATE inventory_items
          SET current_stock = current_stock - $1
          WHERE id = $2
          `,
          [item.quantity, item.inventory_item_id]
        );
      }
    }

    await client.query("COMMIT");

    res.status(201).json(invoice);
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Failed to create sales invoice", error: err.message });
  } finally {
    client.release();
  }
}

module.exports = {
  getSalesInvoices,
  createSalesInvoice,
};