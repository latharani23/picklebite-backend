import React, { useState } from "react";
import axios from "axios";
import { API } from "../constants/const";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API.FORGOT_PASSWORD, { email });

      setMessage(res.data.message || "Reset link sent to your email");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", width: "250px" }}
        />

        <br />
        <br />

        <button type="submit">Send Reset Link</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
