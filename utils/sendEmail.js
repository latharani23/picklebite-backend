const nodemailer = require("nodemailer");

const sendOrderEmail = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Gmail App Password
      },
    });

    const mailOptions = {
      from: `"Pickle Bite" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "🛒 New Pickle Order Received",
      html: `
        <h2>New Order Received 🎉</h2>
        <p><strong>Name:</strong> ${order.customer.name}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
        <p><strong>Phone:</strong> ${order.customer.phone}</p>
        <p><strong>Address:</strong> ${order.customer.address}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Order email sent");
  } catch (err) {
    console.error("❌ Email error:", err);
  }
};

module.exports = sendOrderEmail;
