const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const axios = require("axios");

const router = express.Router();

/* ================= PLACE ORDER ================= */

router.post("/place", protect, async (req, res) => {
  try {
    const { customer, cart, paymentMethod } = req.body;

    if (!customer || !cart || cart.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Create order
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
      totalAmount,
      paymentStatus: "PAID",
      orderStatus: "PLACED",
    });

    // Send Email (Customer + Admin)
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Pickle Bite",
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: customer.email,
            name: customer.name,
          },
        ],
        bcc: [
          {
            email: process.env.ADMIN_RECEIVER_EMAIL,
          },
        ],
        subject: "🛒 PickleBite Order Confirmation",
        htmlContent: `
          <h2>Order Confirmed ❤️</h2>
          <p>Hi ${customer.name},</p>
          <p>Your order has been placed successfully.</p>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Total:</strong> Rs. ${totalAmount}</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(201).json({
      success: true,
      message: "Order placed & email sent",
      order,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Email or Order failed" });
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

/* ================= UPDATE ORDER STATUS ================= */

router.put("/update-status/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    if (status === "DELIVERED") {
      const user = await User.findById(order.userId);

      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Pickle Bite",
            email: process.env.SENDER_EMAIL,
          },
          to: [
            {
              email: user.email,
              name: user.username,
            },
          ],
          bcc: [
            {
              email: process.env.ADMIN_RECEIVER_EMAIL,
            },
          ],
          subject: "🎉 Your PickleBite Order Delivered",
          htmlContent: `
            <h2>Order Delivered Successfully 🎉</h2>
            <p>Hi ${user.username},</p>
            <p>Your order has been delivered.</p>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total Paid:</strong> Rs. ${order.totalAmount}</p>
          `,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
    }

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
