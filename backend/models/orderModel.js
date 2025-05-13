import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const Order = mongoose.model("Order", orderSchema);
export default Order;