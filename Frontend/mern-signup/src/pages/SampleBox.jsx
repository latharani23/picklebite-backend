import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const products = [
  "🥭 Mango Pickle",
  "🧄 Garlic Pickle",
  "🍋 Lemon Pickle",
  "🥕 Mixed Veg Pickle",
  // "🍊 Gajanimbe Pickle",
  // "🥒 Hirelikayi Pickle",
  "🥒 Cucumber Pickle",
  "🌱 Bitter Gourd Pickle",
  "🌶️ Green Chilli Pickle",
  "🍃 Gongura Pickle",

  "🥥 Copra Chutney Powder",
  "🥜 Groundnut Chutney Powder",
  "🌿 Curry Leaves Powder",
  "🌾 Mixed Seeds Powder",
  "🍀 Moringa Powder",
  "🍛 Sambar Powder",
  "🥣 Rasam Powder",
  "🌶️ Majjige Menasinakayi",
  "🌰 Huchchellu Powder",
  "🌶️ Red Chilly Powder",
];

const SampleBox = () => {
  const navigate = useNavigate();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const toggleProduct = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      if (selectedProducts.length >= 3) {
        alert("You can select max 3 products for your sample box.");
        return;
      }

      setSelectedProducts([...selectedProducts, product]);
    }
  };
  const [boxReady, setBoxReady] = useState(false);
  const [wantSample, setWantSample] = useState(false);
  const handleReady = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    const SAMPLE_PRICE = 20;
    const totalPrice = selectedProducts.length * SAMPLE_PRICE;

    localStorage.setItem(
      "sampleBox",
      JSON.stringify({
        items: selectedProducts,
        totalPrice,
      }),
      {
        expires: 1, // expires in 1 day
      },
    );
    setShowConfetti(true);
    setBoxReady(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };
  const SAMPLE_PRICE = 20;
  const totalPrice = selectedProducts.length * SAMPLE_PRICE;
  return (
    <div className="sample-page">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="checkout-header">
        <h2>🎁 Customize Your Sample Box</h2>

        <p>
          You're almost done! Choose up to <b>3</b> products to discover more
          PickleBite favorites before checkout.
        </p>
      </div>
      <div className="checkout-stepper">
        <div className="step completed">
          <div className="circle">🛒</div>
          <h5>Shopping Cart</h5>
          <small>Completed</small>
        </div>

        <div className="line active"></div>

        <div className="step active">
          <div className="circle">🎁</div>
          <h5>Sample Box</h5>
          <small>Choose Samples</small>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="circle">💳</div>
          <h5>Checkout</h5>
          <small>Secure Payment</small>
        </div>
      </div>
      <div className="sample-wrapper">
        <div className="sample-question-card">
          <div className="question-icon">🎁</div>

          <h2>Would you like to try PickleBite Samples?</h2>

          <p>
            Discover new favourites before placing your order. Select up to{" "}
            <b>3 handmade samples</b> for only
            <span className="highlight"> ₹20 each.</span>
          </p>

          <div className="sample-buttons">
            <button className="yes-btn" onClick={() => setWantSample(true)}>
              👍 Yes, Show Samples
            </button>

            <button className="no-btn" onClick={() => navigate("/checkout")}>
              ⏭ Skip & Continue
            </button>
          </div>
        </div>

        {wantSample && (
          <div className="sample-card">
            <h1>🎁 Build Your PickleBite Sample Box</h1>

            <div className="sample-description">
              <span className="sparkle">✨</span>
              Choose up to <b>3</b> delicious products you'd love to try. Mix &
              Match our handcrafted <span>Pickles</span>, flavorful{" "}
              <span>Powders</span>, and special PickleBite favorites to create
              your very own
              <b> Personalized Sample Box</b>.
              <span className="sparkle">🎁</span>
            </div>

            <img
              src="/assets/images/sample-box.webp"
              alt="Sample Box"
              className="sample-image"
            />
            <div className="selection-count">
              <h3>{selectedProducts.length} / 3 Products Selected</h3>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(selectedProducts.length / 3) * 100}%`,
                  }}
                />
              </div>

              <p>₹20 per sample</p>

              <h2 style={{ color: "#16a34a" }}>₹{totalPrice}</h2>
            </div>
            <div className="chips-container">
              {products.map((product) => (
                <button
                  key={product}
                  className={`chip ${
                    selectedProducts.includes(product) ? "active" : ""
                  }`}
                  onClick={() => toggleProduct(product)}
                >
                  {product}
                </button>
              ))}
            </div>

            {selectedProducts.length > 0 && (
              <div className="selected-box">
                <h3>📦 Your Sample Box</h3>

                {selectedProducts.map((item) => (
                  <span key={item} className="selected-chip">
                    {item}
                  </span>
                ))}
              </div>
            )}

            <button className="ready-btn" onClick={handleReady}>
              ✨ Save My Sample Box
            </button>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              💳 Continue to Secure Checkout →
            </button>
            {boxReady && (
              <div className="success-box">
                <h3>🎉 Your Sample Box Is Ready!</h3>

                <p>
                  Great choice! Your customized PickleBite Sample Box has been
                  prepared. Proceed to checkout to complete your order.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
     .sample-page{
  min-height:100vh;
  background:#f8f5ff;
  padding:40px 20px;
}
  /* ================= HEADER ================= */
.sample-wrapper{
  max-width:900px;
  margin:0 auto;
}
.checkout-header{
  text-align:center;
  margin-bottom:35px;
}

.checkout-header h2{
  color:#6A0DAD;
  font-size:38px;
  margin-bottom:10px;
}

.checkout-header p{
  max-width:700px;
  margin:auto;
  color:#666;
  font-size:17px;
  line-height:1.7;
}
.sample-question-card{
  max-width:850px;
  margin:40px auto;
  background:#fff;
  border-radius:24px;
  padding:35px;
  text-align:center;
  box-shadow:0 12px 35px rgba(0,0,0,.08);
  border:2px solid #efe7fb;
}

.question-icon{
  width:80px;
  height:80px;
  margin:auto;
  border-radius:50%;
  background:linear-gradient(135deg,#8B5CF6,#6A0DAD);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:40px;
  color:#fff;
  margin-bottom:20px;
}

.sample-question-card h2{
  font-size:34px;
  color:#6A0DAD;
  margin-bottom:12px;
}

.sample-question-card p{
  font-size:18px;
  color:#555;
  line-height:1.7;
  max-width:650px;
  margin:auto;
}

.highlight{
  color:#16a34a;
  font-weight:bold;
}

.sample-buttons{
  margin-top:30px;
  display:flex;
  justify-content:center;
  gap:20px;
  flex-wrap:wrap;
}

.yes-btn,
.no-btn{
  padding:16px 34px;
  border:none;
  border-radius:14px;
  font-size:17px;
  font-weight:700;
  cursor:pointer;
  transition:.3s;
}

.yes-btn{
  background:linear-gradient(135deg,#8B5CF6,#6A0DAD);
  color:#fff;
}

.yes-btn:hover{
  transform:translateY(-3px);
  box-shadow:0 12px 25px rgba(106,13,173,.35);
}

.no-btn{
  background:#f3f4f6;
  color:#444;
}

.no-btn:hover{
  background:#e5e7eb;
  transform:translateY(-3px);
}
/* ================= STEPPER ================= */

.checkout-stepper{
  max-width:1100px;
  margin:0 auto 40px;
  display:flex;
  justify-content:center;
  align-items:center;
}
  .progress-bar{
height:10px;
background:#eee;
border-radius:20px;
overflow:hidden;
margin:15px auto;
max-width:300px;
}

.progress-fill{
height:100%;
background:linear-gradient(90deg,#8B5CF6,#6A0DAD);
transition:.3s;
}

.step{
  width:220px;
  text-align:center;
  padding:20px;
  border-radius:18px;
}

.step.completed{
  background:#f0fdf4;
}

.step.active{
  background:#faf5ff;
  border:2px solid #d8b4fe;
}

.circle{
  width:70px;
  height:70px;
  margin:auto;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:32px;
  background:#ececec;
}

.step.completed .circle{
  background:#16a34a;
}

.step.active .circle{
  background:linear-gradient(135deg,#8B5CF6,#6A0DAD);
}

.line{
  width:120px;
  height:4px;
  border-radius:50px;
  background:#ddd;
}

.line.active{
  background:linear-gradient(90deg,#8B5CF6,#6A0DAD);
}
.sample-description{
  max-width:700px;
  margin:20px auto 30px;
  padding:18px 24px;

  background:linear-gradient(
    135deg,
    #faf5ff,
    #f3e8ff
  );

  border:1px solid #d8b4fe;
  border-radius:18px;

  text-align:center;

  font-size:17px;
  line-height:1.8;
  color:#4b5563;

  box-shadow:0 6px 20px rgba(106,13,173,.08);
}

.sample-description b{
  color:#6A0DAD;
  font-weight:700;
}

.sample-description span{
  color:#7B2CBF;
  font-weight:700;
}

.sparkle{
  display:block;
  font-size:24px;
  margin-bottom:8px;
  animation: floatGlow 2s ease-in-out infinite;
}

@keyframes floatGlow{
  0%{
    transform:translateY(0px);
  }

  50%{
    transform:translateY(-4px);
  }

  100%{
    transform:translateY(0px);
  }
}

@media(max-width:768px){

  .sample-description{
    font-size:15px;
    padding:16px;
    line-height:1.7;
  }

  .sparkle{
    font-size:20px;
  }
}
      .sample-card{
        max-width:900px;
        width:100%;
        background:white;
        padding:35px;
        border-radius:24px;
        box-shadow:0 8px 30px rgba(0,0,0,.08);
      }
        .success-box{
  margin-top:20px;
  padding:20px;
  border-radius:16px;
  text-align:center;
  background:linear-gradient(
    135deg,
    #dcfce7,
    #bbf7d0
  );
  border:1px solid #22c55e;
}

.success-box h3{
  color:#166534;
  margin-bottom:10px;
}

.success-box p{
  color:#166534;
}
.category-title{
  color:#6A0DAD;
  margin-top:30px;
  margin-bottom:15px;
  font-size:22px;
  font-weight:700;
  text-align:center;
}
  .selection-count{
  text-align:center;
  margin:15px 0;
  color:#6A0DAD;
  font-size:18px;
  font-weight:700;
}
      .sample-card h1{
        text-align:center;
        color:#6A0DAD;
      }

      .sample-card p{
        text-align:center;
        color:#555;
        margin-bottom:20px;
      }

      .sample-image{
        width:220px;
        display:block;
        margin:auto;
      }

      .chips-container{
        display:flex;
        flex-wrap:wrap;
        gap:12px;
        justify-content:center;
        margin-top:25px;
      }

      .chip{
        border:none;
        padding:12px 16px;
        border-radius:30px;
        background:#ede9fe;
        color:#6A0DAD;
        cursor:pointer;
        font-weight:600;
      }

      .chip.active{
        background:#6A0DAD;
        color:white;
      }

      .selected-box{
        margin-top:25px;
        padding:20px;
        border-radius:15px;
        background:#faf5ff;
        border:1px solid #d8b4fe;
      }

      .selected-chip{
        display:inline-block;
        margin:5px;
        padding:8px 12px;
        background:#6A0DAD;
        color:white;
        border-radius:20px;
      }

      .ready-btn{
        width:100%;
        margin-top:25px;
        padding:16px;
        border:none;
        border-radius:14px;
        background:#22c55e;
        color:white;
        font-size:16px;
        font-weight:700;
        cursor:pointer;
      }

      .checkout-btn{
        width:100%;
        margin-top:15px;
        padding:16px;
        border:none;
        border-radius:14px;
        background:linear-gradient(
          135deg,
          #8B5CF6,
          #6A0DAD
        );
        color:white;
        font-size:16px;
        font-weight:700;
        cursor:pointer;
      }

      @media(max-width:768px){

        .sample-page{
          padding:15px;
        }

        .sample-card{
          padding:20px;
        }

        .sample-card h1{
          font-size:24px;
        }

        .sample-image{
          width:150px;
        }
.success-box{
  padding:15px;
}

.selection-count{
  font-size:16px;
}

.selected-chip{
  font-size:13px;
          width:100%;
        }
      }
      `}</style>
    </div>
  );
};

export default SampleBox;
