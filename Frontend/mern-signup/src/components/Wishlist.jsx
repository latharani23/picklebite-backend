import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  /* ================= REMOVE ================= */
  const removeItem = (id, weight) => {
    const updated = wishlist.filter(
      (item) => !(item.id === id && item.selectedWeight === weight),
    );

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.info("Removed from wishlist ❌");
  };

  /* ================= MOVE TO CART ================= */
  const moveToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedWeight === product.selectedWeight,
    );

    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    removeItem(product.id, product.selectedWeight);

    toast.success("Moved to cart 🛒");

    setTimeout(() => navigate("/cart"), 1000);
  };

  /* ================= EMPTY STATE ================= */
  if (wishlist.length === 0) {
    return (
      <div className="empty">
        Wishlist is empty ❤️
        <ToastContainer />
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h2 className="title">❤️ My Wishlist</h2>

        <div className="grid">
          {wishlist.map((item) => (
            <div key={`${item.id}-${item.selectedWeight}`} className="card">
              <img src={item.image} alt={item.name} />

              <div className="card-body">
                <h5>{item.name}</h5>

                {item.selectedWeight && (
                  <p className="weight">Weight: {item.selectedWeight}</p>
                )}

                <p className="price">₹ {item.price}</p>

                <div className="actions">
                  <button className="move-btn" onClick={() => moveToCart(item)}>
                    🛒 Move
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id, item.selectedWeight)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
      <style>{styles}</style>
    </div>
  );
};

export default Wishlist;

/* ================= CSS ================= */

const styles = `
/* PAGE */
.wishlist-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #F3ECFF, #CDB4FF);
}

/* EMPTY */
.empty {
  min-height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:22px;
  font-weight:600;
  background: linear-gradient(135deg, #F3ECFF, #CDB4FF);
}

/* CONTAINER */
.container {
  max-width: 1200px;
  margin: auto;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(106, 13, 173, 0.2);
}

/* TITLE */
.title {
  text-align:center;
  font-weight:700;
  margin-bottom:30px;
  color:#6a0dad;
}

/* GRID */
.grid {
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* CARD */
.card {
  border-radius: 15px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

/* IMAGE */
.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

/* BODY */
.card-body {
  padding: 15px;
  text-align: center;
}

.weight {
  color:#666;
}

.price {
  font-size:18px;
  font-weight:700;
  color:green;
}

/* BUTTONS */
.actions {
  display:flex;
  gap:10px;
  margin-top:10px;
}

.move-btn {
  flex:1;
  background:#6a0dad;
  color:white;
  border:none;
  padding:10px;
  border-radius:8px;
  cursor:pointer;
}

.remove-btn {
  flex:1;
  border:1px solid #6a0dad;
  color:#6a0dad;
  background:white;
  padding:10px;
  border-radius:8px;
  cursor:pointer;
}

/* TABLET */
@media (max-width:1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* MOBILE */
@media (max-width:600px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }
}
`;
