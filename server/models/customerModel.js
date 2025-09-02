import { getDb } from "./db.js";

export async function createCustomer(data) {
  const db = await getDb();
  const { firstName, lastName, phone, city, state, pinCode } = data;
  const result = await db.run(
    `INSERT INTO customers (firstName, lastName, phone, city, state, pinCode)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, phone, city, state, pinCode]
  );
  return result;
}

export async function getAllCustomers() {
  const db = await getDb();
  return db.all(`SELECT * FROM customers`);
}

export async function getCustomerById(id) {
  const db = await getDb();
  const customer = await db.get(`SELECT * FROM customers WHERE id = ?`, [id]);
  if (customer) {
    const addresses = await db.all(`SELECT * FROM addresses WHERE customerId = ?`, [id]);
    customer.addresses = addresses;
  }
  return customer;
}

export async function updateCustomer(id, data) {
  const db = await getDb();
  const { firstName, lastName, phone, city, state, pinCode } = data;
  const result = await db.run(
    `UPDATE customers SET firstName = ?, lastName = ?, phone = ?, city = ?, state = ?, pinCode = ? WHERE id = ?`,
    [firstName, lastName, phone, city, state, pinCode, id]
  );
  return result;
}

export async function deleteCustomer(id) {
  const db = await getDb();
  const result = await db.run(`DELETE FROM customers WHERE id = ?`, [id]);
  return result;
}
