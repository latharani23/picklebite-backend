"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
const CartDrawer = ({ cart, open, setOpen }) => {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-420px",
        width: "420px",
        height: "100vh",
        background: "#fff",
        boxShadow: "-4px 0 15px rgba(0,0,0,0.2)",
        transition: "0.3s",
        zIndex: 9999,
        padding: 20,
      }}
    >
      <h3>Cart ({cart.length} items)</h3>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <img src={item.image} alt="" style={{ width: 70, height: 70 }} />

          <div>
            <p>{item.name}</p>
            <p>₹{item.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}

      <hr />

      <h4>Total ₹{subtotal}</h4>

      <button
        style={{
          width: "100%",
          padding: 12,
          background: "black",
          color: "#fff",
          marginTop: 10,
        }}
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>

      <button
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
        onClick={() => navigate("/cart")}
      >
        View Cart
      </button>
    </div>
  );
};

export default CartDrawer;
