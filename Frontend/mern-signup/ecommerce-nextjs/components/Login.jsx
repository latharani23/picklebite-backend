"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../constants/const";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /* ================= CHECK IF ALREADY LOGGED IN ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  /* ================= LOGIN FUNCTION ================= */

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(API.LOGIN, {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message || err.response?.data || "Login failed",
      );
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-container">
          {/* BRAND */}
          <div className="brand-section">
            <img
              src="/assets/images/logo2.webp"
              alt="Pickle bite Logo"
              className="brand-logo"
            />

            <h1 className="brand-title">
              <span className="pickle-text">Pickle</span>{" "}
              <span className="bite-text">Bite</span>
            </h1>

            <p className="brand-subtitle">
              Homemade | Fresh | Traditional Taste
            </p>
          </div>

          <h5>Welcome Back 👋</h5>

          {error && <p className="error-message">{error}</p>}

          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/signup")}>
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
