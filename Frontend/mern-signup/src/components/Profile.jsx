"use client";
import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

import { API } from "../constants/const";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const toggleProfile = async () => {
    setShow(!show);

    if (!user) {
      const token = localStorage.getItem("token");

      try {
        const { data } = await axios.get(API.PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);

        const ordersRes = await axios.get(API.GET_ORDERS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShow(false);
    navigate("/login");
  };

  /* ================= PDF DOWNLOAD WITH LOGO ================= */

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = "/assets/images/logo2.webp";

    logo.onload = () => {
      // Add Logo
      doc.addImage(logo, "JPEG", 80, 10, 50, 30);

      doc.setFontSize(18);
      doc.text("INVOICE", 90, 50);

      doc.setFontSize(12);
      doc.text(`Order ID: ${order._id}`, 20, 70);
      doc.text(`Customer: ${user.username || user.name}`, 20, 80);
      doc.text(`Email: ${user.email}`, 20, 90);

      doc.line(20, 100, 190, 100);

      doc.text("Items:", 20, 110);

      let y = 120;

      order.items?.forEach((item) => {
        doc.text(
          `${item.name} (${item.quantity})  - Rs. ${item.price * item.quantity}`,
          20,
          y,
        );
        y += 10;
      });

      doc.line(20, y, 190, y);

      doc.setFontSize(14);
      doc.text(`Total Amount: Rs. ${order.totalAmount}`, 20, y + 15);

      doc.setFontSize(10);
      doc.text("Thank you for choosing Picklebite ❤️", 60, y + 30);

      doc.save(`Invoice_${order._id}.pdf`);
    };
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleProfile}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        👤
      </button>

      {show && user && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            background: "#fff",
            padding: "15px",
            width: "320px",
            maxHeight: "450px",
            overflowY: "auto",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            borderRadius: "10px",
            zIndex: 999,
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>{user.username || user.name}</strong>
          </p>
          <small>{user.email}</small>
          <p style={{ fontSize: "12px", color: "#777" }}>Role: {user.role}</p>

          <hr />

          <button
            onClick={() => {
              setShow(false);
              navigate("/my-orders");
            }}
            style={{
              width: "100%",
              padding: "10px",
              background: "#5B0BB5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            My Orders
          </button>

          <hr />

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "8px",
              background: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
