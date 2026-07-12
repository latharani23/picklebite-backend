import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PICKLES } from "../constants/Pickles";

import "./Pickles.css";

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate(); // Add this hook
  const weights = Object.keys(product.prices);
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);

  const price = product.prices[selectedWeight];
  const image = product.images[Object.keys(product.images)[0]];

  // Separate function for sharing
  const handleShare = (e) => {
    e.stopPropagation(); // Prevents clicking share from also triggering the navigation
    const shareUrl = `${window.location.origin}/product/${product.slug}`;
    const message = `🔥 Picklebite ${product.name}\nNo Oil | No Preservatives 💜\nOrder Now: 7975390038\n${shareUrl}`;

    if (navigator.share) {
      navigator.share({ title: product.name, text: message, url: shareUrl });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="card">
      <img
        src={image}
        alt={product.name}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.slug}`)}
      />
      {product.inStock === false && (
        <p
          style={{
            color: "#d32f2f",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "10px",
          }}
        ></p>
      )}
      <div className="card-content">
        <h3>{product.name}</h3>

        <div className="weight-selector">
          {weights.map((w) => (
            <button
              key={w}
              className={selectedWeight === w ? "active" : ""}
              onClick={() => setSelectedWeight(w)}
            >
              {w}
            </button>
          ))}
        </div>

        <p className="price">₹{price}</p>
        {product.highlight && (
          <div className="royal-highlight">
            <span className="highlight-icon">✨</span>
            <span className="highlight-text">{product.highlight}</span>
          </div>
        )}
        {product.inStock === false ? (
          <button
            className="cart-btn"
            disabled
            style={{
              background: "#9e9e9e",
              cursor: "not-allowed",
            }}
          >
            ❌ Out of Stock
          </button>
        ) : (
          <button
            className="cart-btn"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                image,
                price,
                selectedWeight,
              })
            }
          >
            🛒 Add to Cart
          </button>
        )}

        <div className="action-buttons">
          <button className="wishlist-btn">❤️ Wishlist</button>

          <button className="wishlist-btn" onClick={handleShare}>
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  );
};
/* ================= MAIN PAGE ================= */
const Pickles = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedWeight === product.selectedWeight,
    );

    if (index !== -1) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);

    toast.success("Added to Cart 🛒");
  };

  /* 🔍 SEARCH */
  let filtered = [...PICKLES].filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  /* 🔽 SORT */
  if (sortType === "low") {
    filtered.sort(
      (a, b) => Object.values(a.prices)[0] - Object.values(b.prices)[0],
    );
  } else if (sortType === "high") {
    filtered.sort(
      (a, b) => Object.values(b.prices)[0] - Object.values(a.prices)[0],
    );
  }

  return (
    <>
      <Helmet>
        <title>Picklebite Pickles</title>
      </Helmet>

      <Navbar />

      <div className="page">
        <div className="container">
          <h1 className="title">💜 Picklebite Premium Pickles</h1>

          {/* 🔍 SEARCH + SORT RIGHT */}
          <div className="controls">
            <input
              type="text"
              placeholder="🔍 Search Pickles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

          {/* TITLE */}
          <h2 className="section-title">🔥 10 Different Varities Of Pickles</h2>

          {/* GRID */}
          <div className="grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default Pickles;
