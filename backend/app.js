import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
// Routes
import products from './routes/product.js';
import orders from './routes/order.js';
import authRoutes from './routes/Auth.js';
import customizeRoutes from './routes/customize.js';
import adminRoutes from './routes/admin.js';
import feedbackRoute from "./routes/feedback.js"; // Assuming you are using ES modules
import contactRoutes from './routes/contact.js';  // Import the contact routes

// Initialize dotenv for environment variables
dotenv.config({ path: path.join(process.cwd(), 'config', 'config.env') });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Enable CORS for frontend on port 3000
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Serve uploaded files

// Database Connection
import connectDatabase from './config/connectDatabase.js';
connectDatabase();



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use("/custom-designs", customizeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/feedback", feedbackRoute);
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
