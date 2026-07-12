import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POWDERS } from "../constants/powderConstants";
import "./PowdersSection.css";

/* ================= PRODUCT CARD ================= */

const ProductCard = memo(
  ({ product, addToCart, updateQuantity, getCartItem, addToWishlist }) => {
    const weights = Object.keys(product.prices);
    const [selectedWeight, setSelectedWeight] = useState(weights[0]);

    const navigate = useNavigate();

    const price = product.prices[selectedWeight];
    const image = product.images[Object.keys(product.images)[0]];

    const cartItem = getCartItem(product.id, selectedWeight);

    const handleShare = (e) => {
      e.stopPropagation();

      const shareUrl = `${window.location.origin}/product/${product.slug}`;

      const message = `🌿 Picklebite ${product.name}
No Oil | No Preservatives 💜
Order Now: 7975390038
${shareUrl}`;

      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: message,
          url: shareUrl,
        });
      } else {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          "_blank",
        );
      }
    };

    return (
      <article
        className="product-card"
        onClick={() => navigate(`/product/${product.slug}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={image} alt={product.name} className="product-img" />

        {product.badge && (
          <div className={`product-badge ${product.badgeType}`}>
            <div className="badge-title">{product.badge}</div>
          </div>
        )}

        <div className="product-info">
          <h3>{product.name}</h3>

          <div className="weight-selector">
            {weights.map((weight) => (
              <button
                key={weight}
                className={selectedWeight === weight ? "active" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(weight);
                }}
              >
                {weight}
              </button>
            ))}
          </div>

          <div className="price-box">
            <span className="final-price">₹{price}</span>
          </div>

          {product.highlight && (
            <div className="royal-highlight">
              <span className="highlight-icon">✦</span>
              <span className="highlight-text">{product.highlight}</span>
            </div>
          )}

          {cartItem ? (
            <div className="qty-controls">
              <button
                onClick={() => updateQuantity(product.id, selectedWeight, -1)}
              >
                −
              </button>

              <span>{cartItem.quantity}</span>

              <button
                onClick={() => updateQuantity(product.id, selectedWeight, 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="cart-btn"
              onClick={(e) => {
                e.stopPropagation();

                addToCart({
                  id: product.id,
                  name: product.name,
                  image,
                  price,
                  selectedWeight,
                });
              }}
            >
              🛒 Add to Cart
            </button>
          )}

          <div className="action-buttons">
            <button
              className="wishlist-btn"
              onClick={(e) => {
                e.stopPropagation();

                addToWishlist({
                  id: product.id,
                  name: product.name,
                  image,
                  price,
                  selectedWeight,
                });
              }}
            >
              ❤️ Wishlist
            </button>

            <button className="wishlist-btn" onClick={handleShare}>
              🔗 Share
            </button>
          </div>
        </div>
      </article>
    );
  },
);

/* ================= MAIN ================= */

const PowdersSection = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) =>
        item.id === product.id &&
        item.selectedWeight === product.selectedWeight,
    );

    if (exists) {
      toast.info("Already in wishlist ❤️");
      return;
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    toast.success("Added to Wishlist ❤️");
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = existingCart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedWeight === product.selectedWeight,
    );

    if (index !== -1) existingCart[index].quantity += 1;
    else existingCart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setCart(existingCart);

    toast.success("Added to Cart 🛒");

    setTimeout(() => navigate("/cart"), 500);
  };

  const updateQuantity = (id, weight, change) => {
    let updatedCart = [...cart];

    const index = updatedCart.findIndex(
      (item) => item.id === id && item.selectedWeight === weight,
    );

    if (index !== -1) {
      updatedCart[index].quantity += change;

      if (updatedCart[index].quantity <= 0) updatedCart.splice(index, 1);
    }

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getCartItem = (id, weight) =>
    cart.find((item) => item.id === id && item.selectedWeight === weight);

  return (
    <section className="powders-section">
      <div className="container">
        <h1 className="main-title">🌿 Homemade Powders & Essentials</h1>

        <div className="products-grid">
          {POWDERS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              getCartItem={getCartItem}
              addToWishlist={addToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowdersSection;
