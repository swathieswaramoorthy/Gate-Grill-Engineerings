const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Import the routes before using them

const connectDatabase = require('./config/connectDatabase.js');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

// Middleware

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Database Connection
connectDatabase();

// Routes
//app.use("/api/v1/custom-designs", customizeRoutes);  // This should match your API URL

// Other Routes
const products = require('./routes/product');
const orders = require('./routes/order');
// More routes...
const authRoutes = require('./routes/auth');
const customizeRoutes = require("./routes/customize");
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use("/custom-designs", customizeRoutes);

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
