const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ======================
// GET USER CART
// ======================
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// ADD TO CART
// ======================
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex((i) => i.productId === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        productId,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add to cart failed" });
  }
});

// ======================
// REMOVE ITEM
// ======================
router.delete("/remove/:id", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    cart.items = cart.items.filter((i) => i.productId !== req.params.id);

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Remove failed" });
  }
});

// ======================
// CLEAR CART
// ======================
router.delete("/clear", protect, async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ success: true });
});

module.exports = router;
