// const express = require("express");
// const Order = require("../models/Order");
// const protect = require("../middleware/authMiddleware");
// const User = require("../models/User");
// const axios = require("axios");
// const router = express.Router();

// /* ================= PLACE ORDER ================= */

// router.post("/place", protect, async (req, res) => {
//   try {
//     const { customer, cart, paymentMethod } = req.body;

//     if (!customer || !cart || cart.length === 0) {
//       return res.status(400).json({ message: "Invalid order data" });
//     }

//     // const totalAmount = cart.reduce(
//     //   (sum, item) => sum + item.price * item.quantity,
//     //   0,
//     // );
//     const totalAmount = calculateComboPrice(cart);
//     // Create order
//     const order = await Order.create({
//       userId: req.user._id, // must use _id
//       items: cart.map((item) => ({
//         productId: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         weight: item.selectedWeight,
//       })),
//       customer,
//       paymentMethod,
//       totalAmount,
//       paymentStatus: "PAID",
//       orderStatus: "PLACED",
//     });
//     const shortOrderId = order._id.toString().slice(-6).toUpperCase();

//     // Send Email (Customer + Admin)
//     await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: {
//           name: "Pickle Bite",
//           email: process.env.SENDER_EMAIL,
//         },
//         to: [
//           {
//             email: customer.email,
//             name: customer.name,
//           },
//           {
//             email: process.env.ADMIN_RECEIVER_EMAIL,
//             name: "Pickle Bite Admin",
//           },
//         ],
//         subject: "🛒 PickleBite Order Confirmation",
//         htmlContent: `
// <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">

// <h2 style="color:#0a7f3f;">🛒 Pickle Bite Order Confirmation</h2>

// <p>Hi ${customer.name},</p>
// <p><strong>Thank you for ordering with us!</strong></p>
// <p>Your order has been placed successfully.</p>

// <hr/>

// <h3>👤 Customer Details</h3>
// <p><b>Phone:</b> ${customer.phone}</p>
// <p><b>Delivery Address:</b> ${customer.address}</p>

// <hr/>

// <h3>📦 Order Items</h3>

// ${cart
//   .map(
//     (item) => `
// <p>
// <strong>Product:</strong> ${item.name}<br/>
// <strong>Weight:</strong> ${item.selectedWeight}<br/>
// <strong>Quantity:</strong> ${item.quantity}<br/>
// <strong>Price:</strong> Rs. ${item.price}
// </p>
// <hr/>
// `,
//   )
//   .join("")}

// <p><strong>Order ID:</strong> ${shortOrderId}</p>
// <p><strong>Total Amount Paid:</strong> Rs. ${totalAmount}</p>

// <br/>

// <p>We will contact you shortly regarding delivery.</p>

// <hr/>

// <p style="font-size:14px;">
// Regards,<br/>
// <strong>Pickle Bite Support Team</strong><br/>
// 📧 support@picklebite.in<br/>
// 📍 Bangalore, India
// </p>

// </div>
// `,
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     res.status(201).json({
//       success: true,
//       message: "Order placed & email sent",
//       order,
//     });
//   } catch (error) {
//     console.error("ORDER ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// /* ================= GET MY ORDERS ================= */

// router.get("/my-orders", protect, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user._id }).sort({
//       createdAt: -1,
//     });

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// function calculateComboPrice(cart) {
//   const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

//   if (totalQuantity === 2) {
//     return 349;
//   }

//   if (totalQuantity === 3) {
//     return 499;
//   }

//   return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
// }

// /* ================= UPDATE ORDER STATUS ================= */

// router.put("/update-status/:id", protect, async (req, res) => {
//   try {
//     const { status } = req.body;

//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.orderStatus = status;
//     await order.save();

//     if (status === "DELIVERED") {
//       const user = await User.findById(order.userId);
//       const shortOrderId = order._id.toString().slice(-6).toUpperCase();
//       await axios.post(
//         "https://api.brevo.com/v3/smtp/email",
//         {
//           sender: {
//             name: "Pickle Bite",
//             email: process.env.SENDER_EMAIL,
//           },
//           to: [
//             {
//               email: user.email,
//               name: user.username,
//             },
//             {
//               email: process.env.ADMIN_RECEIVER_EMAIL,
//               name: "Pickle Bite Admin",
//             },
//           ],
//           subject: "🎉 Your PickleBite Order Delivered",
//           htmlContent: `
// <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">

// <h2 style="color:#0a7f3f;">🎉 Your Pickle Bite Order Has Been Delivered!</h2>

// <p>Hi ${user.username},</p>
// <p><strong>Great news!</strong> Your order has been successfully delivered.</p>

// <hr/>

// <h3>👤 Customer Details</h3>
// <p><b>Phone:</b> ${order.customer.phone}</p>
// <p><b>Delivery Address:</b> ${order.customer.address}</p>

// <hr/>

// <h3>📦 Delivered Items</h3>

// ${order.items
//   .map(
//     (item) => `
// <p>
// <strong>Product:</strong> ${item.name}<br/>
// <strong>Weight:</strong> ${item.weight}<br/>
// <strong>Quantity:</strong> ${item.quantity}<br/>
// <strong>Price:</strong> Rs. ${item.price}
// </p>
// <hr/>
// `,
//   )
//   .join("")}

// <p><strong>Order ID:</strong> ${shortOrderId}</p>
// <p><strong>Total Amount Paid:</strong> Rs. ${order.totalAmount}</p>

// <br/>

// <p>We hope you enjoy your pickles 💛</p>
// <p>If you loved the taste, please recommend Pickle Bite to friends and family.</p>

// <hr/>

// <p style="font-size:14px;">
// Regards,<br/>
// <strong>Pickle Bite Support Team</strong><br/>
// 📧 support@picklebite.in<br/>
// 📍 Bangalore, India
// </p>

// </div>
// `,
//         },
//         {
//           headers: {
//             "api-key": process.env.BREVO_API_KEY,
//             "Content-Type": "application/json",
//           },
//         },
//       );
//     }

//     res.json({
//       success: true,
//       message: "Order status updated",
//       order,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const axios = require("axios");
const fs = require("fs");
const { createShipment } = require("../utils/shiprocket");
const generateInvoice = require("../utils/generateInvoice");

const router = express.Router();

/* ================= PLACE ORDER ================= */

router.post("/place", async (req, res) => {
  try {
    const { customer, cart, paymentMethod } = req.body;

    if (!customer || !cart || cart.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const totalAmount = calculateComboPrice(cart);

    // const order = await Order.create({
    //   userId: req.user?._id || null,
    //   items: cart.map((item) => ({
    //     productId: item.id,
    //     name: item.name,
    //     price: item.price,
    //     quantity: item.quantity,
    //     weight: item.selectedWeight,
    //   })),
    //   customer,
    //   paymentMethod,
    //   totalAmount,
    //   paymentStatus: "PAID",
    //   orderStatus: "PLACED",
    // });
    const order = await Order.create({
      userId: req.user?._id || null,
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
    const invoicePath = await generateInvoice(order);
    const invoiceFile = fs.readFileSync(invoicePath);
    const shortOrderId = order._id.toString().slice(-6).toUpperCase();

    /* ================= EMAIL ================= */

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
          {
            email: process.env.ADMIN_RECEIVER_EMAIL,
            name: "Pickle Bite Admin",
          },
        ],
        subject: "🛒 Pickle Bite Order Confirmation",
        htmlContent: `
<div style="font-family: Arial; padding:20px">

<h2 style="color:#0a7f3f">🛒 Pickle Bite Order Confirmation</h2>

<p>Hi ${customer.name},</p>
<p>Your order has been placed successfully.</p>

<hr/>

<h3>Customer Details</h3>

<p><b>Phone:</b> ${customer.phone}</p>
<p><b>Address:</b> ${customer.address}</p>

<hr/>

<h3>Order Items</h3>

${cart
  .map(
    (item) => `
<p>
<b>Product:</b> ${item.name}<br/>
<b>Weight:</b> ${item.selectedWeight}<br/>
<b>Qty:</b> ${item.quantity}<br/>
<b>Price:</b> Rs.${item.price}
</p>
<hr/>
`,
  )
  .join("")}

<p><b>Order ID:</b> ${shortOrderId}</p>
<p><b>Total Paid:</b> Rs.${totalAmount}</p>

<p>We will contact you shortly regarding delivery.</p>

<hr/>

<p>
Regards,<br/>
<b>Pickle Bite Team</b><br/>
support@picklebite.in
</p>

</div>
`,
        attachment: [
          {
            content: invoiceFile.toString("base64"),
            name: `PickleBite-Invoice-${shortOrderId}.pdf`,
          },
        ],
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
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ================= GET ORDERS ================= */

router.get("/my-orders", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const orders = await Order.find({
      "customer.email": email,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= COMBO PRICE ================= */

function calculateComboPrice(cart) {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity === 2) {
    return 349;
  }

  if (totalQuantity === 3) {
    return 499;
  }

  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/* ================= UPDATE ORDER STATUS ================= */

router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;

    await order.save();
    // Create shipment in Shiprocket
    try {
      const shipment = await createShipment(order);

      order.trackingNumber = shipment.awb_code;
      order.shipmentId = shipment.shipment_id;

      await order.save();
    } catch (err) {
      console.log(
        "Shiprocket shipment error:",
        err.response?.data || err.message,
      );
    }
    if (status === "DELIVERED") {
      const shortOrderId = order._id.toString().slice(-6).toUpperCase();

      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Pickle Bite",
            email: process.env.SENDER_EMAIL,
          },
          to: [
            {
              email: order.customer.email,
              name: order.customer.name,
            },
            {
              email: process.env.ADMIN_RECEIVER_EMAIL,
              name: "Pickle Bite Admin",
            },
          ],
          subject: "🎉 Your Pickle Bite Order Delivered",
          htmlContent: `
<div style="font-family: Arial; padding:20px">

<h2 style="color:#0a7f3f">🎉 Your Order Has Been Delivered</h2>

<p>Hi ${order.customer.name},</p>

<p>Your order has been successfully delivered.</p>

<hr/>

<h3>Delivered Items</h3>

${order.items
  .map(
    (item) => `
<p>
<b>${item.name}</b><br/>
Weight: ${item.weight}<br/>
Qty: ${item.quantity}<br/>
Price: Rs.${item.price}
</p>
<hr/>
`,
  )
  .join("")}

<p><b>Order ID:</b> ${shortOrderId}</p>
<p><b>Total Paid:</b> Rs.${order.totalAmount}</p>

<p>We hope you enjoy your pickles ❤️</p>

<hr/>

<p>
Regards,<br/>
<b>Pickle Bite Team</b>
</p>

</div>
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
