const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const router = express.Router();

/* ================= PLACE ORDER ================= */

router.post("/place", protect, async (req, res) => {
  try {
    const { customer, cart, paymentMethod } = req.body;

    if (!customer || !cart || cart.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

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
      totalAmount,
      paymentStatus: "PAID",
      orderStatus: "PLACED",
    });

    /* ================= EMAIL SETUP ================= */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* ================= ADMIN EMAIL ================= */

    const adminMail = {
      from: process.env.EMAIL_USER,
      to: "picklebiteco@gmail.com",
      subject: "🛒 New PickleBite Order Received",
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <hr/>
        <h3>Items:</h3>
        ${cart
          .map(
            (item) =>
              `<p>${item.name} (${item.selectedWeight}) x ${item.quantity}</p>`,
          )
          .join("")}
        <hr/>
        <h3>Total: Rs. ${totalAmount}</h3>
      `,
    };

    /* ================= CUSTOMER EMAIL ================= */

    const customerMail = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: "✅ Your PickleBite Order Confirmation",
      html: `
        <h2>Thank You for Your Order ❤️</h2>
        <p>Hi ${customer.name},</p>
        <p>Your order has been successfully placed.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <h3>Order Summary:</h3>
        ${cart
          .map(
            (item) =>
              `<p>${item.name} (${item.selectedWeight}) x ${item.quantity}</p>`,
          )
          .join("")}

        <hr/>
        <h3>Total Paid: Rs. ${totalAmount}</h3>

        <p>We will contact you shortly for delivery updates.</p>

        <br/>
        <p>Thank you for choosing Pickle Bite 💛</p>
      `,
    };

    /* ================= SEND BOTH EMAILS ================= */

    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);

    res.status(201).json({
      success: true,
      message: "Order placed & emails sent",
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

    /* ===== If Delivered → Send Email ===== */
    if (status === "DELIVERED") {
      const user = await User.findById(order.userId);

      console.log("EMAIL_USER:", process.env.EMAIL_USER);
      console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // important
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const deliveryMail = {
        from: process.env.EMAIL_USER,
        to: user.email, // ✅ fetched from DB
        subject: "🎉 Your PickleBite Order Delivered Successfully",
        html: `
      <h2>Order Delivered Successfully 🎉</h2>
      <p>Hi ${user.username},</p>
      <p>Your order has been delivered successfully.</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total Paid:</strong> Rs. ${order.totalAmount}</p>
    `,
      };

      await transporter.sendMail(deliveryMail);
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
