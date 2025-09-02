import * as Customer from "../models/customerModel.js";

export async function createCustomer(req, res, next) {
  try {
    const { firstName, lastName, phone } = req.body;
    if (!firstName || !lastName || !phone) return res.status(400).json({ error: "Missing fields" });

    const result = await Customer.createCustomer(req.body);
    res.status(201).json({ id: result.lastID, message: "Customer created" });
  } catch (err) {
    next(err);
  }
}

export async function getCustomers(req, res, next) {
  try {
    const customers = await Customer.getAllCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
}

export async function getCustomer(req, res, next) {
  try {
    const customer = await Customer.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    next(err);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const result = await Customer.updateCustomer(req.params.id, req.body);
    if (result.changes === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer updated" });
  } catch (err) {
    next(err);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    const result = await Customer.deleteCustomer(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    next(err);
  }
}
