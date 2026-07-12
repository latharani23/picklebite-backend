import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/const";
import { useMemo } from "react";
import DownloadReportButton from "../components/DownloadReportButton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Orders = () => {
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
  let filteredOrders = [...orders];

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
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📊 Admin Dashboard</h2>

          <div className="d-flex gap-2">
            <DownloadReportButton
              orders={orders}
              revenue={revenue}
              pending={pending}
              usersCount={usersCount}
              formatOrderId={formatOrderId}
              formatDateTime={formatDateTime}
            />

            <button
              className="btn btn-danger"
              onClick={handleLogout}
              aria-label="Admin Logout"
            >
              Logout
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/expenses")}
            >
              💰 PickleBite Expenses
            </button>
          </div>
        </div>
        <div>
          {/* <button
    className="btn btn-info me-2"
    onClick={() => navigate("/analytics")}
  >
    📊 Analytics
  </button>

  <button
    className="btn btn-danger"
    onClick={handleLogout}S
  >
    Logout
  </button> */}
        </div>

        {/* ====== SUMMARY CARDS ====== */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-primary p-3">
              <h5>Total Orders</h5>
              <h3>{orders.length}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-success p-3">
              <h5>Revenue Received</h5>
              <h3>Rs. {revenue}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-warning p-3">
              <h5>Pending Amount</h5>
              <h3>Rs. {pending}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card text-white bg-dark p-3"
              style={{ cursor: "pointer" }}
              onClick={fetchUsers}
            >
              <h5>Total Users</h5>
              <h3>{usersCount}</h3>
              <small>Click to view users</small>
            </div>
          </div>
        </div>
        {showUsers && (
          <div className="modal show d-block">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">👥 All Users</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowUsers(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              aria-label="Search orders by customer name email or order id"
              className="form-control"
              placeholder="Search by name, email or order id..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="ALL">All Status</option>
              <option value="PLACED">PLACED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="recent">Recent First</option>
              <option value="oldest">Oldest First</option>
              <option value="highAmount">Highest Amount</option>
              <option value="lowAmount">Lowest Amount</option>
            </select>
          </div>
        </div>
        {/* ====== ORDERS TABLE ====== */}
        <div className="card p-3">
          <h4>📦 Recent Orders</h4>
          <div className="table-responsive">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Order Id</th>
                  <th>Items Ordered</th>
                  <th>Subtotal</th>
                  <th>Delivery</th>
                  <th>Actual Delivery</th>
                  <th>Profit / Loss</th>
                  <th>Total</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Download Invoice</th>
                </tr>
              </thead>
              {/* <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.customer?.name}</td>
                <td>{order.customer?.email}</td>
                <td>₹ {order.totalAmount}</td>
                <td>
                  <span
                    className={
                      order.paymentStatus === "PAID"
                        ? "badge bg-success"
                        : "badge bg-warning"
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody> */}

              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.customer?.name} <br />
                      <small>{order.customer?.email}</small>
                    </td>

                    <td>#{formatOrderId(order._id)}</td>

                    <td>
                      {order.items?.map((item, i) => (
                        <div key={i}>
                          • {item.name} ({item.weight}) × {item.quantity}
                        </div>
                      ))}
                    </td>

                    <td>Rs. {order.subtotal || order.totalAmount}</td>

                    <td>
                      {order.deliveryCharge === 0 ? (
                        <span className="badge bg-success">FREE</span>
                      ) : (
                        `Rs. ${order.deliveryCharge || 0}`
                      )}
                    </td>
                    <td style={{ minWidth: "140px" }}>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Rs. Actual Delivery"
                        value={order.actualDeliveryCharge || ""}
                        onChange={(e) => {
                          const updatedOrders = orders.map((o) =>
                            o._id === order._id
                              ? {
                                  ...o,
                                  actualDeliveryCharge: Number(e.target.value),
                                }
                              : o,
                          );

                          setOrders(updatedOrders);
                        }}
                      />
                    </td>

                    <td style={{ minWidth: "120px" }}>
                      {order.actualDeliveryCharge ? (
                        (() => {
                          const difference =
                            order.deliveryCharge - order.actualDeliveryCharge;

                          return difference >= 0 ? (
                            <span className="badge bg-success">
                              +Rs. {difference}
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              -Rs. {Math.abs(difference)}
                            </span>
                          );
                        })()
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <strong>Rs. {order.totalAmount}</strong>
                    </td>

                    <td>{order.paymentMethod}</td>

                    <td>
                      <span
                        className={
                          order.paymentStatus === "PAID"
                            ? "badge bg-success"
                            : "badge bg-warning"
                        }
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td>{order.orderStatus}</td>

                    <td>{formatDateTime(order.createdAt)}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          console.log("Order:", order);
                          console.log("Items:", order.items);
                          console.log("First Item:", order.items?.[0]);
                          console.log(
                            "First Item Name:",
                            order.items?.[0]?.name,
                          );

                          setSelectedOrder(order);
                        }}
                        S
                      >
                        View Details
                      </button>
                    </td>

                    <td>{order.customer?.address}</td>

                    <td>{order.customer?.pincode}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => downloadCustomerInvoice(order)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {selectedOrder && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Order Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedOrder(null)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <h6>👤 Customer Info</h6>
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.customer?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.customer?.phone}
                    </p>
                    <p>
                      <strong>Order ID:</strong> #
                      {formatOrderId(selectedOrder._id)}
                    </p>

                    <hr />

                    <h6>📦 Items Ordered</h6>
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="border p-2 mb-2 rounded">
                        <p>
                          <strong>Product:</strong> {item.name}
                        </p>
                        <p>
                          <strong>Weight:</strong> {item.weight}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> Rs. {item.price}
                        </p>
                      </div>
                    ))}

                    <hr />
                    <hr />

                    {selectedOrder.sampleBox?.length > 0 && (
                      <>
                        <h6>🎁 Customer Sample Box Preferences</h6>

                        {selectedOrder.sampleBox.map((box, index) => (
                          <div key={index} className="border p-3 rounded mb-3">
                            <p>
                              <strong>Sample Box Price:</strong> ₹
                              {box.totalPrice}
                            </p>

                            <strong>Selected Samples:</strong>

                            {box.items.map((sample, i) => (
                              <div key={i}>✅ {sample}</div>
                            ))}
                          </div>
                        ))}

                        <hr />
                      </>
                    )}
                    <h6>💳 Payment Details</h6>
                    <p>
                      <strong>Payment Method:</strong>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {selectedOrder.paymentStatus}
                    </p>

                    <p>
                      <strong>Subtotal:</strong> Rs.{" "}
                      {selectedOrder.subtotal || selectedOrder.totalAmount}
                    </p>

                    <p>
                      <strong>Delivery Charge:</strong>{" "}
                      {selectedOrder.deliveryCharge === 0
                        ? "FREE"
                        : `Rs. ${selectedOrder.deliveryCharge || 0}`}
                    </p>

                    <p>
                      <strong>Total Amount:</strong> Rs.{" "}
                      {selectedOrder.totalAmount}
                    </p>

                    <hr />

                    <h6>🚚 Order Status</h6>
                    <select
                      className="form-select"
                      value={selectedOrder.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(selectedOrder._id, e.target.value)
                      }
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
/* 🌌 BACKGROUND */
body {
  background: linear-gradient(135deg, #2D004D, #4B0082, #7B2CBF);
  color: white;
}

/* 👑 HEADINGS */
h2, h4, h5 {
  color: #FFD700;
}

/* 📦 CARDS */
.card {
  height: 100%;
  background: rgba(45, 0, 77, 0.85);
  border: none;
  border-radius: 12px;
  color: white;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
}

/* 🎯 OVERRIDE BOOTSTRAP COLORS */
.bg-primary {
  background: #7B2CBF !important;
}

.bg-success {
  background: #5A189A !important;
}

.bg-warning {
  background: #9D4EDD !important;
}

.bg-dark {
  background: #240046 !important;
}

/* 📊 TABLE */
.table {
  color: white;
}

.table thead {
  background: rgba(0,0,0,0.4);
}

.table tbody tr {
  background: rgba(255,255,255,0.05);
}

.table tbody tr:hover {
  background: rgba(255,255,255,0.1);
}

/* 🔍 INPUT + SELECT */
.form-control,
.form-control,
.form-select {
  background: white;
  color: black;
  border: 1px solid rgba(255,255,255,0.2);
}
  .form-control:focus {
  background: white;
  color: black;
  box-shadow: none;
}
.form-control::placeholder {
  color: #ddd;
}

/* 🔘 BUTTONS */
.btn-primary {
  background: #7B2CBF;
  border: none;
}

.btn-primary:hover {
  background: #9D4EDD;
}

.btn-danger {
  background: #c9184a;
  border: none;
}

/* 📄 PAGINATION */
.page-link {
  background: rgba(255,255,255,0.1);
  color: white;
  border: none;
}

.page-item.active .page-link {
  background: #FFD700;
  color: #4B0082;
}

/* 📦 MODAL */
.modal-content {
  background: #2D004D;
  color: white;
  border-radius: 12px;
}

/* 📱 RESPONSIVE */
@media (max-width: 768px) {
  h2 {
    font-size: 20px;
  }

  .card {
    margin-bottom: 15px;
  }

  .table {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .btn {
    font-size: 12px;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
`}
      </style>
    </>
  );
};

export default Orders;
