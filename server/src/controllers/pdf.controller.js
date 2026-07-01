const PDFDocument = require("pdfkit");

function generateInvoice(req, res) {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="invoice.pdf"'
  );

  doc.pipe(res);

  doc
    .fontSize(28)
    .fillColor("#4F46E5")
    .text("SmartERP", {
      align: "center",
    });

  doc
    .moveDown(0.5)
    .fontSize(18)
    .fillColor("#111827")
    .text("TAX INVOICE", {
      align: "center",
    });

  doc.moveDown(2);

  doc
    .fontSize(12)
    .fillColor("#374151")
    .text(`Invoice No : ${req.params.invoiceId}`);

  doc.text(`Generated : ${new Date().toLocaleString()}`);

  doc.moveDown();

  doc
    .fontSize(14)
    .fillColor("#111827")
    .text("Bill To");

  doc
    .fontSize(12)
    .fillColor("#4B5563")
    .text("Customer Name")
    .text("Customer Address")
    .text("GSTIN: XXXXXXXX");

  doc.moveDown(2);

  doc
    .fontSize(13)
    .fillColor("#111827")
    .text("Description", 50)
    .text("Qty", 300)
    .text("Price", 370)
    .text("Total", 470);

  doc
    .moveTo(50, doc.y + 5)
    .lineTo(545, doc.y + 5)
    .stroke();

  doc.moveDown();

  doc
    .fontSize(12)
    .text("Sample Product", 50)
    .text("1", 300)
    .text("₹1000", 370)
    .text("₹1000", 470);

  doc.moveDown(2);

  doc
    .fontSize(16)
    .fillColor("#111827")
    .text("Grand Total : ₹1000", {
      align: "right",
    });

  doc.moveDown(3);

  doc
    .fontSize(11)
    .fillColor("#6B7280")
    .text(
      "This invoice was generated automatically by SmartERP.",
      {
        align: "center",
      }
    );

  doc.end();
}

module.exports = {
  generateInvoice,
};