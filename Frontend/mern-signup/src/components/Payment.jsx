import axios from "axios";
import { API } from "../constants/const";

const Payment = ({ amount, onSuccess }) => {
  const handlePay = async () => {
    try {
      const { data } = await axios.post(API.CREATE_PAYMENT, {
        amount,
      });
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);
        window.location.href = "/payment-failed";
      });

      rzp.open();
      const options = {
        key: "rzp_live_SLj3WBI3huqWV2",
        amount: data.amount,
        currency: "INR",
        name: "Picklebite",
        description: "Pickle Order",
        order_id: data.id,

        // If customer closes payment popup
        modal: {
          ondismiss: function () {
            window.location.href = "/payment-failed";
          },
        },

        handler: async (response) => {
          try {
            const verify = await axios.post(API.VERIFY_PAYMENT, response);

            if (verify.data.success) {
              try {
                await onSuccess(); // Save order
              } catch (err) {
                console.error("Order Creation Failed:", err);
              }

              // Clear cart
              localStorage.removeItem("cart");

              // Redirect Success Page
              window.location.href = "/payment-success";
            } else {
              window.location.href = "/payment-failed";
            }
          } catch (error) {
            console.error("Payment Verification Failed:", error);
            window.location.href = "/payment-failed";
          }
        },

        theme: {
          color: "#6A0DAD", // Royal Purple
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      window.location.href = "/payment-failed";
    }
  };

  return (
    <button className="btn btn-success w-100" onClick={handlePay}>
      Pay ₹{amount}
    </button>
  );
};

export default Payment;
