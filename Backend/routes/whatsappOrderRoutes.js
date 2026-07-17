const express = require("express");
const router = express.Router();

const {
  createWhatsappOrder,
  getWhatsappOrders,
  getWhatsappOrder,
  updateWhatsappOrder,
  deleteWhatsappOrder,
} = require("../controllers/whatsappOrderController");

router.post("/", createWhatsappOrder);
router.get("/", getWhatsappOrders);
router.get("/:id", getWhatsappOrder);
router.put("/:id", updateWhatsappOrder);
router.delete("/:id", deleteWhatsappOrder);

module.exports = router;
