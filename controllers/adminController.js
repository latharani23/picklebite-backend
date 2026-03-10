exports.getAnalytics = async (req, res) => {
  const orders = await Order.find();

  let revenueByDate = {};
  let productSales = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString();

    revenueByDate[date] = (revenueByDate[date] || 0) + order.totalAmount;

    order.items.forEach((item) => {
      productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
    });
  });

  const revenueLabels = Object.keys(revenueByDate);
  const revenueData = Object.values(revenueByDate);

  const topProduct = Object.entries(productSales).sort(
    (a, b) => b[1] - a[1],
  )[0];

  res.json({
    revenueLabels,
    revenueData,
    topProduct,
  });
};
