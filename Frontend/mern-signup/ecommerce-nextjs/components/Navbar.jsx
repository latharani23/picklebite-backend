"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

const Navbar = ({ guideRef = null }) => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showProfile, setShowProfile] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [cart, setCart] = useState([]);

  const profileRef = useRef(null);

  /* ================= LOAD CART ================= */

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  /* ================= SEARCH ================= */

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (!query) return;

    navigate(`/home?search=${encodeURIComponent(query)}`);
    setSearchTerm("");
    setShowSearch(false);
  };

  /* ================= CLICK OUTSIDE CLOSE ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  /* ================= SCROLL TO GUIDE ================= */

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <span>🚚 Now delivering across India • No Oil • No Preservatives </span>

        <span className="actions">
          <span className="shop-now" onClick={() => navigate("/pickles")}>
            Shop Now →
          </span>

          <span
            className="whatsapp-btn"
            onClick={() =>
              window.open(
                "https://wa.me/917975390038?text=Hi Picklebite, I want to order pickle",
                "_blank",
              )
            }
          >
            <i className="bi bi-whatsapp"></i> Order Now 7975390038
          </span>
        </span>
      </div>

      {/* NAVBAR */}

      <nav className="navbar-main">
        {/* LOGO */}

        <div className="logo-section" onClick={() => navigate("/")}>
          <img
            src="/assets/images/logo2.webp"
            alt="Picklebite"
            className="logo"
          />
        </div>

        {/* MENU */}

        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>

          <span onClick={() => navigate("/pickles")}>Pickles</span>

          <span onClick={() => navigate("/Collections")}>
            Pickle Collections
          </span>

          {/* DROPDOWN */}

          <div className="dropdown-menu-wrapper">
            <span>Pickle Guide ▾</span>

            <div className="dropdown-menu">
              <div onClick={() => navigate("/about")}>About Us</div>
              <div onClick={() => navigate("/benefits")}>Benefits</div>

              <div onClick={() => navigate("/storage-instructions")}>
                Storage Instructions
              </div>
              <div onClick={() => navigate("/feedback")}>Feedback</div>
            </div>
          </div>

          {/* <span onClick={() => navigate("/my-orders")}>Orders</span> */}

          <span onClick={() => navigate("/our-story")}>Why Picklebite</span>

          <span onClick={() => navigate("/contact")}>Contact</span>
        </div>

        {/* ICONS */}

        <div className="nav-icons">
          <i
            className="bi bi-search"
            onClick={() => setShowSearch(!showSearch)}
          ></i>

          <i className="bi bi-heart" onClick={() => navigate("/wishlist")}></i>

          <i className="bi bi-cart3" onClick={() => setCartOpen(true)}></i>

          <div ref={profileRef} className="profile-wrapper">
            {" "}
            <i
              className="bi bi-person-circle"
              onClick={() => {
                const token = localStorage.getItem("token");

                if (!token) {
                  navigate("/login");
                  return;
                }

                setShowProfile(!showProfile);
              }}
            ></i>
            {showProfile && (
              <div className="profile-box">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SEARCH */}

      {showSearch && (
        <div className="search-bar">
          <input
            autoFocus
            type="text"
            placeholder="Search mango, lemon, garlic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <i className="bi bi-search" onClick={handleSearch}></i>
        </div>
      )}

      {/* CART DRAWER */}

      {cartOpen && (
        <div className="cart-drawer open">
          <div className="cart-header">
            <h4>Cart ({cart.length})</h4>
            <i className="bi bi-x-lg" onClick={() => setCartOpen(false)}></i>
          </div>

          {cart.length === 0 && <p>Your cart is empty</p>}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="60" height="60" />
              <div>
                <p>{item.name}</p>
                <small>₹{item.price}</small>
                <br />
                <small>Qty: {item.quantity}</small>
              </div>
            </div>
          ))}

          <h5>Total ₹{subtotal}</h5>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
