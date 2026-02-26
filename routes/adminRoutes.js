const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.put("/order/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true },
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/dashboard", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    const usersCount = await User.countDocuments();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    const received = orders
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const pending = totalRevenue - received;

    res.json({
      orders,
      usersCount,
      revenue: received,
      pendingAmount: pending,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
