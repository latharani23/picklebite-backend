const axios = require("axios");

exports.getShippingRate = async (req, res) => {
  try {
    const { pincode } = req.body;

    // 1️⃣ Login to Shiprocket
    const login = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      },
    );

    const token = login.data.token;

    // 2️⃣ Call courier serviceability API
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
      {
        params: {
          pickup_postcode: "560040",
          delivery_postcode: pincode,
          weight: 0.5,
          cod: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const couriers = response.data.data.available_courier_companies;

    if (!couriers || couriers.length === 0) {
      return res.json({ deliveryCharge: 0 });
    }

    res.json({
      deliveryCharge: couriers[0].rate,
    });
  } catch (err) {
    console.error("Shiprocket Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Shipping error" });
  }
};
