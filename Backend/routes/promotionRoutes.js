const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createPromotion,
  getPromotions,
  getPromotion,
  updatePromotion,
  deletePromotion,
} = require("../controllers/promotionController");

router.post("/", upload.single("profileImage"), createPromotion);
router.get("/", getPromotions);
router.get("/:id", getPromotion);
router.put("/:id", upload.single("profileImage"), updatePromotion);
router.delete("/:id", deletePromotion);

module.exports = router;
