"use client";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/const";
import "./Signup.css";
import { API } from "../constants/const";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Strong password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be 8+ characters, include 1 uppercase, 1 number & 1 special character.",
      );
      return;
    }

    try {
      console.log("Signup API URL:", API.REGISTER);
      console.log("Signup Data:", { username, email, password });

      await axios.post(API.REGISTER, {
        username,
        email,
        password,
      });

      alert("Signup successful 🎉 Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div className="signup-page">
      <div className="overlay">
        <div className="signup-container">
          <div className="brand-section">
            <img
              src="/assets/images/logo2.webp"
              alt="Picklebite Logo"
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
          <h5>Create Your Account</h5>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button type="submit">Signup</button>
          </form>

          <p>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
