import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { API } from "../constants/const";
import {
  DELIVERY_TYPES,
  COUNTRIES,
  INDIAN_STATES,
  ERROR_MESSAGES,
  VALIDATION_REGEX,
} from "../constants/checkoutFormConstants";

import { validateCheckoutForm } from "../constants/checkoutFormValidation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [errors, setErrors] = useState({
    name: "Full name is required",
    email: "Email is required",
    phone: "Phone number is required",
    address: "Address is required",
    state: "State is required",
    deliveryDate: "Delivery date is required",
  });
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Full Name is required";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!VALIDATION_REGEX.EMAIL.test(value)) {
          error = "Please enter valid email";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!VALIDATION_REGEX.PHONE.test(value)) {
          error = "Please enter valid 10 digit phone number";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;

      case "state":
        if (!value.trim()) {
          error = "State is required";
        }
        break;

      case "pincode":
        if (customer.deliveryType === "Home Delivery") {
          if (!value.trim()) {
            error = "Pincode is required";
          } else if (!VALIDATION_REGEX.PINCODE.test(value)) {
            error = "Pincode must be 6 digits";
          }
        }
        break;
      case "deliveryDate":
        if (!value) {
          error = "Please select your preferred delivery date";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  const [showConfetti, setShowConfetti] = useState(false);
  const [freeDeliveryUnlocked, setFreeDeliveryUnlocked] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  useEffect(() => {
    if (subtotal >= 999 && !freeDeliveryUnlocked) {
      setShowConfetti(true);
      setFreeDeliveryUnlocked(true);

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    if (subtotal < 999) {
      setFreeDeliveryUnlocked(false);
    }
  }, [subtotal, freeDeliveryUnlocked]);

  const [customer, setCustomer] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("checkoutCustomer")) || {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        deliveryType: "Home Delivery",
        deliveryDate: "",
      }
    );
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];

    const fixed = stored.map((item) => ({
      ...item,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
    }));

    setCart(fixed);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedCustomer = {
      ...customer,
      [name]: value,
    };

    setCustomer(updatedCustomer);

    localStorage.setItem("checkoutCustomer", JSON.stringify(updatedCustomer));

    validateField(name, value);
  };

  const effectiveDeliveryCharge = subtotal >= 999 ? 0 : deliveryCharge;
  const [sampleBox, setSampleBox] = useState({
    items: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem("sampleBox");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        setSampleBox({
          items: parsed.items || [],
          totalPrice: parsed.totalPrice || 0,
        });
      } catch {
        setSampleBox({
          items: [],
          totalPrice: 0,
        });
      }
    }
  }, []);
  const grandTotal = subtotal + effectiveDeliveryCharge + sampleBox.totalPrice;
  /* ================= SHIPPING ================= */

  const checkShipping = async (pincode) => {
    try {
      const res = await axios.post(API.SHIPPING_RATE, {
        pincode,
        cart,
      });

      setDeliveryCharge(res.data.deliveryCharge);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= PAYMENT ================= */
  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id && cartItem.selectedWeight === item.selectedWeight
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (item) => {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedWeight === item.selectedWeight
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      )
      .filter((cartItem) => cartItem.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const removeSampleBox = () => {
    localStorage.removeItem("sampleBox");

    setSampleBox({
      items: [],
      totalPrice: 0,
    });

    toast.success("Sample Box removed");
  };
  const placeOrder = async () => {
    try {
      const validation = validateCheckoutForm(customer);

      if (!validation.isValid) {
        setErrors(validation.errors);

        Object.values(validation.errors).forEach((error) => {
          toast.error(error);
        });

        return;
      }

      // PINCODE REQUIRED ONLY FOR HOME DELIVERY

      if (customer.deliveryType === "Home Delivery" && !customer.pincode) {
        toast.error("Pincode is required for Home Delivery");
        return;
      }

      const { data: order } = await axios.post(API.CREATE_PAYMENT, {
        amount: grandTotal,
      });

      const options = {
        key: "rzp_live_SLj3WBI3huqWV2",

        amount: order.amount,

        currency: "INR",

        name: "Picklebite",

        description: "Pickle Order",

        order_id: order.id,

        handler: async (response) => {
          const verify = await axios.post(API.VERIFY_PAYMENT, response);

          if (!verify.data.success) {
            toast.error("Payment verification failed");
            return;
          }

          await axios.post(API.PLACE_ORDER, {
            customer,
            cart,
            sampleBox,
            paymentMethod: "RAZORPAY",
            total: grandTotal,
            subtotal,
            deliveryCharge: effectiveDeliveryCharge,
          });

          toast.success("🎉 Order Successful");

          localStorage.removeItem("cart");
          localStorage.removeItem("sampleBox");
          localStorage.removeItem("checkoutCustomer");

          navigate("/home");
        },

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },

        theme: {
          color: "#6A0DAD",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <h2
          style={{
            textAlign: "center",
            marginTop: 100,
          }}
        >
          Your Cart is Empty
        </h2>

        <Footer />
      </>
    );
  }
  const minDeliveryDate = new Date();
  minDeliveryDate.setDate(minDeliveryDate.getDate() + 5);

  const minDate = minDeliveryDate.toISOString().split("T")[0];
  return (
    <>
      <Navbar />

      <div className="checkout-container">
        <ToastContainer />
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={700}
            gravity={0.1}
            tweenDuration={6000}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />
        )}
        <div className="checkout-header">
          <h2>💳 Secure Checkout</h2>

          <p>
            You're just one step away from enjoying your PickleBite favorites.
            Complete your delivery details and finish your order securely.
          </p>
        </div>

        <div className="checkout-stepper">
          <div className="step completed">
            <div className="circle">🛒</div>
            <h5>Shopping Cart</h5>
            <small>Completed</small>
          </div>

          <div className="line active"></div>

          <div className="step completed">
            <div className="circle">🎁</div>
            <h5>Sample Box</h5>
            <small>Completed</small>
          </div>

          <div className="line active"></div>

          <div className="step active">
            <div className="circle">💳</div>
            <h5>Checkout</h5>
            <small>Secure Payment</small>
          </div>
        </div>
        <div className="checkout-wrapper">
          {/* LEFT SECTION */}

          <div className="checkout-left">
            <h3>Delivery & Shipping Address</h3>

            <input
              name="name"
              placeholder="Full Name *"
              value={customer.name}
              onChange={handleChange}
              className={errors.name ? "error-input" : ""}
            />

            {errors.name && <p className="error-text">{errors.name}</p>}
            <input
              name="email"
              placeholder="Email *"
              value={customer.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />

            {errors.email && <p className="error-text">{errors.email}</p>}
            <input
              name="phone"
              placeholder="Phone Number *"
              value={customer.phone}
              onChange={handleChange}
              className={errors.phone ? "error-input" : ""}
            />

            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <textarea
              name="address"
              placeholder="House number, street, area *"
              rows="3"
              value={customer.address}
              onChange={handleChange}
              className={errors.address ? "error-input" : ""}
            />

            {errors.address && <p className="error-text">{errors.address}</p>}

            <select
              className="form-select"
              name="country"
              value={customer.country}
              onChange={handleChange}
              required={true}
            >
              <option value="">Select Country</option>

              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="error-text">{errors.country}</p>}
            <select
              className="form-select"
              name="state"
              value={customer.state}
              onChange={handleChange}
              required={true}
            >
              <option value="">Select State</option>

              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="error-text">{errors.state}</p>}

            {/* DELIVERY BOX */}

            <div className="delivery-box">
              <h4>
                Delivery Type <span>*</span>
              </h4>

              {/* TOGGLE */}

              <div className="delivery-toggle">
                {/* IN PERSON */}

                <button
                  type="button"
                  className={
                    customer.deliveryType === "In-Person Delivery"
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    const updatedCustomer = {
                      ...customer,
                      deliveryType: "In-Person Delivery",
                      pincode: "",
                    };

                    setCustomer(updatedCustomer);

                    localStorage.setItem(
                      "checkoutCustomer",
                      JSON.stringify(updatedCustomer),
                    );

                    setDeliveryCharge(0);
                  }}
                >
                  👤 <span>In-Person Delivery</span>
                </button>

                {/* HOME DELIVERY */}

                <button
                  type="button"
                  className={
                    customer.deliveryType === "Home Delivery" ? "active" : ""
                  }
                  onClick={() => {
                    const updatedCustomer = {
                      ...customer,
                      deliveryType: "Home Delivery",
                    };

                    setCustomer(updatedCustomer);

                    localStorage.setItem(
                      "checkoutCustomer",
                      JSON.stringify(updatedCustomer),
                    );
                  }}
                >
                  🏠 <span>Home Delivery</span>
                </button>
              </div>

              {/* PINCODE */}

              <div className="pincode-section">
                <label>
                  Pincode{" "}
                  {customer.deliveryType === "Home Delivery" && <span>*</span>}
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={customer.pincode}
                  placeholder={
                    customer.deliveryType === "Home Delivery"
                      ? "Enter pincode"
                      : "Enter pincode (optional)"
                  }
                  disabled={customer.deliveryType === "In-Person Delivery"}
                  onChange={(e) => {
                    handleChange(e);

                    const pin = e.target.value;

                    if (
                      customer.deliveryType === "Home Delivery" &&
                      /^\d{6}$/.test(pin)
                    ) {
                      checkShipping(pin);
                    } else {
                      setDeliveryCharge(0);
                    }
                  }}
                />

                {customer.deliveryType === "In-Person Delivery" ? (
                  <p className="green-text">
                    Pincode is not required for In-Person Delivery.
                  </p>
                ) : (
                  <p className="red-text">
                    Pincode is required for Home Delivery.
                  </p>
                )}
              </div>
            </div>
            <div className="delivery-date-box">
              <label>
                📅 Preferred Delivery Date <span>*</span>
              </label>

              <input
                type="date"
                name="deliveryDate"
                min={minDate}
                value={customer.deliveryDate}
                onChange={handleChange}
              />
              {errors.deliveryDate && (
                <p className="error-text">{errors.deliveryDate}</p>
              )}
              <small className="delivery-note-text">
                Freshly prepared after your order. Please select a delivery date
                at least
                <strong> 5 days </strong>
                from today.
              </small>
            </div>
            {/* DELIVERY NOTE */}

            <div className="delivery-note">
              <p>
                🏠 <b>Home Delivery</b>
                <br />
                Delivery charges are paid separately to the delivery partner.
              </p>

              <br />

              <p>
                👤 <b>In-Person Delivery</b>
                <br />
                Pickup or local hand delivery. Any applicable charges are paid
                directly to the delivery partner.
              </p>

              <br />
            </div>

            {/* BUTTON */}

            <button className="pay-btn" onClick={placeOrder}>
              🔒 Complete Secure Payment • ₹{grandTotal}
            </button>
            <div className="trust-box">
              <p>🔒 100% Secure Razorpay Payment</p>
              <p>🚚 Pan India Delivery</p>
              <p>🌿 No Preservatives</p>
              <p>🧴 No Oil</p>
              <p>❤️ Homemade with Love</p>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div className="checkout-right">
            <h3>Order Summary</h3>

            {subtotal < 999 ? (
              <div
                style={{
                  background: "#efe7fb",
                  color: "#6A0DAD",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Add ₹{999 - subtotal} more to unlock FREE DELIVERY 🚚
              </div>
            ) : (
              <div
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                <div className="free-delivery-celebration">
                  🎉🎊 FREE DELIVERY UNLOCKED! 🚚✨
                </div>
              </div>
            )}
            <div className="row">
              <span>Preferred Delivery</span>

              <span>
                {customer.deliveryDate
                  ? new Date(customer.deliveryDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "--"}
              </span>
            </div>
            <div className="row">
              <span>Items</span>

              <span>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>
            {sampleBox.items.length > 0 && (
              <>
                <div className="sample-summary">
                  <div className="sample-summary-header">
                    <h5>🎁 Sample Box Selected</h5>

                    <button
                      className="remove-sample-btn"
                      onClick={removeSampleBox}
                    >
                      🗑 Remove
                    </button>
                  </div>

                  {sampleBox.items.map((item, index) => (
                    <div key={index} className="sample-item">
                      • {item}
                    </div>
                  ))}

                  <div className="sample-price">
                    Total : ₹{sampleBox.totalPrice}
                  </div>
                </div>

                <hr />
              </>
            )}
            <hr />

            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <p>{item.name}</p>

                  <div className="item-details-row">
                    <small>{item.selectedWeight}</small>

                    <div className="qty-controls-summary">
                      <button onClick={() => decreaseQuantity(item)}>-</button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQuantity(item)}>+</button>
                    </div>

                    <b>₹{item.price * item.quantity}</b>
                  </div>
                </div>
              </div>
            ))}

            <hr />

            <div className="row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {sampleBox.totalPrice > 0 && (
              <div className="row">
                <span>🎁 Sample Box</span>
                <span>₹{sampleBox.totalPrice}</span>
              </div>
            )}
            <div className="row">
              <span>Delivery</span>
              <span>
                {subtotal >= 999 ? (
                  <span style={{ color: "green" }}>FREE</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>

            <hr />

            <div className="row total">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* CSS */}

        <style>{`

.checkout-container{
padding:40px;
background:#f5f6fa;
min-height:100vh;
font-family:Poppins;
}

.title{
text-align:center;
margin-bottom:30px;
font-size:32px;
font-weight:700;
}

.checkout-wrapper{
max-width:1200px;
margin:auto;
display:flex;
gap:40px;
flex-wrap:wrap;
}
.checkout-header{
  text-align:center;
  margin-bottom:35px;
}

.checkout-header h2{
  color:#6A0DAD;
  font-size:34px;
  margin-bottom:10px;
}

.checkout-header p{
  color:#666;
  font-size:16px;
}

.checkout-stepper{
  max-width:1100px;
  margin:0 auto 45px;
  display:flex;
  justify-content:center;
  align-items:center;
}

.step{
  width:220px;
  text-align:center;
}
.sample-summary{
  background:#faf5ff;
  border:1px solid #d8b4fe;
  border-radius:14px;
  padding:16px;
  margin-bottom:18px;
}

.sample-summary-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
}

.sample-summary-header h5{
  margin:0;
  color:#6A0DAD;
  font-size:17px;
}

.sample-item{
  padding:4px 0;
  color:#555;
}

.sample-price{
  margin-top:12px;
  font-weight:700;
  color:#4B0082;
}

.remove-sample-btn{
  border:none;
  background:#ef4444;
  color:#fff;
  padding:8px 14px;
  border-radius:8px;
  cursor:pointer;
  font-size:13px;
  font-weight:600;
  transition:.3s;
}

.remove-sample-btn:hover{
  background:#dc2626;
  transform:translateY(-2px);
}
.circle{
  width:70px;
  height:70px;
  margin:auto;
  border-radius:50%;
  background:#ececec;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:30px;
  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.step.active .circle{
  background:linear-gradient(135deg,#8B5CF6,#6A0DAD);
  color:#fff;
}

.step.completed .circle{
  background:#22c55e;
  color:#fff;
}

.step h5{
  margin-top:15px;
  font-size:18px;
}

.step small{
  color:#777;
}

.line{
  width:120px;
  height:4px;
  background:#ddd;
  border-radius:20px;
}

.line.active{
  background:linear-gradient(to right,#22c55e,#6A0DAD);
}

.trust-box{
  margin-top:20px;
  padding:18px;
  border-radius:14px;
  background:#faf5ff;
  border:1px solid #d8b4fe;
}

.trust-box p{
  margin:8px 0;
  color:#555;
  font-size:14px;
}
/* LEFT */

.checkout-left{
flex:2;
background:#fff;
padding:35px;
border-radius:18px;
box-shadow:0 4px 14px rgba(0,0,0,0.08);
}

.checkout-left h3{
margin-bottom:20px;
}
.item-details-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:5px;
}

.qty-controls-summary{
  display:flex;
  align-items:center;
  gap:6px;
}

.qty-controls-summary button{
  width:28px;
  height:28px;
  border:none;
  border-radius:6px;
  background:#6A0DAD;
  color:#fff;
  cursor:pointer;
}
.sample-box-card{
  margin-top:20px;
  padding:18px;
  border-radius:16px;
  background:linear-gradient(
    135deg,
    #f7f0ff,
    #efe7fb
  );
  border:1px solid #d8b4fe;
}

.sample-box-card h4{
  margin:0 0 8px;
  color:#6A0DAD;
  font-size:18px;
  font-weight:700;
}

.sample-box-card p{
  margin-bottom:15px;
  color:#555;
  line-height:1.6;
  font-size:14px;
}

.sample-box-btn{
  width:100%;
  padding:14px;
  border:none;
  border-radius:12px;
  background:linear-gradient(
    135deg,
    #8B5CF6,
    #6A0DAD
  );
  color:white;
  font-size:15px;
  font-weight:700;
  cursor:pointer;
  transition:.3s;
}

.sample-box-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 20px rgba(106,13,173,.25);
}
.cart-info{
  flex:1;
}
.checkout-left input,
.checkout-left textarea{
width:100%;
padding:14px;
margin:10px 0;
border-radius:12px;
border:1px solid #d1d5db;
font-size:15px;
outline:none;
transition:0.3s;
}

.checkout-left input:focus,
.checkout-left textarea:focus{
border:1px solid #7B2CBF;
box-shadow:0 0 0 3px rgba(123,44,191,0.12);
}
/* 🌍 SELECT DROPDOWN */
.free-delivery-celebration {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  animation: pulseGlow 1.2s infinite;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
}

@keyframes pulseGlow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
  }

  50% {
    transform: scale(1.03);
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.8);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
  }
}
.form-select {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  background: white;
  color: #222;
  cursor: pointer;
  transition: 0.3s;
  appearance: none;
  margin-bottom: 20px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='%237B2CBF' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 5.5l6 6 6-6' stroke='%237B2CBF' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");

  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
}

/* ✨ FOCUS */

.form-select:focus {
  border-color: #7B2CBF;
  box-shadow: 0 0 0 3px rgba(123,44,191,0.15);
  outline: none;
}

/* 🖱 HOVER */

.form-select:hover {
  border-color: #9D4EDD;
}
/* DELIVERY BOX */

.delivery-box{
margin-top:20px;
padding:25px;
border:1px solid #e5e7eb;
border-radius:16px;
background:#fff;
}

.delivery-box h4{
margin-bottom:18px;
font-size:18px;
font-weight:600;
color:#111827;
}
.error-text{
color:#dc2626;
font-size:13px;
margin-top:4px;
margin-bottom:10px;
font-weight:500;
}

.error-input{
border:1px solid #dc2626 !important;
background:#fff5f5 !important;
}

.delivery-box h4 span{
color:red;
}

/* TOGGLE */

/* SMALLER TOGGLE */

.delivery-toggle{
display:flex;
width:100%; /* FULL WIDTH */
border:1px solid #e5e7eb;
border-radius:12px;
overflow:hidden;
background:#fff;
margin-bottom:22px;
height:42px;
}

.delivery-toggle button{
flex:1;
width:50%; /* EACH BUTTON EQUAL WIDTH */
border:none;
background:#fff;
cursor:pointer;
font-size:13px;
font-weight:600;
transition:all 0.3s ease;
display:flex;
align-items:center;
justify-content:center;
gap:4px;
color:#6A0DAD;
padding:0 10px;
}

/* ACTIVE BUTTON */

.delivery-toggle button.active{
background:linear-gradient(
90deg,
#5A189A,
#7B2CBF
);
color:#fff;
}

/* REMOVE BLUE DEFAULT */

.delivery-toggle button:focus{
outline:none;
box-shadow:none;
}
.delivery-date-box {
  margin-top: 20px;
}

.delivery-date-box label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.delivery-date-box input {
  width: 100%;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
}

.delivery-date-box input:focus {
  outline: none;
  border-color: #6A0DAD;
  box-shadow: 0 0 0 3px rgba(106, 13, 173, 0.15);
}

.delivery-note-text {
  display: block;
  margin-top: 8px;
  color: #666;
  font-size: 13px;
}
/* HOVER */

.delivery-toggle button:hover{
background:#faf5ff;
}

/* ACTIVE HOVER */

.delivery-toggle button.active:hover{
background:linear-gradient(
90deg,
#5A189A,
#7B2CBF
);
}

/* PINCODE */

.pincode-section label{
display:block;
font-weight:600;
margin-bottom:10px;
font-size:15px;
}

.pincode-section label span{
color:red;
}

.pincode-section input{
width:100%;
padding:14px;
border-radius:10px;
border:1px solid #d1d5db;
font-size:15px;
outline:none;
transition:0.3s;
background:#fff;
}

.pincode-section input:focus{
border:1px solid #7B2CBF;
box-shadow:0 0 0 3px rgba(123,44,191,0.12);
}

.pincode-section input:disabled{
background:#f3f4f6;
cursor:not-allowed;
}

.green-text{
color:#16a34a;
font-size:14px;
margin-top:10px;
}

.red-text{
color:#dc2626;
font-size:14px;
margin-top:10px;
}

/* NOTE */

.delivery-note{
background:#efe7fb;
padding:18px;
border-radius:12px;
font-size:15px;
margin-top:20px;
line-height:1.8;
color:#4b5563;
}

/* BUTTON */

.pay-btn{
width:100%;
padding:16px;
margin-top:22px;
border:none;
border-radius:12px;
background:linear-gradient(
90deg,
#5A189A,
#7B2CBF
);
color:#fff;
font-size:18px;
font-weight:700;
cursor:pointer;
transition:0.3s;
}

.pay-btn:hover{
transform:translateY(-2px);
}

/* RIGHT */

.checkout-right{
flex:1;
background:#fff;
padding:25px;
border-radius:18px;
box-shadow:0 4px 14px rgba(0,0,0,0.08);
height:fit-content;
}

.cart-item{
display:flex;
gap:12px;
margin-bottom:15px;
align-items:center;
}

.cart-item img{
width:65px;
height:65px;
border-radius:10px;
object-fit:cover;
}

.cart-info{
flex:1;
display:flex;
flex-direction:column;
gap:3px;
}

.row{
display:flex;
justify-content:space-between;
margin:12px 0;
}

.total{
font-size:18px;
font-weight:700;
}

/* MOBILE */

@media(max-width:768px){

.checkout-wrapper{
flex-direction:column;
}

.checkout-container{
padding:20px;
}

.checkout-left,
.checkout-right{
padding:20px;
}

.delivery-toggle{
height:auto;
}

.delivery-toggle button{
padding:16px 10px;
font-size:14px;
}

.title{
font-size:24px;
}

}

`}</style>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
