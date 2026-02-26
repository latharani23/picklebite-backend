import express from "express";
import Product from "../models/Product.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      subCategory: req.body.subCategory,
      price: req.body.price,
      image: req.file.filename,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;
