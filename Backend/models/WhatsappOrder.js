const mongoose = require("mongoose");

const whatsappOrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "Bank Transfer", "Cash"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Received", "Packing", "Shipped", "Delivered", "Cancelled"],
      default: "Received",
    },
    courier: String,
    trackingId: String,
    address: String,
    notes: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("WhatsappOrder", whatsappOrderSchema);
