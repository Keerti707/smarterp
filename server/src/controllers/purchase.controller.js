const pool = require("../config/db");

async function getPurchaseInvoices(req, res) {
  try {
    const { companyId } = req.params;

    const result = await pool.query(
      `
      SELECT
        p.*,
        s.name AS supplier_name
      FROM purchase_invoices p
      LEFT JOIN suppliers s
        ON s.id = p.supplier_id
      WHERE p.company_id = $1
      ORDER BY p.created_at DESC
      `,
      [companyId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch purchase invoices",
      error: err.message,
    });
  }
}

async function createPurchaseInvoice(req, res) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { companyId } = req.params;
    const { supplier_id, invoice_number, notes, items } = req.body;

    let subtotal = 0;
    let gstAmount = 0;

    for (const item of items) {
      const base = Number(item.quantity) * Number(item.rate);
      const gst = base * (Number(item.gst_percent || 0) / 100);

      subtotal += base;
      gstAmount += gst;
    }

    const total = subtotal + gstAmount;

    const invoiceResult = await client.query(
      `
      INSERT INTO purchase_invoices(
        company_id,
        supplier_id,
        invoice_number,
        subtotal,
        gst_amount,
        total_amount,
        notes
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        companyId,
        supplier_id || null,
        invoice_number,
        subtotal,
        gstAmount,
        total,
        notes,
      ]
    );

    const invoice = invoiceResult.rows[0];

    for (const item of items) {
      const base = Number(item.quantity) * Number(item.rate);
      const gst = base * (Number(item.gst_percent || 0) / 100);

      await client.query(
        `
        INSERT INTO purchase_invoice_items(
          invoice_id,
          inventory_item_id,
          item_name,
          quantity,
          rate,
          gst_percent,
          line_total
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
          base + gst,
        ]
      );

      if (item.inventory_item_id) {
        await client.query(
          `
          UPDATE inventory_items
          SET current_stock = current_stock + $1
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

    res.status(500).json({
      message: "Failed to create purchase invoice",
      error: err.message,
    });
  } finally {
    client.release();
  }
}

module.exports = {
  getPurchaseInvoices,
  createPurchaseInvoice,
};