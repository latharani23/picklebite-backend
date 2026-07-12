import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Shopping Cart</h2>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/home")} // or "/pickles"
        >
          ← Back to Shopping
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty 🛒{" "}
          <span
            style={{ color: "#ff6b00", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </span>
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={`${item.id}-${item.selectedWeight}`}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      className="me-2"
                    />
                    {item.name} ({item.selectedWeight})
                  </td>

                  <td>Rs. {item.price}</td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.selectedWeight,
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </td>

                  <td>Rs. {item.price * item.quantity}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeFromCart(item.id, item.selectedWeight)
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end">Total: Rs. {totalPrice}</h4>

          <div className="text-end mt-3">
            <button
              className="btn btn-success"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
