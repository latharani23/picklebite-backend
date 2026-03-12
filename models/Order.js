const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // guest checkout allowed
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        weight: String,
      },
    ],

    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      default: "UPI",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "PAID",
    },

    orderStatus: {
      type: String,
      default: "PLACED",
    },

    /* ===== SHIPROCKET TRACKING ===== */

    trackingNumber: String,
    shipmentId: String,
    courier: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
