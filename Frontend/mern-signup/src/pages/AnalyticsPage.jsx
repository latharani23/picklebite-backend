import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 🔥 Replace with your backend API
    const fetchData = async () => {
      const res = await fetch("/api/analytics");
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  // 📈 Line Chart Data
  const lineData = {
    labels: data.dailyOrders.map((d) => d.date),
    datasets: [
      {
        label: "Daily Orders",
        data: data.dailyOrders.map((d) => d.count),
        tension: 0.3,
      },
    ],
  };

  // 🥇 Bar Chart Data
  const barData = {
    labels: data.topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Top Selling Pickles",
        data: data.topProducts.map((p) => p.quantity),
      },
    ],
  };

  // 🔍 Filter Orders
  const filteredOrders = data.orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        📊 Analytics Dashboard
      </Typography>

      {/* 🔹 Cards */}
      <Grid container spacing={2}>
        {[
          { title: "Today's Orders", value: data.todayOrders },
          { title: "Revenue", value: `₹${data.todayRevenue}` },
          { title: "Pending", value: data.pendingOrders },
          { title: "Delivered", value: data.deliveredOrders },
        ].map((item, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📈 Line Chart */}
      <Box mt={5}>
        <Typography variant="h6">Daily Orders Trend</Typography>
        <Line data={lineData} />
      </Box>

      {/* 🥇 Bar Chart */}
      <Box mt={5}>
        <Typography variant="h6">Top Selling Pickles</Typography>
        <Bar data={barData} />
      </Box>

      {/* 🔍 Search */}
      <Box mt={5}>
        <TextField
          label="Search by Customer"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* 🧾 Table */}
      <Box mt={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
