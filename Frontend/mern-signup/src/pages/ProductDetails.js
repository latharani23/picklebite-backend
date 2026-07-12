import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PICKLES, PICKLEBITE_INFO } from "../constants/Pickles";

import { toast } from "react-toastify";
import { COMBOS } from "../constants/comboConstants";
import { POWDERS } from "../constants/powderConstants";

const ProductDetails = () => {
  const { slug } = useParams();

  const product =
    PICKLES.find((p) => p.slug === slug) ||
    POWDERS.find((p) => p.slug === slug) ||
    COMBOS.find((c) => c.slug === slug);

  const [selectedImage, setSelectedImage] = useState(
    product?.gallery?.[0] ||
      product?.images?.[Object.keys(product.images || {})[0]],
  );

  const weights = Object.keys(product?.prices || {});
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);

  if (!product) return <h2>Product not found</h2>;

  // ✅ PRICE LOGIC (FIXED)
  const actualPrice = product.prices[selectedWeight];
  const discount = product.discount || 0; // e.g., 20
  const discountedPrice = actualPrice - (actualPrice * discount) / 100;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
      (item) =>
        item.id === product.id && item.selectedWeight === selectedWeight,
    );

    if (index !== -1) cart[index].quantity += 1;
    else
      cart.push({
        id: product.id,
        name: product.name,
        image: selectedImage,
        price: discountedPrice, // ✅ store discounted price
        selectedWeight,
        quantity: 1,
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to Cart 🛒");
  };

  const handleWhatsApp = () => {
    const msg = `🔥 Picklebite ${product.name}
Weight: ${selectedWeight}
Price: ₹${discountedPrice} (Original ₹${actualPrice})`;

    window.open(`https://wa.me/917975390038?text=${encodeURIComponent(msg)}`);
  };

  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: "Check this product 💜",
        url,
      });
    } else {
      window.open(`https://wa.me/?text=${url}`);
    }
  };
  <div className="product-gallery">
    {product.gallery?.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`${product.name}-${index}`}
        onClick={() => setSelectedImage(img)}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          margin: "5px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />
    ))}
  </div>;
  return (
    <div className="product-page">
      <div className="product-container">
        {/* LEFT - IMAGES */}
        <div className="image-section">
          <img src={selectedImage} className="main-img" alt="" />

          <div className="thumbs">
            {Object.values(product.images).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? "active" : ""}
                alt=""
              />
            ))}
          </div>

          <div className="product-gallery">
            {product.gallery?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name}-${index}`}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  margin: "5px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="details-section">
          <h1>{product.name}</h1>

          <p className="tagline">
            💜 No Oil | No Preservatives | Homemade Goodness
          </p>
          <h3>⭐⭐⭐⭐⭐ 4.9/5 Rating</h3>

          <p>{product.description?.shortDescription}</p>
          {/* WEIGHT */}
          <div className="weights">
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
          <div className="ingredients-section">
            <h3>Ingredients</h3>

            <ul>
              {product.description?.ingredients?.map((item) => (
                <li key={item}>✔ {item}</li>
              ))}
            </ul>
          </div>
          {/* ✅ PRICE DISPLAY */}
          <h2 className="price">
            ₹{discountedPrice}{" "}
            {discount > 0 && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "gray",
                  marginLeft: "10px",
                  fontSize: "18px",
                }}
              >
                ₹{actualPrice}
              </span>
            )}
          </h2>
          <div className="reviews-section">
            <h3>Customer Reviews</h3>

            <div className="review-card">
              ⭐⭐⭐⭐⭐ Amazing homemade taste.
            </div>

            <div className="review-card">
              ⭐⭐⭐⭐⭐ Fresh and authentic flavour.
            </div>

            <div className="review-card">⭐⭐⭐⭐⭐ Loved by our family.</div>
          </div>
          {/* BUTTONS */}
          <div className="actions">
            <button className="cart-btn" onClick={addToCart}>
              🛒 Add to Cart
            </button>

            <button className="buy-btn" onClick={handleWhatsApp}>
              📲 Order on WhatsApp
            </button>

            <button className="share-btn" onClick={handleShare}>
              🔗 Share
            </button>
          </div>
          <div className="picklebite-info">
            <h3>Why Picklebite?</h3>

            <ul>
              {PICKLEBITE_INFO.promise.map((item) => (
                <li key={item}>✔ {item}</li>
              ))}
            </ul>

            <p>{PICKLEBITE_INFO.preparation}</p>

            <p>{PICKLEBITE_INFO.delivery}</p>
          </div>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
.product-page{
  background: linear-gradient(135deg,#F3ECFF,#CDB4FF);
  min-height:100vh;
  padding:10px;
}

.product-container{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:40px;
  background:white;
  border-radius:20px;
  padding:30px;
  box-shadow:0 10px 30px rgba(75,0,130,0.2);
}

.image-section{
  text-align:center;
}

.main-img{
  width:100%;
  max-height:550px;
  object-fit:contain;
}
.ingredients-section,
.reviews-section,
.picklebite-info{
  margin-top:20px;
}

.ingredients-section ul,
.picklebite-info ul{
  padding-left:20px;
}

.review-card{
  background:#f8f8f8;
  padding:10px;
  border-radius:10px;
  margin-bottom:10px;
}
.thumbs{
  display:flex;
  gap:10px;
  margin-top:20px;
  justify-content:center;
}

.thumbs img{
  width:60px;
  height:60px;
  border-radius:10px;
  cursor:pointer;
  border:2px solid transparent;
}

.thumbs img.active{
  border:2px solid #6a0dad;
}

.details-section h1{
  color:#4B0082;
}

.tagline{
  margin:10px 0;
  color:#6a0dad;
}

.weights{
  margin:20px 0;
  display:flex;
  gap:10px;
}

.weights button{
  padding:8px 14px;
  border-radius:8px;
  border:1px solid #ccc;
  background:#eee;
}

.weights .active{
  background:#6a0dad;
  color:white;
  border:none;
}

.price{
  color:#2e7d32;
  font-size:28px;
}

.actions{
  margin-top:20px;
  display:flex;
  gap:12px;
}

.cart-btn{
  background:linear-gradient(135deg,#6a0dad,#9c27b0);
  color:white;
  padding:12px;
  border:none;
  border-radius:10px;
}

.buy-btn{
  background:#25D366;
  color:white;
  padding:12px;
  border:none;
  border-radius:10px;
}

.share-btn{
  background:white;
  border:1px solid #6a0dad;
  color:#6a0dad;
  padding:12px;
  border-radius:10px;
}

@media(max-width:768px){
  .product-container{
    grid-template-columns:1fr;
  }
}
      `}</style>
    </div>
  );
};

export default ProductDetails;
