import { getDb } from "./db.js";

export async function getAllAddresses() {
  const db = await getDb();
  return db.all("SELECT * FROM addresses");
}


export async function addAddress(data) {
  const db = await getDb();
  const { customerId, addressLine1, addressLine2, city, state, pinCode } = data;
  const result = await db.run(
    `INSERT INTO addresses (customerId, addressLine1, addressLine2, city, state, pinCode)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [customerId, addressLine1, addressLine2, city, state, pinCode]
  );
  return result;
}

export async function updateAddress(id, data) {
  const db = await getDb();
  const { addressLine1, addressLine2, city, state, pinCode } = data;
  const result = await db.run(
    `UPDATE addresses SET addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, pinCode = ? WHERE id = ?`,
    [addressLine1, addressLine2, city, state, pinCode, id]
  );
  return result;
}

export async function deleteAddress(id) {
  const db = await getDb();
  const result = await db.run(`DELETE FROM addresses WHERE id = ?`, [id]);
  return result;
}
