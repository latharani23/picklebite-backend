import React from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />

      <div className="payment-page">
        <div className="payment-card success-card">
          <div className="success-icon">🎉</div>

          <h1>Order Placed Successfully!</h1>

          <p className="subtitle">Thank you for choosing PickleBite ❤️</p>

          <div className="info-box">
            <p>✅ Payment received successfully</p>
            <p>📦 Your order has been confirmed</p>
            <p>📧 Invoice and confirmation email have been sent</p>
            <p>🚚 Delivery updates will be shared through email</p>
            <p>📬 Please check your Inbox or Spam folder</p>
          </div>

          <div className="support-box">
            <h3>Need Help?</h3>
            <p>📞 7975390038</p>
            <p>🌐 www.picklebite.in</p>
          </div>

          <button className="primary-btn" onClick={() => navigate("/")}>
            Go To PickleBite Home
          </button>
        </div>
      </div>

      <style>{`
        .payment-page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
          background:linear-gradient(135deg,#faf5ff,#f3e8ff,#ffffff);
        }

        .payment-card{
          width:100%;
          max-width:650px;
          background:#fff;
          padding:40px;
          border-radius:24px;
          text-align:center;
          box-shadow:0 20px 50px rgba(106,13,173,.15);
          border:1px solid #e9d5ff;
        }

        .success-icon{
          font-size:80px;
          margin-bottom:20px;
        }

        h1{
          color:#6A0DAD;
        }

        .primary-btn{
          width:100%;
          padding:16px;
          border:none;
          border-radius:14px;
          background:#6A0DAD;
          color:white;
          cursor:pointer;
        }
      `}</style>
    </>
  );
};

export default PaymentSuccess;
