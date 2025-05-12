import express from 'express';
import multer from 'multer';
import Customize from '../models/Customize.js'; // Make sure to add `.js` extension
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique file names
  },
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

// Handle POST request for custom design submission
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;
    const file = req.file; // Get the uploaded file

    // Check if the file and description are provided
    if (!file || !description) {
      return res.status(400).json({ message: 'Image and description are required.' });
    }

    // Create a new design entry in the database
    const newDesign = new Customize({
      imageUrl: file.filename, // Save the filename in DB (not the file itself)
      description,
    });

    // Save the design entry to the database
    const savedDesign = await newDesign.save();
    res.status(201).json(savedDesign); // Respond with the saved design
  } catch (err) {
    console.error('Error uploading:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router; // Use export default for ES module
