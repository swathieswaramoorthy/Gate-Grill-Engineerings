const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
