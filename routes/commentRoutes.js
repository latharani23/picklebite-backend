const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    const newComment = new Comment({ name, rating, message });
    const saved = await newComment.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
