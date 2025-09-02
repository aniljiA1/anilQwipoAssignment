import express from "express";
import { dbPromise } from "../models/db.js";

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  try {
    const db = await dbPromise;
    const customers = await db.all("SELECT * FROM customers");
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET customer by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await dbPromise;
    const customer = await db.get("SELECT * FROM customers WHERE id = ?", [req.params.id]);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST create customer
router.post("/", async (req, res) => {
  try {
    const db = await dbPromise;
    const { name, email, phone } = req.body;
    const result = await db.run(
      "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    const newCustomer = await db.get("SELECT * FROM customers WHERE id = ?", [result.lastID]);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT update customer
router.put("/:id", async (req, res) => {
  try {
    const db = await dbPromise;
    const { name, email, phone } = req.body;
    await db.run(
      "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, req.params.id]
    );
    const updatedCustomer = await db.get("SELECT * FROM customers WHERE id = ?", [req.params.id]);
    res.json(updatedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE customer
router.delete("/:id", async (req, res) => {
  try {
    const db = await dbPromise;
    await db.run("DELETE FROM customers WHERE id = ?", [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
