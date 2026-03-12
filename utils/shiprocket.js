// const axios = require("axios");

// async function getShiprocketToken() {
//   const login = await axios.post(
//     "https://apiv2.shiprocket.in/v1/external/auth/login",
//     {
//       email: process.env.SHIPROCKET_EMAIL,
//       password: process.env.SHIPROCKET_PASSWORD,
//     },
//   );

//   return login.data.token;
// }

// async function createShipment(order) {
//   const token = await getShiprocketToken();

//   const response = await axios.post(
//     "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
//     {
//       order_id: order._id.toString(),
//       order_date: new Date(),

//       pickup_location: "Primary",

//       billing_customer_name: order.customer.name,
//       billing_last_name: "",
//       billing_address: order.customer.address,
//       billing_city: order.customer.city,
//       billing_pincode: order.customer.pincode,
//       billing_state: order.customer.state,
//       billing_country: "India",
//       billing_phone: order.customer.phone,

//       order_items: order.items.map((item) => ({
//         name: item.name,
//         sku: item.name,
//         units: item.quantity,
//         selling_price: item.price,
//       })),

//       payment_method: "Prepaid",

//       sub_total: order.totalAmount,

//       length: 10,
//       breadth: 10,
//       height: 10,
//       weight: 0.5,
//     },

//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   return response.data;
// }

// module.exports = { createShipment };

const axios = require("axios");

async function getShiprocketToken() {
  const login = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    },
  );

  return login.data.token;
}

async function createShipment(order) {
  const token = await getShiprocketToken();

  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      order_id: order._id.toString(),
      order_date: new Date(),

      pickup_location: "Primary",

      billing_customer_name: order.customer.name,
      billing_last_name: ".",

      billing_address: order.customer.address,
      billing_city: order.customer.city,
      billing_pincode: order.customer.pincode,
      billing_state: order.customer.state,
      billing_country: "India",
      billing_phone: order.customer.phone,

      shipping_is_billing: true,

      order_items: order.items.map((item) => ({
        name: item.name,
        sku: item.name,
        units: item.quantity,
        selling_price: item.price,
      })),

      payment_method: "Prepaid",
      sub_total: order.totalAmount,

      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

module.exports = { createShipment };
