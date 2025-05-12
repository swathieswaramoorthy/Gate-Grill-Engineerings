// routes/admin.js
import express from 'express';
import Contact from '../models/Contact.js';
import Feedback from '../models/Feedback.js';
import Order from '../models/orderModel.js';
import Customize from "../models/Customize.js"; // import Customize model

const router = express.Router();

// Fetch all contacts

// Fetch all customized designs
router.get("/custom-designs", async (req, res) => {
  try {
    const designs = await Customize.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Fetch all feedback
router.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Fetch all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
