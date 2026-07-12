// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API } from "../constants/const";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
// } from "chart.js";

// import { Bar, Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// const AdminAnalytics = () => {
//   const [revenueLabels, setRevenueLabels] = useState([]);
//   const [revenueData, setRevenueData] = useState([]);
//   const [topProduct, setTopProduct] = useState(null);

//   const adminToken = localStorage.getItem("adminToken");

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const fetchAnalytics = async () => {
//     try {
//       const { data } = await axios.get(API.ADMIN_ANALYTICS, {
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//         },
//       });

//       setRevenueLabels(data.revenueLabels);
//       setRevenueData(data.revenueData);
//       setTopProduct(data.topProduct);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const revenueChart = {
//     labels: revenueLabels,
//     datasets: [
//       {
//         label: "Daily Revenue",
//         data: revenueData,
//         borderColor: "green",
//         backgroundColor: "rgba(0,128,0,0.2)",
//       },
//     ],
//   };

//   const ordersChart = {
//     labels: revenueLabels,
//     datasets: [
//       {
//         label: "Orders",
//         data: revenueData.map((v) => Math.round(v / 100)),
//         backgroundColor: "orange",
//       },
//     ],
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">📊 PickleBite Analytics Dashboard</h2>

//       {topProduct && (
//         <div className="card p-3 mb-4">
//           <h4>🥇 Top Selling Pickle</h4>

//           <p>
//             <strong>{topProduct[0]}</strong>
//           </p>

//           <p>Total Sold: {topProduct[1]}</p>
//         </div>
//       )}

//       <div className="card p-4 mb-5">
//         <h4>📈 Revenue Trend</h4>

//         <Line data={revenueChart} />
//       </div>

//       <div className="card p-4">
//         <h4>📦 Orders Per Day</h4>

//         <Bar data={ordersChart} />
//       </div>
//     </div>
//   );
// };

// export default AdminAnalytics;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../constants/const";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const styles = {
  container: {
    padding: "30px",
    background: "#f6f7fb",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 12px rgba(0,0,0,0.05)",
  },

  cardGreen: {
    borderLeft: "4px solid #2ecc71",
  },

  cardOrange: {
    borderLeft: "4px solid #f39c12",
  },

  charts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
  },

  chartCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 12px rgba(0,0,0,0.05)",
  },

  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
};

const AdminAnalytics = () => {
  const [revenueLabels, setRevenueLabels] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topProduct, setTopProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(API.ADMIN_ANALYTICS, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setRevenueLabels(data.revenueLabels);
      setRevenueData(data.revenueData);
      setTopProduct(data.topProduct);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const revenueChart = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46,204,113,0.2)",
        tension: 0.4,
      },
    ],
  };

  const ordersChart = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Orders",
        data: revenueData.map((v) => Math.round(v / 100)),
        backgroundColor: "#f39c12",
      },
    ],
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div className="spinner-border"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2>📊 PickleBite Analytics</h2>
        <p style={{ color: "#777" }}>
          Monitor sales performance and product insights
        </p>
      </div>

      {/* Cards */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <p style={{ color: "#777" }}>Total Revenue</p>
          <h3>₹ {revenueData.reduce((a, b) => a + b, 0)}</h3>
        </div>

        <div style={{ ...styles.card, ...styles.cardOrange }}>
          <p style={{ color: "#777" }}>Total Orders</p>
          <h3>{revenueData.length}</h3>
        </div>

        {topProduct && (
          <div style={{ ...styles.card, ...styles.cardGreen }}>
            <p style={{ color: "#777" }}>Top Product</p>
            <h3>{topProduct[0]}</h3>
            <small>{topProduct[1]} sold</small>
          </div>
        )}
      </div>

      {/* Charts */}
      <div style={styles.charts}>
        <div style={styles.chartCard}>
          <h4>Revenue Trend</h4>
          <Line data={revenueChart} />
        </div>

        <div style={styles.chartCard}>
          <h4>Orders Per Day</h4>
          <Bar data={ordersChart} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
