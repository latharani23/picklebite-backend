import React from "react";

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Picklebite</h1>

      <p>Homemade • Authentic • Crafted with Love</p>

      <div className="veggies">
        <span>🥭</span>
        <span>🥒</span>
        <span>🍋</span>
        <span>🧄</span>
        <span>🌶️</span>
      </div>

      <style>{`

.hero{
text-align:center;
padding:80px 20px;
}

.hero h1{
font-size:clamp(32px,6vw,60px);
font-weight:800;
background:linear-#4B0082;
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.hero p{
font-size:18px;
color:#666;
}

.veggies{
display:flex;
justify-content:center;
gap:12px;
font-size:clamp(30px,5vw,50px);
margin-top:15px;
}

`}</style>
    </section>
  );
};

export default HeroSection;
