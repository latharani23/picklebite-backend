import React, { useState, useEffect, memo } from "react";
import { PICKLES } from "../constants/Pickles";
import { COMBOS } from "../constants/comboConstants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { POWDERS } from "../constants/powderConstants";

/* ================= PRODUCT CARD ================= */

const ProductCard = memo(
  ({ product, addToCart, updateQuantity, getCartItem, addToWishlist }) => {
    const weights = Object.keys(product.prices);
    const [selectedWeight, setSelectedWeight] = useState(weights[0]);
    const navigate = useNavigate();
    const originalPrice = product.prices[selectedWeight];
    const isPowder = POWDERS.some((p) => p.id === product.id);

    const price = isPowder ? Math.round(originalPrice * 0.8) : originalPrice;
    const image = product.images[Object.keys(product.images)[0]];
    const cartItem = getCartItem(product.id, selectedWeight);

    return (
      <article
        className="product-card"
        onClick={() => navigate(`/product/${product.slug}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={image} alt={product.name} className="product-img" />
        {/* {isPowder && <div className="discount-badge">20% OFF</div>} */}

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
                onClick={() => navigate(`/product/${combo.slug}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="combo-ribbon">COMBO ₹{price}</div>

                <img src={image} alt={combo.name} className="product-img" />

                <div className="product-info">
                  <h3>{combo.name} Combo</h3>
                  <p className="weight">{weight}</p>
                  <p className="price">₹{price}</p>
                  <div className="royal-highlight">
                    <span className="highlight-icon">🎁</span>

                    <span className="highlight-text">{combo.highlight}</span>
                  </div>
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

                  <button
                    className="wishlist-btn"
                    onClick={() =>
                      addToWishlist({
                        id: combo.id,
                        name: combo.name,
                        image,
                        price,
                        selectedWeight: weight,
                      })
                    }
                  >
                    ❤️ Add to Wishlist
                  </button>
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
      {/* 🌿 POWDERS SECTION */}
      {/* 🌿 POWDERS SECTION */}
      <div className="powders-section">
        <h2 className="section-title powder-title">
          🌿 Homemade Powders & Essentials
        </h2>

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
      <style>{`

.pickles-section{
  padding:40px 20px;
  background:linear-gradient(135deg,#f3e5f5,#ffffff);
}

.main-title{
  text-align:center;
  font-size:34px;
  font-weight:900;
  color:#4B0082;
}

.section-title{
  text-align: center;   /* ✅ CENTER */
  width: 100%;
  margin: 30px 0;
  font-size: 28px;
  font-weight: 800;
  color: #4B0082; /* or #4B0082 based on background */
}

.products-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:25px;
}

.product-card{
  background:#fff;
  border-radius:16px;
  padding:15px;
  height:530px;
  display:flex;
  flex-direction:column;
  box-shadow:0 6px 20px rgba(75,0,130,0.15);
  position:relative;
}

.product-img{
  height:250px;
  object-fit:contain;
  width:100%;
}
/* 🌿 POWDERS GRID - MODERN RESPONSIVE */


/* 🔥 COMBO RIBBON */
.combo-ribbon{
  position:absolute;
  top:10px;
  left:10px;
  background:#ff3d00;
  color:white;
  padding:6px 10px;
  font-size:12px;
  border-radius:6px;
}

.product-info{
  text-align:center;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  flex:1;
}

.price-box {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.final-price {
  color: #2e7d32;
  font-weight: 800;
  font-size: 18px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
}

.discount {
  color: #ff3d00;
  font-weight: 700;
}

/* badge */
.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff3d00;
  color: white;
  padding: 5px 8px;
  font-size: 12px;
  border-radius: 6px;
}

.price{
  color:#2e7d32;
  font-weight:700;
}

.combo-btn{
  background:linear-gradient(135deg,#6a0dad,#9c27b0);
  color:white;
  padding:10px;
  border:none;
  border-radius:8px;
}

.cart-btn{
  background:#6a0dad;
  color:white;
  padding:10px;
  border:none;
  border-radius:8px;
}

.wishlist-btn{
  margin-top:8px;
  border:1px solid #ff4d6d;
  color:#ff4d6d;
  padding:10px;
  border-radius:8px;
}

.weight-selector{
  display:flex;
  gap:8px;
  justify-content:center;
  margin:10px 0;
}

.weight-selector button{
  padding:6px 10px;
  border:1px solid #ccc;
}

.weight-selector .active{
  background:#6a0dad;
  color:white;
}

.qty-controls{
  display:flex;
  justify-content:center;
  gap:10px;
}

@media(max-width:1024px){
  .products-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:600px){
  .products-grid{
    grid-template-columns:1fr;
  }
}
/* ✅ LARGE TABLETS */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ✅ TABLETS */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-card {
    height: auto;
    min-height: 480px;
  }
}

/* ✅ MOBILE */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .product-img {
    height: 180px;
  }

  .section-title {
    font-size: 22px;
  }
}

/* ✅ SMALL MOBILE */
@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-card {
    padding: 12px;
  }

  .product-img {
    height: 160px;
  }

  .main-title {
    font-size: 24px;
  }
}
 
`}</style>
    </section>
  );
};

export default PicklesSection;
