const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
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

router.post("/add", upload.array("media", 5), async (req, res) => {
  try {
    console.log("===== FEEDBACK REQUEST =====");
    console.log(req.body);
    console.log("FILES:", req.files);

    const { name, rating, message, productsTried } = req.body;

    const mediaFiles =
      req.files?.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      ) || [];
    const newComment = new Comment({
      name,
      rating,
      message,
      productsTried:
        typeof productsTried === "string"
          ? JSON.parse(productsTried)
          : productsTried,
      mediaFiles,
    });

    const saved = await newComment.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("===== FEEDBACK ERROR =====");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
