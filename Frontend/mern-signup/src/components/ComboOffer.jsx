import React from "react";
import "./ComboOffer.css";

const ComboOffer = () => {
  return (
    <div className="combo-container">
      <h2>🔥 Picklebite Combo Offer</h2>

      <div className="combo-card">
        <div className="combo-tag">Combo Deal</div>

        <img
          src="/assets/images/combo powder/powder_combo1.webp"
          alt="Healthy Powder Combo"
        />

        <h3>Healthy Powder Combo</h3>

        <div className="price-row">
          <span className="new-price">₹349</span>

          <span className="old-price">₹399</span>

          <span className="discount">10% OFF</span>
        </div>

        <div className="royal-highlight">
          <span className="highlight-icon">🌿</span>

          <span className="highlight-text">
            Perfect for Healthy Everyday Cooking
          </span>
        </div>

        <button className="combo-btn">Buy Combo</button>
      </div>
      <div className="combo-card">
        <div className="combo-tag">Best Value</div>

        <img
          src="/assets/images/combo powder/powder_combo2.webp"
          alt="Monthly Masala Combo"
        />

        <h3>Monthly Masala Combo</h3>

        <div className="price-row">
          <span className="new-price">₹344</span>

          <span className="old-price">₹399</span>

          <span className="discount">9% OFF</span>
        </div>

        <div className="royal-highlight">
          <span className="highlight-icon">🍛</span>

          <span className="highlight-text">
            Complete Kitchen Essentials • Best Value
          </span>
        </div>

        <button className="combo-btn">Buy Combo</button>
      </div>
    </div>
  );
};

export default ComboOffer;
