"use client";

import axios from "axios";
import { API } from "../constants/const";

const Payment = ({ amount, onSuccess }) => {
  const handlePay = async () => {
    try {
      // 1️⃣ Create Razorpay order
      const { data } = await axios.post(API.CREATE_PAYMENT, {
        amount,
      });

      // 2️⃣ Open Razorpay popup
      const options = {
        key: "rzp_live_SLj3WBI3huqWV2", // Your Razorpay Key ID
        amount: data.amount,
        currency: "INR",
        name: "Picklebite",
        description: "Pickle Order",
        order_id: data.id,

        handler: async (response) => {
          // 3️⃣ Verify payment
          const verify = await axios.post(API.VERIFY_PAYMENT, response);

          if (verify.data.success) {
            alert("Payment Successful 🎉");
            onSuccess(); // place order
          } else {
            alert("Payment Failed ❌");
          }
        },

        theme: {
          color: "#28a745",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment Error");
    }
  };

  return (
    <button className="btn btn-success w-100" onClick={handlePay}>
      Pay Rs. {amount}
    </button>
  );
};

export default Payment;

// import React from "react";
// import Payment from "./Payment"; // your existing Razorpay component
// import "./PaymentPage.css";

// const PaymentPage = ({ amount, onSuccess }) => {
//   return (
//     <div className="payment-page">
//       <h2>Select Payment Method</h2>

//       {/* UPI SECTION */}
//       <div className="payment-box">
//         <h4>Pay via UPI</h4>
//         <p>
//           <strong>UPI ID:</strong> picklebite@upi
//         </p>

//         <button
//           className="upi-btn"
//           onClick={() =>
//             window.open(
//               `upi://pay?pa=picklebite@upi&pn=PickleBite&am=${amount}&cu=INR`,
//             )
//           }
//         >
//           Pay Using UPI App
//         </button>
//       </div>

//       {/* QR SECTION */}
//       <div className="payment-box">
//         <h4>Scan QR & Pay</h4>

//         <img
//           src="/assets/images/upi-qr.jpeg"
//           alt="UPI QR"
//           className="qr-image"
//         />

//         <p>Scan using PhonePe / Google Pay / Any UPI App</p>
//       </div>
//       {/* RAZORPAY SECTION */}
//       <div className="payment-box">
//         <h4>Pay Securely (Card / NetBanking / UPI)</h4>
//         <Payment amount={amount} onSuccess={onSuccess} />
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
