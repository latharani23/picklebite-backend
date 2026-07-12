import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { API } from "../constants/const";

import "./AdminLogin.css";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(API.ADMIN_LOGIN, {
        email,
        password,
      });

      // 🔐 Allow only admin
      if (data.role !== "admin") {
        toast.error("Access denied. Not an admin.");
        return;
      }

      localStorage.setItem("adminToken", data.token);

      toast.success("Admin login successful ✅");

      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h3 className="admin-title">Admin Login</h3>

        <input
          className="admin-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="admin-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
