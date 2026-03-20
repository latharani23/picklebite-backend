// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: false,
//     },

//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//         weight: String,
//       },
//     ],

//     customer: {
//       name: String,
//       email: String,
//       phone: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },

//     paymentMethod: String,

//     totalAmount: Number,

//     paymentStatus: {
//       type: String,
//       default: "PAID",
//     },

//     orderStatus: {
//       type: String,
//       default: "PLACED",
//     },

//     trackingNumber: String,
//     shipmentId: String,
//     courier: String,
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Order", orderSchema);

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
// const OrderSchema = new mongoose.Schema(
//   {
//     userId: String,

//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//         weight: String,
//       },
//     ],

//     customer: {
//       name: String,
//       email: String,
//       phone: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },

//     paymentMethod: String,
//     totalAmount: Number,

//     paymentStatus: {
//       type: String,
//       default: "PENDING",
//     },

//     orderStatus: {
//       type: String,
//       default: "PLACED",
//     },

//     shipmentId: Number,
//     awbCode: String,
//     courier: String,
//     trackingUrl: String,
//   },
//   { timestamps: true },
// );

module.exports = mongoose.model("Order", OrderSchema);
