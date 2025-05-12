import express from 'express';
import { createOrder } from '../controllers/orderController.js'; // Import createOrder using ES modules syntax
const router = express.Router();

router.route('/order').post(createOrder);

export default router; // Export the router as default
