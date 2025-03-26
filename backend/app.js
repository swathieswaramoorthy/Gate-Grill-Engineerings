const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase.js');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Database Connection
connectDatabase();

// Import Routes
const products = require('./routes/product');
const orders = require('./routes/order');

// Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Global Error Handling
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    process.exit(1);
});
