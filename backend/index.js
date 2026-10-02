const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/Database");

// routes
const authRoutes = require("./routes/LoginSignupRoute");
const studentRoutes = require("./routes/studentRoute");
const attendanceRoutes = require("./routes/attendanceRoute");
const complaintRoutes = require("./routes/complaintRoute");
const expenseRoutes = require("./routes/expenseRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const invoiceRoutes = require("./routes/invoiceRoute");
const managementRoutes = require("./routes/managementRoute");
const menuRoutes = require("./routes/menuRoute");
const notificationRoutes = require("./routes/notificationRoute");
const salaryRoutes = require("./routes/salaryRoute");
const staffRoutes = require("./routes/staffRoute");
const paymentRoutes = require("./routes/paymentRoutes");
const qrRoutes = require("./routes/qrRoutes");

require("dotenv").config();

const app = express();

// CORS — allow both local dev and deployed frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://hostel-bite-abhijeet.vercel.app",
  process.env.FRONTEND_URL, // Fallback if set in env vars
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/qr", qrRoutes);

// Listen on configured port for Render/local
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
