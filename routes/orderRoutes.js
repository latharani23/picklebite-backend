const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/place", protect, async (req, res) => {
  try {
    const { customer, cart, paymentMethod } = req.body;

    if (!customer || !cart || cart.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // ✅ THIS LINE WAS MISSING
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      userId: req.user._id,
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        weight: item.selectedWeight,
      })),
      customer,
      paymentMethod,
      totalAmount, // now it exists
      paymentStatus: "PAID",
      orderStatus: "PLACED",
    });

    res.status(201).json({
      success: true,
      message: "Order placed",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

/* ================= GET MY ORDERS ================= */

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
