const axios = require("axios");

exports.getShippingRate = async (req, res) => {
  try {
    const { pincode, cart } = req.body;

    // Validation
    if (!pincode || pincode.toString().length !== 6) {
      return res.status(400).json({ error: "Invalid pincode" });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    const totalWeight = cart.reduce((sum, item) => {
      let itemWeight = 0;

      if (item.selectedWeight === "200g") itemWeight = 0.2;
      else if (item.selectedWeight === "500g") itemWeight = 0.5;
      else if (item.selectedWeight === "1kg") itemWeight = 1;
      else itemWeight = 0.25; // fallback

      return sum + itemWeight * item.quantity;
    }, 0);

    const weight = Math.max(0.25, totalWeight);

    console.log("📦 Pincode:", pincode);
    console.log("🛒 Qty:", totalQty);
    console.log("⚖️ Weight:", weight);

    // Bangalore local
    if (pincode.startsWith("560")) {
      return res.json({ deliveryCharge: 0 });
    }

    // Shiprocket login
    const login = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      },
    );

    const token = login.data.token;

    // Serviceability check
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
      {
        params: {
          pickup_postcode: "560040",
          delivery_postcode: pincode,
          weight,
          cod: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const couriers = response.data?.data?.available_courier_companies || [];

    if (!couriers.length) {
      return res.json({ deliveryCharge: 0 });
    }

    // Cheapest courier
    const cheapest = couriers.reduce((min, c) => (c.rate < min.rate ? c : min));

    console.log("🚚 Delivery Charge:", cheapest.rate);

    return res.json({
      deliveryCharge: cheapest.rate,
    });
  } catch (err) {
    console.error("❌ Shiprocket Error:", err.response?.data || err.message);

    return res.status(500).json({
      error: "Shipping calculation failed",
    });
  }
};
