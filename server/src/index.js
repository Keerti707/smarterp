require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const customerRoutes = require("./routes/customer.routes");
const supplierRoutes = require("./routes/supplier.routes");
const salesRoutes = require("./routes/sales.routes");
const purchaseRoutes = require("./routes/purchase.routes");
const accountingRoutes = require("./routes/accounting.routes");
const bankingRoutes = require("./routes/banking.routes");
const reportRoutes = require("./routes/report.routes");
const pdfRoutes = require("./routes/pdf.routes");
const exportRoutes = require("./routes/export.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "SmartERP API running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/accounting", accountingRoutes);
app.use("/api/banking", bankingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
