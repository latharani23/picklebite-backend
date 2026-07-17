const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      required: true,
    },

    whatsapp: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      enum: ["Instagram", "YouTube", "Facebook", "WhatsApp", "Other"],
      default: "Instagram",
    },

    instagramUsername: {
      type: String,
      default: "",
    },

    followers: {
      type: Number,
      default: 0,
    },

    averageViews: {
      type: Number,
      default: 0,
    },

    engagementRate: {
      type: String,
      default: "",
    },

    campaignName: {
      type: String,
      default: "",
    },

    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    promotionCost: {
      type: Number,
      default: 0,
    },

    courierPartner: {
      type: String,
      default: "",
    },

    trackingNumber: {
      type: String,
      default: "",
    },

    courierCharge: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: "",
    },

    expectedPostDate: {
      type: Date,
    },

    actualPostDate: {
      type: Date,
    },

    ordersGenerated: {
      type: Number,
      default: 0,
    },

    revenueGenerated: {
      type: Number,
      default: 0,
    },

    roi: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Product Sent",
        "Reel Posted",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Promotion", promotionSchema);
