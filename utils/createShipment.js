async function createShipment(order) {
  if (
    !order.customer.pincode ||
    order.customer.pincode.toString().length !== 6
  ) {
    throw new Error("Invalid delivery pincode");
  }

  const token = await getShiprocketToken();

  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      order_id: order._id.toString(),
      order_date: new Date(),

      pickup_location: "Primary",

      billing_customer_name: order.customer.name,
      billing_last_name: "",
      billing_address: order.customer.address,
      billing_city: order.customer.city,
      billing_pincode: order.customer.pincode,
      billing_state: order.customer.state,
      billing_country: "India",
      billing_phone: order.customer.phone,

      order_items: order.cart.map((item) => ({
        name: item.name,
        sku: item.name,
        units: item.quantity,
        selling_price: item.price,
      })),

      payment_method: "Prepaid",

      sub_total: order.total,

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
