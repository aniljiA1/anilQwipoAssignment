// server/models/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Export a promise that opens the DB
export const dbPromise = open({
  filename: "./customer_management.sqlite", // your SQLite file
  driver: sqlite3.Database
});

// Optional helper function to get the DB instance
export async function getDb() {
  return dbPromise;
}

// Optional: initialize tables
export async function initDb() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT
    );
    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      address TEXT,
      FOREIGN KEY(customer_id) REFERENCES customers(id)
    );
  `);
}
