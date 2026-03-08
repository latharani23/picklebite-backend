// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   items: [
//     {
//       productId: String,
//       name: String,
//       price: Number,
//       quantity: Number,
//     },
//   ],
// });

// module.exports = mongoose.model("Cart", cartSchema);

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: String,
      name: String,
      image: String,
      selectedWeight: String, // 200g / 300g
      price: Number,
      quantity: Number,
    },
  ],

  /* ================= DELIVERY DETAILS ================= */

  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },

  /* ================= ORDER DETAILS ================= */

  totalItems: Number,

  subtotal: Number,

  comboApplied: {
    type: Boolean,
    default: false,
  },

  comboType: {
    type: String,
    enum: ["2for349", "3for499", "none"],
    default: "none",
  },

  totalAmount: Number,

  paymentMethod: {
    type: String,
    default: "RAZORPAY",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
