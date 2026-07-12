import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../constants/const";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  PRODUCT_OPTIONS,
  RATING_OPTIONS,
  ACCEPTED_MEDIA,
  FEEDBACK_MESSAGES,
} from "../constants/feedbackConstants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // ✅ track submission
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reviewMedia, setReviewMedia] = useState([]);

  const navigate = useNavigate();

  // ✅ Check on load if already submitted
  useEffect(() => {
    const alreadySubmitted = localStorage.getItem("feedbackSubmitted");
    if (alreadySubmitted) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitted) {
      toast.info("You have already submitted feedback 😊");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("rating", rating);
      formData.append("message", message);
      formData.append("productsTried", JSON.stringify(selectedProducts));

      reviewMedia.forEach((file) => {
        formData.append("media", file);
      });

      const res = await axios.post(API.ADD_COMMENT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Thank you for your feedback ❤️");

        localStorage.setItem("feedbackSubmitted", "true");
        setSubmitted(true);

        setName("");
        setMessage("");
        setRating(5);
        setSelectedProducts([]);

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit feedback");
    }
  };
  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Feedback | Picklebite</title>
        <meta
          name="description"
          content="Share your feedback about Picklebite homemade pickles."
        />
        <meta
          name="keywords"
          content="picklebite feedback, homemade pickle reviews"
        />
      </Helmet>

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= PAGE ================= */}
      <div className="feedback-page">
        <div className="feedback-card">
          {/* LOGO */}
          <img
            src="/assets/images/logo2.webp"
            alt="Picklebite Logo"
            className="feedback-logo"
            onClick={() => navigate("/home")}
          />

          {/* TITLE */}
          <h2 className="feedback-title">{FEEDBACK_MESSAGES.TITLE}</h2>

          <p className="feedback-subtitle">{FEEDBACK_MESSAGES.SUBTITLE}</p>

          {/* ✅ CONDITIONAL UI */}
          {submitted ? (
            <div className="already-submitted">
              <h3>✅ Feedback Already Submitted</h3>
              <p>Thank you for your response 💛</p>

              <button className="submit-btn" onClick={() => navigate("/home")}>
                Go to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
              />

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-select"
              >
                {RATING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="product-selection">
                <h4>🥭 Which products have you tried?</h4>

                <div className="checkbox-grid">
                  {PRODUCT_OPTIONS.map((product) => (
                    <label key={product} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product]);
                          } else {
                            setSelectedProducts(
                              selectedProducts.filter((p) => p !== product),
                            );
                          }
                        }}
                      />
                      {product}
                    </label>
                  ))}
                </div>
              </div>
              <div className="media-upload">
                <label>📸 Upload Images / 🎥 Videos</label>

                <input
                  type="file"
                  multiple
                  accept={ACCEPTED_MEDIA}
                  onChange={(e) => setReviewMedia(Array.from(e.target.files))}
                />

                <div className="preview-grid">
                  {reviewMedia.map((file, index) => (
                    <div key={index} className="preview-item">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="preview-image"
                        />
                      ) : (
                        <video controls className="preview-video">
                          <source
                            src={URL.createObjectURL(file)}
                            type={file.type}
                          />
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Write your feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="4"
                className="form-control"
              />

              <button className="submit-btn">Submit Feedback</button>
            </form>
          )}

          {/* BACK */}
          <div className="back-home" onClick={() => navigate("/home")}>
            ← Back to Home
          </div>
        </div>
      </div>

      <ToastContainer />

      {/* ================= FOOTER ================= */}
      <Footer />

      {/* ================= STYLES ================= */}
      <style>{`

/* PAGE */
.feedback-page{
background: linear-gradient(135deg, #FAF7FF, #E6D6FF);
min-height:100vh;
padding:60px 20px;
display:flex;
justify-content:center;
align-items:flex-start;
}

/* CARD */
.feedback-card{
width:100%;
max-width:500px;
background:white;
padding:40px;
border-radius:20px;
box-shadow:0 15px 40px rgba(0,0,0,0.1);
text-align:center;
margin-top:20px;
animation:fadeIn 0.5s ease;
}
.product-selection{
text-align:left;
margin-top:10px;
}
.preview-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(100px,1fr));
gap:10px;
margin-top:15px;
}

.preview-item{
border:1px solid #ddd;
border-radius:10px;
overflow:hidden;
}



.preview-image{
width:100%;
height:150px;
object-fit:cover;
border-radius:10px;
}

.preview-video{
width:100%;
height:150px;
object-fit:cover;
border-radius:10px;
}

.preview-video{
width:100%;
height:100px;
object-fit:cover;
}
.product-selection h4{
font-size:16px;
margin-bottom:10px;
color:#4B0082;
}

.checkbox-grid{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:8px;
}

.checkbox-item{
display:flex;
align-items:center;
gap:8px;
font-size:14px;
}

.media-upload{
text-align:left;
margin-top:10px;
}

.media-upload label{
display:block;
font-weight:600;
margin-bottom:8px;
color:#4B0082;
}

.media-upload input{
width:100%;
}
/* LOGO */
.feedback-logo{
height:80px;
margin-bottom:20px;
cursor:pointer;
}

/* TITLE */
.feedback-title{
font-weight:800;
background:linear-#4B0082;
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
margin-bottom:10px;
}

.feedback-subtitle{
color:#777;
margin-bottom:25px;
}

/* FORM */
.feedback-form{
display:flex;
flex-direction:column;
gap:15px;
}

/* BUTTON */
.submit-btn{
background:#4B0082;
color:white;
padding:12px;
border:none;
border-radius:10px;
font-weight:600;
transition:0.3s;
cursor:pointer;
}

.submit-btn:hover{
opacity:0.9;
}

/* ALREADY SUBMITTED */
.already-submitted{
padding:20px;
background:#fff5e6;
border-radius:12px;
}

/* BACK */
.back-home{
margin-top:20px;
font-size:14px;
color:#4B0082;
cursor:pointer;
font-weight:600;
}

/* ANIMATION */
@keyframes fadeIn{
from{opacity:0; transform:translateY(20px);}
to{opacity:1; transform:translateY(0);}
}

/* MOBILE */
@media(max-width:768px){
.feedback-card{
padding:30px 20px;
}
.feedback-logo{
height:60px;
}
}

`}</style>
    </>
  );
};

export default Feedback;
