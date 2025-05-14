import Payment from '../models/Payment.js';
import crypto from 'crypto';

// Function to verify payment
const verifyPayment = async (paymentData) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, name, email, contact, address } = paymentData;

    // Prepare the data for signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  // It's better to use environment variables for sensitive keys
        .update(body)
        .digest('hex');

    // Compare the signature sent by Razorpay with the one generated on the backend
    if (expected_signature === razorpay_signature) {
        // Payment is successful, save payment details to database
        const newPayment = new Payment({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            amount,
            name,
            email,
            contact,
            address,
            status: 'successful',
        });

        await newPayment.save();
        return { success: true, message: 'Payment verified and saved to database' };
    } else {
        return { success: false, message: 'Payment verification failed' };
    }
};

export default verifyPayment;
