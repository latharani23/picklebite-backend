import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

          <button onClick={() => navigate("/pickles")} className="shop-btn">
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
        <div className="checkout-header">
          <h2>🛒 Almost There!</h2>

          <p>
            Review your order, customize your <b>Sample Box</b>, and complete
            your purchase in just <b>3 simple steps</b>.
          </p>
        </div>
        {/* Checkout Stepper */}
        <div className="checkout-stepper">
          <div className="step active">
            <div className="circle">🛒</div>
            <h5>Shopping Cart</h5>
            <small>Review Products</small>
          </div>

          <div className="line active"></div>

          <div className="step">
            <div className="circle">🎁</div>
            <h5>Sample Box</h5>
            <small>Choose Samples</small>
          </div>

          <div className="line"></div>

          <div className="step">
            <div className="circle">💳</div>
            <h5>Checkout</h5>
            <small>Secure Payment</small>
          </div>
        </div>

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

          {/* SUMMARY */}

          <div className="cart-summary">
            <h3>🧾 Order Summary</h3>

            <div className="summary-row">
              <span>🛍 Products</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>💰 Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>💳 Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/sample-box")}
            >
              🎁 Next: Customize My Sample Box →
            </button>

            <div className="trust-box">
              <p>🔒 100% Secure Payment</p>
              <p>🚚 Pan India Delivery</p>
              <p>🌿 No Preservatives</p>
              <p>🧴No Oil</p>

              <p>❤️ Homemade with Love</p>
            </div>
            <button
              className="delivery-updates-btn"
              onClick={() => navigate("/delivery-updates")}
            >
              🚚 Delivery Updates
            </button>
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
/* ===============================
   DELIVERY UPDATES BUTTON
=================================*/

.delivery-updates-btn {
  width: 100%;
  margin-top: 18px;
  padding: 16px 24px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #4b0082, #8b5cf6);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.35s ease;
  box-shadow: 0 10px 25px rgba(75, 0, 130, 0.25);
  position: relative;
  overflow: hidden;
}

.delivery-updates-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: rgba(255, 255, 255, 0.25);
  transform: skewX(-25deg);
  transition: 0.7s;
}

.delivery-updates-btn:hover::before {
  left: 130%;
}

.delivery-updates-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 35px rgba(75, 0, 130, 0.35);
}

.delivery-updates-btn:active {
  transform: scale(0.98);
}

.delivery-updates-btn span {
  transition: transform 0.3s ease;
}

.delivery-updates-btn:hover span {
  transform: translateX(5px);
}

/* Mobile */

@media (max-width: 768px) {
  .delivery-updates-btn {
    padding: 14px 18px;
    font-size: 15px;
  }
}
.cart-item{
display:flex;
align-items:center;
gap:15px;
padding:15px 0;
border-bottom:1px solid #eee;
flex-wrap:wrap;
}
/* ================= CHECKOUT STEPPER ================= */
.checkout-header{
  text-align:center;
  margin-bottom:40px;
}

.checkout-header h2{
  color:#6A0DAD;
  font-size:42px;
  margin-bottom:10px;
  font-weight:700;
}

.checkout-header p{
  color:#666;
  font-size:18px;
  line-height:1.7;
  max-width:700px;
  margin:auto;
}

.checkout-stepper{
  max-width:1100px;
  margin:0 auto 45px;
  display:flex;
  justify-content:center;
  align-items:center;
}

.step{
  width:220px;
  text-align:center;
}

.circle{
  width:70px;
  height:70px;
  margin:auto;
  border-radius:50%;
  background:#ececec;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:32px;
  transition:.3s;
  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.step.active .circle{
  background:linear-gradient(135deg,#8B5CF6,#6A0DAD);
  color:white;
  transform:scale(1.08);
}

.step h5{
  margin-top:15px;
  color:#222;
  font-size:18px;
}

.step small{
  color:#777;
  font-size:14px;
}

.line{
  width:120px;
  height:4px;
  background:#ddd;
  border-radius:50px;
}

.line.active{
  background:linear-gradient(to right,#8B5CF6,#6A0DAD);
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
.trust-box{
margin-top:20px;
padding:15px;
border-radius:12px;
background:#faf5ff;
border:1px solid #e9d5ff;
}

.trust-box p{
margin:8px 0;
font-size:14px;
color:#555;
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
