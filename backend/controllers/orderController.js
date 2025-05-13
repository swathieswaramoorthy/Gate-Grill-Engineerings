import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { productName, quantity, customerName, customerEmail } = req.body;

    if (!productName || !quantity || !customerName || !customerEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = await Order.create({
      productName,
      quantity,
      customerName,
      customerEmail
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Backend error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};
