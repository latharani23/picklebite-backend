import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const { data } = await axios.post(API.ADMIN_LOGIN, { email, password });

      // check role
      if (data.role !== "admin") {
        toast.error("Not authorized as Admin");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error("Invalid Admin Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Admin Login</h3>

      <input
        className="form-control mt-3"
        placeholder="Admin Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mt-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-dark mt-3" onClick={handleAdminLogin}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
