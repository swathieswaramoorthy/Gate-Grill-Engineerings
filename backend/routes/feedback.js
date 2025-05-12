import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Create a new feedback
router.post("/", async (req, res) => {
  try {
    const saved = await Feedback.create(req.body);
    res.status(201).json(saved); // Send the saved feedback back as response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
