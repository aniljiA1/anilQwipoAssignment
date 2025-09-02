// server/test.js
import { initDb } from "./models/db.js";
import { getAllCustomers } from "./routes/customers.js";
import { getAllAddresses } from "./models/addressModel.js";

async function test() {
  await initDb();
  console.log(await getAllCustomers());
  console.log(await getAllAddresses());
}

test();
