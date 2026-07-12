const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: String,

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

    paymentMethod: String,

    // ⭐ NEW FIELDS
    subtotal: {
      type: Number,
      default: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },
    actualDeliveryCharge: {
      type: Number,
      default: 0,
    },
    sampleBox: {
  type: [
    {
      items: {
        type: [String],
        default: [],
      },
      totalPrice: {
        type: Number,
        default: 0,
      },
    },
  ],
  default: [],
},
    extraDeliveryAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: Number,

    paymentStatus: {
      type: String,
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      default: "PLACED",
    },

    shipmentId: Number,
    awbCode: String,
    courier: String,
    trackingUrl: String,
  },
  { timestamps: true },
);
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
