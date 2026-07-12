import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/const";
import { useMemo } from "react";
import DownloadReportButton from "../components/DownloadReportButton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [pending, setPending] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("recent");
  const adminToken = localStorage.getItem("adminToken");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // you can change to 10
  const [expenses, setExpenses] = useState(0);

  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-login");
      return;
    }

    fetchDashboardData();
  }, [adminToken, navigate]);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setUsers(data);
      setShowUsers(true);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      console.log(data);

      setOrders(data.orders);
      setUsersCount(data.usersCount);
      setRevenue(data.revenue);
      setPending(data.pendingAmount);
      setExpenses(data.expenses || 0);
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchDashboardData = async () => {
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
  //       headers: {
  //         Authorization: `Bearer ${adminToken}`,
  //       },
  //     });

  //     setOrders(data.orders);
  //     setUsersCount(data.usersCount);
  //     setRevenue(data.revenue);
  //     setPending(data.pendingAmount);
  //   } catch (error) {
  //     console.error(error);

  //     // ⭐ FIX HERE
  //     if (error.response?.status === 401) {
  //       localStorage.removeItem("adminToken");
  //       navigate("/admin-login");
  //     }
  //   }
  // };
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // ✅ 24-hour format
    });

    return `${day}-${month}-${year} ${time}`;
  };
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const formatOrderId = (id) => {
    if (!id) return "";
    return id.slice(-6).toUpperCase();
  };
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${BASE_URL}/api/admin/order/${orderId}`,
        { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );
      fetchDashboardData(); // refresh
      setSelectedOrder(null);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredOrders = [...orders];

  // 🔎 SEARCH
  if (searchTerm.trim() !== "") {
    filteredOrders = filteredOrders.filter((order) => {
      const shortId = formatOrderId(order._id);

      return (
        order.customer?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customer?.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        shortId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  // 📦 STATUS FILTER
  if (statusFilter !== "ALL") {
    filteredOrders = filteredOrders.filter(
      (order) => order.orderStatus === statusFilter,
    );
  }

  // 🔃 SORTING
  switch (sortOption) {
    case "recent":
      filteredOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      break;

    case "oldest":
      filteredOrders.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
      break;

    case "highAmount":
      filteredOrders.sort((a, b) => b.totalAmount - a.totalAmount);
      break;

    case "lowAmount":
      filteredOrders.sort((a, b) => a.totalAmount - b.totalAmount);
      break;

    default:
      break;
  }

  // 📄 PAGINATION (MUST BE LAST)
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const downloadCustomerInvoice = (order) => {
    const doc = new jsPDF();

    // Colors
    const royalPurple = [75, 0, 130];
    const white = [255, 255, 255];

    // Header Background
    doc.setFillColor(...royalPurple);
    doc.rect(0, 0, 210, 30, "F");

    // Heading
    doc.setTextColor(...white);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PICKLEBITE CUSTOMER DETAILS", 105, 18, {
      align: "center",
    });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let y = 40;

    // Order Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Order Information", 14, y);

    y += 8;

    doc.setFont("helvetica", "normal");

    doc.text(`Order ID : #${formatOrderId(order._id)}`, 14, y);
    y += 7;

    doc.text(`Date : ${formatDateTime(order.createdAt)}`, 14, y);
    y += 7;

    doc.text(`Order Status : ${order.orderStatus}`, 14, y);
    y += 7;

    doc.text(`Payment Status : ${order.paymentStatus}`, 14, y);
    y += 7;

    doc.text(`Payment Method : ${order.paymentMethod}`, 14, y);

    y += 12;

    // Customer Details Section
    doc.setFillColor(240, 240, 240);
    doc.rect(10, y - 5, 190, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 14, y);

    y += 10;

    doc.setFont("helvetica", "normal");

    doc.text(`Name : ${order.customer?.name || "-"}`, 14, y);
    y += 7;

    doc.text(`Email : ${order.customer?.email || "-"}`, 14, y);
    y += 7;

    doc.text(`Phone : ${order.customer?.phone || "-"}`, 14, y);
    y += 7;

    doc.text(`Pincode : ${order.customer?.pincode || "-"}`, 14, y);
    y += 7;

    const address = order.customer?.address || "Address not available";

    const splitAddress = doc.splitTextToSize(address, 170);

    doc.text("Address :", 14, y);
    doc.text(splitAddress, 40, y);

    y += splitAddress.length * 6 + 10;

    // Product Table
    doc.setFont("helvetica", "bold");
    doc.text("Ordered Products", 14, y);

    y += 5;

    autoTable(doc, {
      startY: y,
      head: [["Product", "Weight", "Qty", "Price", "Total"]],
      body: order.items.map((item) => [
        item.name,
        item.weight,
        item.quantity,
        `Rs. ${item.price}`,
        `Rs. ${item.price * item.quantity}`,
      ]),
      headStyles: {
        fillColor: royalPurple,
        textColor: white,
      },
    });

    y = doc.lastAutoTable.finalY + 10;

    // Charges Section
    doc.setFillColor(240, 240, 240);
    doc.rect(10, y - 5, 190, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.text("Payment Summary", 14, y);

    y += 10;

    doc.setFont("helvetica", "normal");

    doc.text(`Subtotal : Rs. ${order.subtotal || order.totalAmount}`, 14, y);

    y += 7;

    doc.text(`Delivery Charge : Rs. ${order.deliveryCharge || 0}`, 14, y);

    y += 7;

    doc.text(
      `Actual Delivery Charge : Rs. ${order.actualDeliveryCharge || 0}`,
      14,
      y,
    );

    y += 7;

    const profitLoss =
      (order.deliveryCharge || 0) - (order.actualDeliveryCharge || 0);

    doc.text(`Profit / Loss : Rs. ${profitLoss}`, 14, y);

    y += 7;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);

    doc.text(`Grand Total : Rs. ${order.totalAmount}`, 14, y);

    // Footer
    doc.setFillColor(...royalPurple);
    doc.rect(0, 280, 210, 17, "F");

    doc.setTextColor(...white);
    doc.setFontSize(10);

    doc.text("Thank you for choosing PickleBite", 105, 290, {
      align: "center",
    });

    doc.save(`PickleBite-Invoice-${formatOrderId(order._id)}.pdf`);
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f5ff",
          display: "flex",
        }}
      >
        {/* Sidebar */}

        <div
          style={{
            width: "260px",
            background: "#6A0DAD",
            color: "#fff",
            padding: "25px",
            boxShadow: "0 0 15px rgba(0,0,0,0.15)",
          }}
        >
          <h2 className="fw-bold mb-4">PickleBite</h2>

          <div className="d-flex flex-column gap-3">
            <button className="btn btn-light text-start">Dashboard</button>

            <button
              className="btn btn-outline-light text-start"
              onClick={() => navigate("/Orders")}
            >
              Orders
            </button>

            <button
              className="btn btn-outline-light text-start"
              onClick={() => navigate("/expenses")}
            >
              Expenses
            </button>

            <button className="btn btn-danger mt-5" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}

        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1
              style={{
                color: "#4B0082",
                fontWeight: "bold",
              }}
            >
              Admin Dashboard
            </h1>

            <div
              style={{
                background: "#fff",
                padding: "10px 20px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              Welcome Admin 👋
            </div>
          </div>

          {/* Summary Cards */}

          <div className="row g-4 mb-4">
            <div className="col-md-2">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h5>Total Orders</h5>
                  <h2 style={{ color: "#6A0DAD" }}>{orders.length}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h5>Total Revenue</h5>
                  <h2 style={{ color: "#6A0DAD" }}>₹ {revenue}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h5>Pending Amount</h5>
                  <h2 style={{ color: "#6A0DAD" }}>₹ {pending}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h5>Total Expenses</h5>
                  <h2 style={{ color: "#dc3545" }}>₹ {expenses}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h5>Net Profit</h5>
                  <h2 style={{ color: "#28a745" }}>
                    ₹ {(revenue - expenses).toFixed(2)}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card border-0 shadow"
                style={{
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={fetchUsers}
              >
                <div className="card-body text-center">
                  <h5>Total Customers</h5>
                  <h2 style={{ color: "#6A0DAD" }}>{usersCount}</h2>
                </div>
              </div>
            </div>
          </div>
          {/* Advanced Analytics */}

          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h6 className="text-muted">Delivered Orders</h6>
                  <h2 style={{ color: "#28a745" }}>
                    {
                      orders.filter(
                        (order) => order.orderStatus === "DELIVERED",
                      ).length
                    }
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h6 className="text-muted">Pending Orders</h6>
                  <h2 style={{ color: "#ffc107" }}>
                    {
                      orders.filter(
                        (order) =>
                          order.orderStatus === "PLACED" ||
                          order.orderStatus === "SHIPPED",
                      ).length
                    }
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">
                  <h6 className="text-muted">Cancelled Orders</h6>
                  <h2 style={{ color: "#dc3545" }}>
                    {
                      orders.filter(
                        (order) => order.orderStatus === "CANCELLED",
                      ).length
                    }
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">
                  <h5 style={{ color: "#4B0082" }}>Business Insights</h5>

                  <hr />

                  <p>
                    <strong>Average Order Value:</strong> ₹
                    {orders.length ? (revenue / orders.length).toFixed(2) : 0}
                  </p>

                  <p>
                    <strong>Total Customers:</strong> {usersCount}
                  </p>

                  <p>
                    <strong>Total Orders:</strong> {orders.length}
                  </p>

                  <p>
                    <strong>Revenue per Customer:</strong> ₹
                    {usersCount ? (revenue / usersCount).toFixed(2) : 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">
                  <h5 style={{ color: "#4B0082" }}>Order Status Overview</h5>

                  <hr />

                  <p>
                    🟢 Delivered :
                    {orders.filter((o) => o.orderStatus === "DELIVERED").length}
                  </p>

                  <p>
                    🚚 Shipped :
                    {orders.filter((o) => o.orderStatus === "SHIPPED").length}
                  </p>

                  <p>
                    📦 Placed :
                    {orders.filter((o) => o.orderStatus === "PLACED").length}
                  </p>

                  <p>
                    ❌ Cancelled :
                    {orders.filter((o) => o.orderStatus === "CANCELLED").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}

          <div
            className="card border-0 shadow mb-4"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h4 className="mb-3" style={{ color: "#4B0082" }}>
                Quick Actions
              </h4>

              <div className="d-flex gap-2 flex-wrap">
                <DownloadReportButton
                  orders={orders}
                  revenue={revenue}
                  pending={pending}
                  usersCount={usersCount}
                  formatOrderId={formatOrderId}
                  formatDateTime={formatDateTime}
                />

                <button
                  className="btn"
                  style={{
                    background: "#6A0DAD",
                    color: "#fff",
                  }}
                  onClick={() => navigate("/expenses")}
                >
                  Manage Expenses
                </button>
              </div>
            </div>
          </div>

          {/* Search Filters */}

          <div
            className="card border-0 shadow p-3 mb-4"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Search Orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="PLACED">Placed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="col-md-2">
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="recent">Recent First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highAmount">Highest Amount</option>
                  <option value="lowAmount">Lowest Amount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}

          <div
            className="card border-0 shadow"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h4
                className="mb-4"
                style={{
                  color: "#4B0082",
                }}
              >
                Recent Orders
              </h4>

              {/* KEEP YOUR EXISTING TABLE HERE */}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          body{
            background:#f8f5ff;
          }

          .table thead{
            background:#6A0DAD;
            color:white;
          }

          .table th{
            border:none;
          }

          .card{
            transition:.3s;
          }

          .card:hover{
            transform:translateY(-3px);
          }

          .btn-primary{
            background:#6A0DAD;
            border:none;
          }

          .btn-primary:hover{
            background:#7b2cbf;
          }

          .modal-content{
            border-radius:20px;
          }

          .sidebar-btn{
            transition:0.3s;
          }

          .sidebar-btn:hover{
            background:white !important;
            color:#6A0DAD !important;
          }

          .summary-card{
            border-radius:20px;
            border:none;
            background:white;
          }

          .summary-card h2{
            color:#6A0DAD;
            font-weight:700;
          }

          .dashboard-title{
            color:#4B0082;
            font-weight:700;
          }
        `}
      </style>
    </>
  );
};

export default AdminDashboard;
