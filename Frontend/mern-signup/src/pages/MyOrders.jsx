import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../constants/const";
import DownloadInvoice from "../components/DownloadInvoice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import "./MyOrder.css";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaMapMarkerAlt,
  FaUser,
  FaHeart,
  FaStar,
  FaSignOutAlt,
  FaHeadset,
} from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("orders");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const orderSteps = [
    "PLACED",
    "PACKED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch(API.GET_ORDERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Orders API Response:", data);

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch orders");
        return;
      }

      setOrders(data);

      // Optional: populate the user panel from the first order
      if (data.length > 0) {
        setUser({
          name: data[0].customer.name,
          username: data[0].customer.name,
          email: data[0].customer.email,
          phone: data[0].customer.phone,
          address: data[0].customer.address,
        });
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "secondary";
      case "SHIPPED":
        return "primary";
      case "OUT_FOR_DELIVERY":
        return "warning";
      case "DELIVERED":
        return "success";
      default:
        return "dark";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">Loading Orders...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>My Orders | Picklebite</title>

        <meta
          name="description"
          content="Track your Picklebite orders, view order status and download invoices."
        />

        <meta
          name="keywords"
          content="picklebite orders, track pickle order, homemade pickle order history"
        />
      </Helmet>

      <Navbar />

      <div className="orders-page">
        <div className="container">
          {/* LOGO */}
          <div className="logo-box">
            <img src="/assets/images/logo2.webp" alt="Picklebite Logo" />
          </div>

          {/* TITLE */}
          <h2 className="orders-title">📦 My Orders</h2>

          <div className="orders-dashboard">
            <div className="left-sidebar">
              <div className="user-card">
                <div className="user-avatar">
                  {(user?.username || user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <div>
                  <h6>Hello, {user?.username || user?.name}</h6>

                  <small>
                    {user?.phone ||
                      user?.mobile ||
                      user?.phoneNumber ||
                      "No Phone"}
                  </small>

                  <br />

                  <small style={{ color: "#666" }}>{user?.email}</small>
                </div>
              </div>

              <ul className="sidebar-menu">
                <li onClick={() => navigate("/home")}>
                  <FaTachometerAlt /> Dashboard
                </li>

                <li
                  className={activeSection === "orders" ? "active" : ""}
                  onClick={() => setActiveSection("orders")}
                >
                  <FaBox /> My Orders
                </li>

                <li
                  className={activeSection === "address" ? "active" : ""}
                  onClick={() => setActiveSection("address")}
                >
                  <FaMapMarkerAlt /> My Addresses
                </li>

                <li
                  className={activeSection === "profile" ? "active" : ""}
                  onClick={() => setActiveSection("profile")}
                >
                  <FaUser /> My Profile
                </li>

                <li onClick={() => navigate("/wishlist")}>
                  <FaHeart /> Wishlist
                </li>

                <li onClick={() => navigate("/feedback")}>
                  <FaStar /> My Reviews
                </li>

                <li onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </li>
              </ul>
              <div className="help-box">
                <FaHeadset size={24} />
                <h6>Need Help?</h6>
                <p>We're here for you!</p>
                <button onClick={() => navigate("/contact")}>
                  Contact Us
                </button>{" "}
              </div>
            </div>

            <div className="center-content">
              {activeSection === "dashboard" && (
                <>
                  <h2>📊 Dashboard</h2>

                  <div className="dashboard-cards">
                    <div className="dashboard-card">
                      <h3>{orders.length}</h3>
                      <p>Total Orders</p>
                    </div>

                    <div className="dashboard-card">
                      <h3>
                        {
                          orders.filter((o) => o.orderStatus === "DELIVERED")
                            .length
                        }
                      </h3>
                      <p>Delivered Orders</p>
                    </div>

                    <div className="dashboard-card">
                      <h3>
                        {
                          orders.filter((o) => o.orderStatus === "SHIPPED")
                            .length
                        }
                      </h3>
                      <p>Shipped Orders</p>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "orders" && (
                <>
                  <h2>📦 My Orders</h2>

                  {orders.length === 0 ? (
                    <p>No orders found.</p>
                  ) : (
                    orders.map((order) => (
                      <div className="order-card" key={order._id}>
                        <h5>📦 Order #{order._id.slice(-6).toUpperCase()}</h5>

                        <p>
                          <strong>Status:</strong> {order.orderStatus}
                        </p>

                        <p>
                          <strong>Total:</strong> ₹{order.totalAmount}
                        </p>

                        <p>
                          <strong>Ordered:</strong>{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>

                        <hr />

                        {order.items.map((item) => (
                          <div key={item._id} className="order-item">
                            <p>
                              <strong>{item.name}</strong>
                            </p>

                            <p>Weight: {item.weight}</p>

                            <p>Qty: {item.quantity}</p>

                            <p>₹{item.price}</p>
                          </div>
                        ))}

                        <DownloadInvoice order={order} />
                      </div>
                    ))
                  )}
                </>
              )}

              {activeSection === "profile" && (
                <>
                  <h2>👤 My Profile</h2>

                  <div className="profile-card">
                    <div className="profile-grid">
                      <div className="profile-item">
                        <h6>Full Name</h6>
                        <p>{user?.name || user?.username}</p>
                      </div>

                      <div className="profile-item">
                        <h6>Email</h6>
                        <p>{user?.email}</p>
                      </div>

                      <div className="profile-item">
                        <h6>Phone</h6>
                        <p>{user?.phone}</p>
                      </div>

                      <div className="profile-item">
                        <h6>Address</h6>
                        <p>{user?.address || "No Address"}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "address" && (
                <>
                  <h2>
                    <FaMapMarkerAlt /> My Address
                  </h2>

                  {orders.length > 0 ? (
                    <div className="address-card">
                      <div className="address-header">
                        <span className="address-tag">Default Address</span>
                      </div>

                      <h4>{orders[0].customer.name}</h4>

                      <p>📞 {orders[0].customer.phone}</p>

                      <p>{orders[0].customer.address}</p>

                      <p>
                        {orders[0].customer.city &&
                          `${orders[0].customer.city}, `}
                        {orders[0].customer.state}
                      </p>

                      <p>PIN: {orders[0].customer.pincode || "N/A"}</p>

                      <div className="address-actions"></div>
                    </div>
                  ) : (
                    <div className="address-card">
                      <p>No saved address found.</p>

                      <button className="add-address-btn">
                        + Add New Address
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeSection === "wishlist" && (
                <>
                  <h2>❤️ Wishlist</h2>

                  <div className="profile-box">
                    <p>Your wishlist items will appear here.</p>
                  </div>
                </>
              )}

              {activeSection === "reviews" && (
                <>
                  <h2>⭐ My Reviews</h2>

                  <div className="profile-box">
                    <p>Your reviews will appear here.</p>
                  </div>
                </>
              )}
            </div>

            <div className="tracking-panel">
              <h4 className="tracking-title">🚚 Track Your Order</h4>

              {orders.length > 0 &&
                orderSteps.map((step, index) => {
                  const completed =
                    orderSteps.indexOf(step) <=
                    orderSteps.indexOf(orders[0].orderStatus);

                  return (
                    <div
                      key={step}
                      className={`tracking-step ${completed ? "completed" : ""}`}
                    >
                      <div className="step-icon">
                        {completed ? "✓" : index + 1}
                      </div>

                      <div className="step-content">
                        <h6>{step.replaceAll("_", " ")}</h6>
                      </div>
                    </div>
                  );
                })}

              <div className="current-status">
                Current Status:
                <span>{orders[0]?.orderStatus.replaceAll("_", " ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* PAGE STYLES */}
    </>
  );
};

export default MyOrders;
