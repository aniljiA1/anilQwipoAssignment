import express from "express";
import cors from "cors";
import { dbPromise } from "./models/db.js";
import customerRoutes from "./routes/customers.js";
import addressRoutes from "./routes/addresses.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes); // All customer routes are inside routes/customers.js
app.use("/api/addresses", addressRoutes); // All address routes are inside routes/addresses.js

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
