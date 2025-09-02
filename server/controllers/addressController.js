import * as Address from "../models/addressModel.js";

export async function addAddress(req, res, next) {
  try {
    const result = await Address.addAddress(req.body);
    res.status(201).json({ id: result.lastID, message: "Address added" });
  } catch (err) {
    next(err);
  }
}

export async function updateAddress(req, res, next) {
  try {
    const result = await Address.updateAddress(req.params.id, req.body);
    if (result.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ message: "Address updated" });
  } catch (err) {
    next(err);
  }
}

export async function deleteAddress(req, res, next) {
  try {
    const result = await Address.deleteAddress(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ message: "Address deleted" });
  } catch (err) {
    next(err);
  }
}
