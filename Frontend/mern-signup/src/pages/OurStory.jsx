import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const OurStory = () => {
  const features = [
    {
      icon: "🫙",
      title: "No Oil",
      desc: "Our pickles are prepared without excessive oil. We focus on natural taste and healthy ingredients.",
    },
    {
      icon: "🚫",
      title: "No Preservatives",
      desc: "We never add artificial chemicals or preservatives. Everything is preserved using traditional natural techniques.",
    },
    {
      icon: "🥭",
      title: "Loaded With Vegetables",
      desc: "Every spoon contains real vegetables like mango, lemon, garlic and more – not just gravy.",
    },
    {
      icon: "🌱",
      title: "Farm Fresh Ingredients",
      desc: "We use farm fresh vegetables to maintain authentic homemade taste and better nutrition.",
    },
    {
      icon: "👵",
      title: "Traditional Recipe",
      desc: "Our pickles follow authentic homemade recipes passed through generations.",
    },
    {
      icon: "⭐",
      title: "Limited Menu – Better Quality",
      desc: "We offer only 10 varieties so we can maintain freshness and quality.",
    },
    {
      icon: "❤️",
      title: "Customer Health First",
      desc: "We care about your health. That is why we avoid unnecessary additives.",
    },
  ];

  const varieties = [
    "Mango Pickle",
    "Lemon Pickle",
    "Herelikayi Pickle",
    "Gajanimbe Pickle",
    "Garlic Pickle",
    "Green Chilli Pickle",
    "Bitter Gourd Pickle",
    "Mangalore Southekayi Pickle",
    "Mixed Vegetable Pickle with Corn",
    "Gongura Pickle",
  ];

  return (
    <>
      <Helmet>
        <title>Our Story | Picklebite</title>
      </Helmet>
      <Navbar />
      {/* HERO */}
      <section className="hero-section">
        <h1>Our Story – Picklebite</h1>
        <h4>Homemade • Fresh • Authentic Pickles</h4>

        <svg className="curve" viewBox="0 0 1440 150">
          <path
            fill="#ffffff"
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,85.3C1120,85,1280,107,1360,117.3L1440,128V160H0Z"
          />
        </svg>
      </section>
      {/* FEATURES */}
      <div className="features-container">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
      {/* VARIETIES */}
      <div className="varieties">
        <h2>🥒 Our 11 Signature Pickle Varieties</h2>

        <div className="variety-grid">
          {varieties.map((item, index) => (
            <div key={index} className="variety-card">
              🫙 {item}
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {/* STYLES */}
      <style>{`

/* HERO */

.hero{
position:relative;
background: linear-gradient(135deg, #F3ECFF, #CDB4FF);
padding:80px 20px;
text-align:center;
color:white;
}
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #F3ECFF, #CDB4FF);
  padding: 100px 20px;
  text-align: center;
  color: #4B0082; /* better for light background */
  overflow: hidden;
  min-height:250px;
}
.curve {
  position: absolute;
  bottom:-1px;
  left: 0;
  width: 100%;
  z-index: 2;
  fill="#FFFFFF"
}

.hero h1{
font-size:40px;
font-weight:800;
margin-bottom:10px;
}

.hero p{
font-size:18px;
opacity:0.9;
}

/* FEATURES */

.features-container{
max-width:900px;
margin:auto;
padding:60px 20px;
display:grid;
grid-template-columns:repeat(2,1fr);
gap:30px;
}

.feature-card{
background: linear-gradient(135deg, #FAF7FF, #E6D6FF);
border-radius:16px;
padding:30px;
text-align:center;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
transition:all 0.3s ease;
}

.feature-card:hover{
transform:translateY(-8px);
box-shadow:0 15px 35px rgba(0,0,0,0.15);
}

.icon{
font-size:50px;
margin-bottom:15px;
animation:float 3s ease-in-out infinite;
}

.feature-card h3{
font-size:20px;
margin-bottom:10px;
}

.feature-card p{
font-size:14px;
color:#555;
line-height:1.6;
}

/* VARIETIES */

.varieties{
background:#f9f9f9;
padding:70px 20px;
text-align:center;
}

.varieties h2{
font-size:32px;
margin-bottom:30px;
color:#4B0082;
}

.variety-grid{
max-width:900px;
margin:auto;
display:grid;
grid-template-columns:repeat(2,1fr);
gap:20px;
}

.variety-card{
background:white;
padding:15px;
border-radius:10px;
font-weight:600;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
transition:0.3s;
}

.variety-card:hover{
background:linear-gradient(135deg,#4B0082,#6A0DAD);
color:white;
transform:translateY(-5px);
}

/* FLOAT ANIMATION */

@keyframes float{
0%{transform:translateY(0px)}
50%{transform:translateY(-8px)}
100%{transform:translateY(0px)}
}

/* MOBILE */

@media(max-width:768px){

.features-container{
grid-template-columns:1fr;
}

.variety-grid{
grid-template-columns:1fr;
}

.hero h1{
font-size:28px;
}

}

      `}</style>
    </>
  );
};

export default OurStory;
