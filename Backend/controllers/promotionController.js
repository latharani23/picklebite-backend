const Promotion = require("../models/Promotion");

// Create Promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion({
      ...req.body,
      profileImage: req.file ? req.file.filename : "",
    });
    // Auto calculate ROI
    promotion.roi =
      (promotion.revenueGenerated || 0) - (promotion.promotionCost || 0);

    await promotion.save();

    res.status(201).json({
      success: true,
      message: "Promotion added successfully",
      data: promotion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Promotions
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: promotions.length,
      data: promotions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Promotion
exports.getPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    res.json({
      success: true,
      data: promotion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Promotion
exports.updatePromotion = async (req, res) => {
  try {
    req.body.roi =
      (req.body.revenueGenerated || 0) - (req.body.promotionCost || 0);
    if (req.file) {
      req.body.profileImage = req.file.filename;
    }
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.json({
      success: true,
      message: "Promotion updated successfully",
      data: promotion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Promotion
exports.deletePromotion = async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Promotion deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
