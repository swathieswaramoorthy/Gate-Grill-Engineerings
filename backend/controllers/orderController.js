import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, customerName, customerEmail } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || !customerName || !customerEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = await Order.create({
      items,
      customerName,
      customerEmail
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Backend error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};
