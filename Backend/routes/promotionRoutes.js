const express = require("express");

const router = express.Router();

const {
  createPromotion,
  getPromotions,
  getPromotion,
  updatePromotion,
  deletePromotion,
} = require("../controllers/promotionController");

// Create Promotion
router.post("/", createPromotion);

// Get All Promotions
router.get("/", getPromotions);

// Get Single Promotion
router.get("/:id", getPromotion);

// Update Promotion
router.put("/:id", updatePromotion);
router.post("/", upload.single("profileImage"), createPromotion);

router.put("/:id", upload.single("profileImage"), updatePromotion);
// Delete Promotion
router.delete("/:id", deletePromotion);

module.exports = router;
