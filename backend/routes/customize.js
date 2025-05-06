const express = require("express");
const multer = require("multer");
const Customize = require("../models/Customize");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/customize", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    const file = req.file;

    if (!file || !description) {
      return res.status(400).json({ error: "Image and description are required." });
    }

    const newDesign = new Customize({
      imageUrl: file.filename,
      description,
    });

    const savedDesign = await newDesign.save();
    res.status(201).json(savedDesign);
  } catch (err) {
    console.error("Error uploading:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
