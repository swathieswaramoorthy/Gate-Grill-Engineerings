import express from 'express';
import verifyPayment  from '../controllers/paymentController.js';

const router = express.Router();

// Route to verify the payment and store details in DB
router.post('/verify-payment', async (req, res) => {
    try {
        const paymentData = req.body;
        const result = await verifyPayment(paymentData);

        if (result.success) {
            res.json({ success: true, message: result.message });
        } else {
            res.json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Server error occurred while verifying payment' });
    }
});

export default router;
