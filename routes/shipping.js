// const axios = require("axios");

// exports.getShippingRate = async (req, res) => {
//   try {
//     const { pincode, cart } = req.body;

//     // Validation
//     if (!pincode || pincode.toString().length !== 6) {
//       return res.status(400).json({ error: "Invalid pincode" });
//     }

//     if (!cart || cart.length === 0) {
//       return res.status(400).json({ error: "Cart is empty" });
//     }
//     // Total quantity
//     const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

//     // Weight calculation (old logic: every item = 0.25kg)
//     const weight = Math.max(0.25, totalQty * 0.25);

//     console.log("📦 Pincode:", pincode);
//     console.log("🛒 Qty:", totalQty);
//     console.log("⚖️ Weight:", weight);

//     // Bangalore local
//     if (pincode.startsWith("560")) {
//       return res.json({ deliveryCharge: 0 });
//     }

//     // Shiprocket login
//     const login = await axios.post(
//       "https://apiv2.shiprocket.in/v1/external/auth/login",
//       {
//         email: process.env.SHIPROCKET_EMAIL,
//         password: process.env.SHIPROCKET_PASSWORD,
//       },
//     );

//     const token = login.data.token;

//     // Serviceability check
//     const response = await axios.get(
//       "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
//       {
//         params: {
//           pickup_postcode: "560040",
//           delivery_postcode: pincode,
//           weight,
//           cod: 0,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     const couriers = response.data?.data?.available_courier_companies || [];

//     if (!couriers.length) {
//       return res.json({ deliveryCharge: 0 });
//     }

//     // Cheapest courier
//     const cheapest = couriers.reduce((min, c) => (c.rate < min.rate ? c : min));

//     console.log("🚚 Delivery Charge:", cheapest.rate);

//     return res.json({
//       deliveryCharge: cheapest.rate,
//     });
//   } catch (err) {
//     console.error("❌ Shiprocket Error:", err.response?.data || err.message);

//     return res.status(500).json({
//       error: "Shipping calculation failed",
//     });
//   }
// };

const axios = require("axios");

exports.getShippingRate = async (req, res) => {
  try {
    const { pincode, cart } = req.body;

    // Validation
    if (!pincode || pincode.toString().length !== 6) {
      return res.status(400).json({
        error: "Invalid pincode",
      });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        error: "Cart is empty",
      });
    }

    // Calculate total quantity
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Weight calculation
    // Each item = 0.25kg
    const weight = Math.max(0.25, totalQty * 0.25);

    console.log("📦 Pincode:", pincode);
    console.log("🛒 Total Qty:", totalQty);
    console.log("⚖️ Weight:", weight);

    // Shiprocket Login
    const login = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      },
    );

    // Check login response
    if (!login.data || !login.data.token) {
      console.error("❌ Shiprocket login failed:", login.data);

      return res.status(500).json({
        error: "Shiprocket authentication failed",
      });
    }

    const token = login.data.token;

    // Shiprocket serviceability API
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
      {
        params: {
          pickup_postcode: "560040",
          delivery_postcode: pincode,
          weight: weight,
          cod: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("📡 Shiprocket Full Response:", response.data);

    // Available couriers
    const couriers = response.data?.data?.available_courier_companies || [];

    // No courier available
    if (!couriers.length) {
      console.log("⚠️ No courier available");

      return res.json({
        deliveryCharge: 0,
      });
    }

    // Select cheapest courier
    const cheapest = couriers.reduce((min, c) => (c.rate < min.rate ? c : min));

    console.log("🚚 Selected Delivery Charge:", cheapest.rate);

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
