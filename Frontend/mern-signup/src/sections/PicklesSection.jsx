import React, { useState, useEffect, memo } from "react";
import { PICKLES } from "../constants/Pickles";
import { COMBOS } from "../constants/comboConstants"; // ✅ your file
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./PicklesSection.css";

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
      const message = `🔥 Picklebite ${product.name}
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
            {weights.map((w) => (
              <button
                key={w}
                className={selectedWeight === w ? "active" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(w);
                }}
              >
                {w}
              </button>
            ))}
          </div>

          <div className="price-box">
            <span className="final-price">₹{price}</span>
          </div>

          {product.highlight && (
            <div className="royal-highlight">
              <span className="shine"></span>
              <span className="highlight-icon">✦</span>
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
          ) : cartItem ? (
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
const PicklesSection = () => {
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
      toast.info(`${product.name} is already in your wishlist ❤️`);
      return;
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success(`${product.name} added to wishlist ❤️`);
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
    toast.success(`${product.name} added to cart 🛒`);
    setTimeout(() => navigate("/cart"), 500);
  };

  const updateQuantity = (id, weight, change) => {
    let updatedCart = [...cart];

    const index = updatedCart.findIndex(
      (item) => item.id === id && item.selectedWeight === weight,
    );

    if (index !== -1) {
      updatedCart[index].quantity += change;

      if (updatedCart[index].quantity <= 0) {
        const removedItem = updatedCart[index];

        updatedCart.splice(index, 1);

        toast.info(`${removedItem.name} removed from cart 🗑️`);
      }
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getCartItem = (id, weight) =>
    cart.find((item) => item.id === id && item.selectedWeight === weight);

  return (
    <section className="pickles-section">
      <div className="container">
        <h1 className="main-title">💜 Homemade Pickles – Fresh & Authentic</h1>

        {/* 🔥 COMBO SECTION */}
        <h2 className="section-title">🔥 Combo Offers</h2>

        <div className="products-grid">
          {COMBOS.map((combo) => {
            const weight = Object.keys(combo.prices)[0];
            const price = combo.prices[weight];
            const image = combo.images[weight];
            const cartItem = getCartItem(combo.id, weight);

            return (
              <article
                className="product-card combo-card"
                key={combo.id}
                onClick={() => navigate(`/product/${combo.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="combo-ribbon">COMBO ₹{price}</div>

                <img src={image} alt={combo.name} className="product-img" />

                <div className="product-info">
                  <h3>{combo.name} Combo</h3>
                  <p className="weight">{weight}</p>
                  <p className="price">₹{price}</p>
                  {combo.highlight && (
                    <div className="royal-highlight">
                      <span className="shine"></span>
                      <span className="highlight-icon">🎁</span>
                      <span className="highlight-text">{combo.highlight}</span>
                    </div>
                  )}
                  {cartItem ? (
                    <div className="qty-controls">
                      <button
                        onClick={() => updateQuantity(combo.id, weight, -1)}
                      >
                        −
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(combo.id, weight, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="combo-btn"
                      onClick={() =>
                        addToCart({
                          id: combo.id,
                          name: combo.name,
                          image,
                          price,
                          selectedWeight: weight,
                        })
                      }
                    >
                      Add Combo
                    </button>
                  )}

                  <div className="action-buttons">
                    <button
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist({
                          id: combo.id,
                          name: combo.name,
                          image,
                          price,
                          selectedWeight: weight,
                        });
                      }}
                    >
                      ❤️ Wishlist
                    </button>

                    <button
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        const shareUrl = `${window.location.origin}/product/${combo.id}`;
                        const message = `🔥 Picklebite ${combo.name}
                        No Oil | No Preservatives 💜
                        Order Now: 7975390038
                        ${shareUrl}`;

                        if (navigator.share) {
                          navigator.share({
                            title: combo.name,
                            text: message,
                            url: shareUrl,
                          });
                        } else {
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(message)}`,
                            "_blank",
                          );
                        }
                      }}
                    >
                      🔗 Share
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 🔥 PRODUCTS */}
        <h2 className="section-title">🔥 10 Different Varities Of Pickles</h2>

        <div className="products-grid">
          {PICKLES.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              getCartItem={getCartItem}
              addToWishlist={addToWishlist} // ✅ ADD THIS
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PicklesSection;
