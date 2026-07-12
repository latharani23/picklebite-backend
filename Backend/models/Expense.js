const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Raw Material",
    },

    quantity: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,
      default: "Kg",
    },

    price: {
      type: Number,
      required: true,
    },

    vendor: {
      type: String,
      default: "",
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Expense", expenseSchema);
