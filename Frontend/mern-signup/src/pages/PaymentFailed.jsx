import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="payment-page">
        <div className="payment-card failed-card">
          <div className="failed-icon">❌</div>

          <h1>Payment Failed</h1>

          <p className="subtitle">
            Unfortunately, we couldn't process your payment.
          </p>

          <div className="info-box">
            <p>⚠️ Your payment was cancelled or could not be completed.</p>
            <p>🔒 No amount has been charged from your account.</p>
            <p>🛒 Your cart items are still saved.</p>
            <p>🔄 You can retry the payment anytime.</p>
            <p>📞 If money was deducted, please contact support.</p>
          </div>

          <div className="support-box">
            <h3>Need Help?</h3>
            <p>📞 7975390038</p>
            <p>🌐 www.picklebite.in</p>
            <p>📧 support@picklebite.in</p>
          </div>

          <div className="button-group">
            <button
              className="primary-btn"
              onClick={() => navigate("/checkout")}
            >
              Retry Payment
            </button>

            <button className="secondary-btn" onClick={() => navigate("/home")}>
              Return To Home
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .payment-page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
          background:linear-gradient(
            135deg,
            #faf5ff,
            #f3e8ff,
            #ffffff
          );
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
          position:relative;
          overflow:hidden;
        }

        .failed-card::before{
          content:"";
          position:absolute;
          top:-100px;
          left:-100px;
          width:220px;
          height:220px;
          background:rgba(123,44,191,0.08);
          border-radius:50%;
        }

        .failed-icon{
          font-size:80px;
          margin-bottom:20px;
        }

        h1{
          color:#6A0DAD;
          margin-bottom:10px;
          font-size:34px;
        }

        .subtitle{
          color:#6b7280;
          margin-bottom:25px;
          font-size:16px;
        }

        .info-box{
          background:#faf5ff;
          border:1px solid #e9d5ff;
          border-radius:16px;
          padding:20px;
          text-align:left;
          margin-bottom:20px;
        }

        .info-box p{
          margin:10px 0;
          color:#374151;
        }

        .support-box{
          background:#f5f3ff;
          border-radius:16px;
          padding:18px;
          margin-bottom:25px;
        }

        .support-box h3{
          color:#6A0DAD;
          margin-bottom:10px;
        }

        .button-group{
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .primary-btn{
          width:100%;
          padding:16px;
          border:none;
          border-radius:14px;
          background:linear-gradient(
            90deg,
            #5A189A,
            #7B2CBF
          );
          color:white;
          font-size:18px;
          font-weight:700;
          cursor:pointer;
          transition:.3s;
        }

        .primary-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 25px rgba(123,44,191,.3);
        }

        .secondary-btn{
          width:100%;
          padding:16px;
          border:2px solid #7B2CBF;
          border-radius:14px;
          background:white;
          color:#7B2CBF;
          font-size:18px;
          font-weight:700;
          cursor:pointer;
          transition:.3s;
        }

        .secondary-btn:hover{
          background:#faf5ff;
        }

        @media (max-width:768px){

          .payment-page{
            padding:16px;
          }

          .payment-card{
            padding:25px 20px;
            border-radius:20px;
          }

          .failed-icon{
            font-size:60px;
          }

          h1{
            font-size:28px;
          }

          .subtitle{
            font-size:14px;
          }

          .info-box{
            padding:16px;
          }

          .info-box p{
            font-size:14px;
            line-height:1.6;
          }

          .support-box{
            padding:15px;
          }

          .primary-btn,
          .secondary-btn{
            font-size:16px;
            padding:14px;
          }
        }

        @media (max-width:480px){

          .payment-card{
            padding:20px 15px;
          }

          .failed-icon{
            font-size:50px;
          }

          h1{
            font-size:24px;
          }

          .subtitle{
            font-size:13px;
          }

          .info-box p{
            font-size:13px;
          }

          .primary-btn,
          .secondary-btn{
            font-size:15px;
            padding:13px;
          }
        }
      `}</style>
    </>
  );
};

export default PaymentFailed;
