"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Latharani",
      role: "Founder & Chief Pickle Maker",
    },
    {
      id: 2,
      name: "Shwetha M K",
      role: "Head of Production & Quality Control",
    },
    {
      id: 3,
      name: "Geetha M K",
      role: "Head of Operations & Supply Chain",
    },
    {
      id: 4,
      name: "Renoji Rao C",
      role: "Marketing, Customer Relations & Finance",
    },
  ];

  return (
    <>
      {/* SEO */}

      <Helmet>
        <title>About Picklebite | Homemade Pickles</title>

        <meta
          name="description"
          content="Learn about Picklebite – authentic homemade pickles crafted with traditional recipes and natural ingredients."
        />

        <meta
          name="keywords"
          content="picklebite, homemade pickles, mango pickle, traditional pickles"
        />
      </Helmet>

      <Navbar />

      <div className="about-page">
        {/* HERO */}

        <section className="about-hero">
          <div className="hero-container">
            {/* LOGO */}

            <div className="hero-logo">
              <img src="/assets/images/logo2.webp" alt="Picklebite Logo" />
            </div>

            {/* TITLE */}

            <div className="hero-text">
              <h1>About Picklebite</h1>

              <p>Homemade • Authentic • Crafted with Love</p>
            </div>

            {/* INSTAGRAM QR */}

            <div className="hero-qr">
              <h3>Follow us on Instagram</h3>

              <div className="qr-box">
                <img
                  src="/assets/images/instaQrCode.webp"
                  alt="Instagram QR Code"
                />
              </div>

              <p className="scan-text">SCAN & JOIN US</p>
            </div>
          </div>
        </section>

        {/* STORY */}

        <section className="story-section">
          <div className="story-container">
            <h2>Our Story</h2>

            <p>
              Picklebite was founded with a simple mission — to bring back the
              authentic taste of traditional homemade pickles. Every jar is
              personally prepared under the supervision of our Founder & Chief
              Pickle Maker, ensuring the same warmth and care found in a
              grandmother’s kitchen.
            </p>

            <p>
              We carefully select fresh vegetables like mango, lemon, green
              chilli, bitter gourd, amla, garlic, and more, preparing them using
              time-tested regional recipes. Our pickles are free from artificial
              preservatives, synthetic colors, and harmful additives.
            </p>

            <div className="highlight">
              No Oil • No Preservatives • Just Pure Homemade Goodness
            </div>
          </div>
        </section>

        {/* MISSION VISION */}

        <section className="mission-section">
          <h2>Our Mission & Vision</h2>

          <div className="mission-grid">
            <div className="mission-card">
              <div className="icon">🎯</div>

              <h3>Our Mission</h3>

              <p>
                To deliver healthy, flavorful, and authentic homemade pickles to
                every household while preserving India’s culinary heritage.
              </p>
            </div>

            <div className="mission-card">
              <div className="icon">🌟</div>

              <h3>Our Vision</h3>

              <p>
                To become one of India’s most trusted homemade pickle brands
                bringing traditional flavors to modern homes across the country.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM */}

        <section className="team-section">
          <h2>Meet Our Team</h2>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="avatar">{member.name.charAt(0)}</div>

                <h4>{member.name}</h4>

                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />

      {/* STYLES */}

      <style>{`

.about-page{
background:#f9f9f9;
}

/* HERO */

.about-hero{
padding:90px 20px;
 background: linear-gradient(135deg, #F3ECFF, #CDB4FF);
color:white;
}

.hero-container{
max-width:1200px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between;
flex-wrap:wrap;
gap:40px;
}

.hero-logo img{
width:200px;
border-radius:20px;
box-shadow:0 10px 25px rgba(0,0,0,0.3);
}

.hero-text{
text-align:center;
flex:1.5;
}

.hero-text h1{
font-size:42px;
font-weight:700;
}

.hero-text p{
font-size:20px;
opacity:0.95;
margin-top:10px;
}

.hero-qr{
text-align:center;
}

.qr-box{
background:white;
padding:15px;
border-radius:20px;
display:inline-block;
}

.qr-box img{
width:180px;
border-radius:10px;
}

.scan-text{
margin-top:10px;
font-weight:600;
}

/* STORY */

.story-section{
padding:80px 20px;
text-align:center;
}

.story-container{
max-width:900px;
margin:auto;
}

.story-section h2{
font-weight:800;
font-size:32px;
margin-bottom:20px;
background:linear-#4B0082;
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.story-section p{
color:#555;
line-height:1.8;
font-size:17px;
margin-top:15px;
}

.highlight{
margin-top:20px;
font-weight:600;
color:#4B0082;
}

/* MISSION */

.mission-section{
padding:80px 20px;
text-align:center;
background:#f8f9fb;
}

.mission-section h2{
font-weight:800;
margin-bottom:40px;
}

.mission-grid{
display:flex;
flex-wrap:wrap;
gap:30px;
justify-content:center;
}

.mission-card{
flex:1 1 420px;
background:white;
padding:35px;
border-radius:20px;
box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

.icon{
font-size:40px;
margin-bottom:10px;
}

/* TEAM */

.team-section{
padding:80px 20px;
}

.team-section h2{
text-align:center;
font-weight:800;
margin-bottom:50px;
}

.team-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:40px;
max-width:1200px;
margin:auto;
}

.team-card{
background:white;
padding:30px;
border-radius:20px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.08);
transition:0.3s;
}

.team-card:hover{
transform:translateY(-8px);
}

.avatar{
width:90px;
height:90px;
margin:auto;
border-radius:50%;
background: linear-gradient(135deg, #6A0DAD, #4B0082);
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:32px;
font-weight:bold;
margin-bottom:15px;
}

/* MOBILE */

@media(max-width:768px){

.hero-text h1{
font-size:32px;
}

.hero-logo img{
width:150px;
}

.qr-box img{
width:150px;
}

}

`}</style>
    </>
  );
};

export default About;
