// routes/admin.js
import express from 'express';

import Contact from '../models/Contact.js';
import Feedback from '../models/Feedback.js';
import Order from '../models/orderModel.js';
import Customize from "../models/Customize.js"; // import Customize model
import Product from "../models/productModel.js";

//image 
import multer from 'multer';
import path from 'path';


const router = express.Router();


//add products 
// === Multer Config for Image Upload ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });
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


//add product
// === Add Product Route ===
router.post('/add-product', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      stock,
      category,
      seller
    } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category,
      seller,
      ratings: "0",
      numOfReviews: "0",
      images: [{ image: req.file.filename }]
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// === Fetch All Products Route ===
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
export default router;
