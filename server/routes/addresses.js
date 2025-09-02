import express from "express";
import { addAddress, updateAddress, deleteAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
