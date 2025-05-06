const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const connectDatabase = require('./config/connectDatabase.js');
//const authRoutes = require('./routes/Auth');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files


// Database Connection
connectDatabase();

// Import Routes
const products = require('./routes/product');
const orders = require('./routes/order');
const customizeRoutes = require("./routes/customize");
//const signup =require("./routes/auth.js");


// Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
//app.use('/api/auth', authRoutes);
 app.use("/api/contact", require("./routes/contact"));
 app.use("/api/feedback", require("./routes/feedback"));
 //app.use("/api/v1/signup",signup);

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