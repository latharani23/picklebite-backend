const WhatsappOrder = require("../models/WhatsappOrder");
// Create Order
exports.createWhatsappOrder = async (req, res) => {
  try {
    const order = await WhatsappOrder.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders
exports.getWhatsappOrders = async (req, res) => {
  try {
    const orders = await WhatsappOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Order
exports.getWhatsappOrder = async (req, res) => {
  try {
    const order = await WhatsappOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order
exports.updateWhatsappOrder = async (req, res) => {
  try {
    const order = await WhatsappOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order
exports.deleteWhatsappOrder = async (req, res) => {
  try {
    await WhatsappOrder.findByIdAndDelete(req.params.id);

    res.json({
      message: "WhatsApp Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
