"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  /* ================= LOAD CART ================= */

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];

    const fixed = stored.map((item) => ({
      ...item,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
    }));

    setCart(fixed);
  }, []);

  /* ================= REMOVE ================= */

  const removeFromCart = useCallback(
    (id, weight) => {
      const updated = cart.filter(
        (item) => !(item.id === id && item.selectedWeight === weight),
      );

      setCart(updated);

      localStorage.setItem("cart", JSON.stringify(updated));

      toast.success("Item removed");
    },
    [cart],
  );

  /* ================= UPDATE QTY ================= */

  const updateQuantity = useCallback(
    (id, weight, change) => {
      const updated = cart.map((item) => {
        if (item.id === id && item.selectedWeight === weight) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity + change),
          };
        }

        return item;
      });

      setCart(updated);

      localStorage.setItem("cart", JSON.stringify(updated));
    },
    [cart],
  );

  /* ================= TOTAL ================= */

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const grandTotal = subtotal;

  /* ================= EMPTY CART ================= */

  if (!cart.length) {
    return (
      <>
        <Navbar />

        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>

          <button onClick={() => router.push("/pickles")} className="shop-btn">
            Continue Shopping
          </button>
        </div>

        <Footer />
      </>
    );
  }

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <Helmet>
        <title>Your Cart | Picklebite</title>

        <meta
          name="description"
          content="View your pickle order cart and proceed to checkout securely."
        />
      </Helmet>

      <div className="cart-container">
        <ToastContainer />

        <div className="cart-wrapper">
          {/* LEFT CART */}

          <div className="cart-items">
            <h2>My Cart</h2>

            {cart.map((item) => (
              <div key={item.id + item.selectedWeight} className="cart-item">
                <img src={item.image} alt={item.name} loading="lazy" />

                <div className="cart-info">
                  <h4>{item.name}</h4>

                  <p>{item.selectedWeight}</p>

                  <strong>₹{item.price}</strong>
                </div>

                {/* QUANTITY */}

                <div className="qty">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedWeight, -1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedWeight, 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="item-total">₹{item.price * item.quantity}</div>

                <IconButton
                  onClick={() => removeFromCart(item.id, item.selectedWeight)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>

          {/* SUMMARY */}

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>

              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>

              <span>₹{grandTotal}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </button>

            <p className="secure">🔒 Secure Checkout</p>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`

.cart-container{
padding:30px 20px;
background:#f9f9f9;
min-height:100vh;
font-family:Poppins;
}

.cart-wrapper{
max-width:1200px;
margin:auto;
display:flex;
gap:40px;
flex-wrap:wrap;
}

.cart-items{
flex:2;
min-width:320px;
}

.cart-item{
display:flex;
align-items:center;
gap:15px;
padding:15px 0;
border-bottom:1px solid #eee;
flex-wrap:wrap;
}

.cart-item img{
width:90px;
height:90px;
border-radius:8px;
object-fit:cover;
}

.cart-info{
flex:1;
min-width:140px;
}

.qty{
display:flex;
align-items:center;
gap:8px;
}

.qty button{
width:28px;
height:28px;
border:1px solid #ddd;
background:#fff;
cursor:pointer;
}

.item-total{
font-weight:600;
min-width:70px;
}

.cart-summary{
flex:1;
min-width:280px;
background:#fff;
padding:25px;
border-radius:10px;
box-shadow:0 4px 15px rgba(0,0,0,0.08);
height:fit-content;
}

.summary-row{
display:flex;
justify-content:space-between;
margin-top:10px;
}

.total{
font-size:20px;
font-weight:bold;
}

.checkout-btn{
width:100%;
padding:14px;
margin-top:20px;
background:#000;
color:#fff;
border:none;
border-radius:6px;
cursor:pointer;
font-size:16px;
}

.secure{
text-align:center;
margin-top:10px;
font-size:13px;
color:#777;
}

.empty-cart{
text-align:center;
margin-top:120px;
}

.shop-btn{
padding:12px 25px;
margin-top:20px;
border:none;
background:#000;
color:#fff;
border-radius:6px;
cursor:pointer;
}

/* ================= MOBILE ================= */

@media(max-width:768px){

.cart-wrapper{
flex-direction:column;
}

.cart-summary{
position:sticky;
bottom:0;
}

}

`}</style>
    </>
  );
};

export default Cart;
