import express from "express";
import Contact from "../models/Contact.js"; // Ensure the file extension .js is included for ES6 imports

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const saved = await Contact.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
