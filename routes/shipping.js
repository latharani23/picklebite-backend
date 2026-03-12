const axios = require("axios");

exports.getShippingRate = async (req, res) => {
  try {
    const { pincode } = req.body;

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
          Authorization: `Bearer ${process.env.SHIPROCKET_TOKEN}`,
        },
      },
    );

    const courier = response.data.data.available_courier_companies[0];

    res.json({
      deliveryCharge: courier.rate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Shipping error" });
  }
};
