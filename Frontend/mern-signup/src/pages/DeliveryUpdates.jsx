import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./DeliveryUpdates.css";

const timeline = [
  {
    icon: "🛒",
    title: "Order Placed",
    desc: "Your order is successfully placed through our secure checkout.",
  },
  {
    icon: "👩‍🍳",
    title: "Fresh Preparation",
    desc: "Every pickle is freshly prepared after your order is confirmed.",
  },
  {
    icon: "📦",
    title: "Packed Carefully",
    desc: "Your products are packed in premium food-grade leak-proof packaging.",
  },
  {
    icon: "🚚",
    title: "Shipped",
    desc: "Your order is handed over to our trusted delivery partner.",
  },
  {
    icon: "📍",
    title: "Out For Delivery",
    desc: "Your delicious homemade pickles are on the way.",
  },
  {
    icon: "🏠",
    title: "Delivered",
    desc: "Fresh homemade happiness delivered to your doorstep.",
  },
];

const DeliveryUpdates = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Delivery Updates | Picklebite</title>

        <meta
          name="description"
          content="Track your Picklebite order and understand the complete delivery process."
        />
      </Helmet>

      <Navbar />

      <div className="delivery-page">
        {/* Hero */}

        <section className="delivery-hero">
          <div className="hero-overlay">
            <h1>🚚 Delivery Updates</h1>

            <p>
              From our kitchen to your doorstep — every Picklebite order is
              freshly prepared, carefully packed and delivered with love.
            </p>

            <button onClick={() => navigate("/my-orders")}>
              📦 Go To My Orders
            </button>
          </div>
        </section>

        {/* Statistics */}

        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">🥣</div>
            <h3>Freshly Prepared</h3>
            <p>Prepared after confirmation</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚚</div>
            <h3>Pan India</h3>
            <p>Fast & Safe Delivery</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>100% Protected Checkout</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <h3>Order Tracking</h3>
            <p>Track Every Stage</p>
          </div>
        </section>

        {/* Timeline */}

        <section className="timeline-section">
          <h2>Order Journey</h2>

          {timeline.map((item, index) => (
            <div className="timeline-card" key={index}>
              <div className="timeline-icon">{item.icon}</div>

              <div className="timeline-content">
                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Status Preview */}

        <section className="status-preview">
          <h2>How Order Status Looks</h2>

          <div className="status-box">
            <div className="completed">✔ Order Placed</div>

            <div className="completed">✔ Preparing</div>

            <div className="completed">✔ Packed</div>

            <div className="active">🚚 Shipped</div>

            <div>○ Out For Delivery</div>

            <div>○ Delivered</div>
          </div>
        </section>

        {/* Promise */}

        <section className="promise-section">
          <h2>Why Customers Love Picklebite</h2>

          <div className="promise-grid">
            <div>🌿 Fresh Ingredients</div>

            <div>❤️ Homemade Recipes</div>

            <div>🧴 No Oil</div>

            <div>🚫 No Preservatives</div>

            <div>🚚 Pan India Delivery</div>

            <div>📦 Premium Packaging</div>

            <div>🔒 Secure Payments</div>

            <div>⭐ Quality Assured</div>
          </div>
        </section>

        {/* Notification */}

        <section className="notification-card">
          <h2>🔔 Stay Updated</h2>

          <p>
            After placing your order, login to your account and open
            <strong> Profile → My Orders </strong>
            to view
          </p>

          <ul>
            <li>✔ Delivery Progress</li>

            <li>✔ Order History</li>

            <li>✔ Payment Status</li>

            <li>✔ Invoice Download</li>

            <li>✔ Current Order Status</li>
          </ul>
        </section>

        {/* FAQ */}

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <details>
            <summary>How can I track my order?</summary>

            <p>Login → Profile → My Orders to view delivery updates.</p>
          </details>

          <details>
            <summary>When is my order prepared?</summary>

            <p>We prepare every order freshly after confirmation.</p>
          </details>

          <details>
            <summary>Can I download my invoice?</summary>

            <p>Yes, from the My Orders page.</p>
          </details>
        </section>

        {/* CTA */}

        <section className="bottom-cta">
          <h2>Ready to Track Your Order?</h2>

          <p>View your order history, delivery updates and invoices anytime.</p>

          <button onClick={() => navigate("/my-orders")}>
            📦 Open My Orders →
          </button>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default DeliveryUpdates;
