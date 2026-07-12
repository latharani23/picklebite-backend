import React from "react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🚚",
      title: "Quick Delivery",
      desc: "Fresh homemade pickles delivered quickly to your doorstep.",
    },
    {
      icon: "🥭",
      title: "Authentic Taste",
      desc: "Traditional recipes prepared with love and care.",
    },
    {
      icon: "🫙",
      title: "Wide Variety",
      desc: "Choose from 10 delicious varieties of homemade pickles.",
    },
    {
      icon: "⭐",
      title: "Trusted Quality",
      desc: "Prepared in hygienic conditions with premium ingredients.",
    },
    {
      icon: "❤️",
      title: "Homemade",
      desc: "No oil • No preservatives • Just pure homemade goodness.",
    },
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <h2 className="section-title">Benefits of Our Homemade Pickles</h2>

        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`

.benefits-section{
padding:60px 20px;
 background: "linear-gradient(135deg, #FAF7FF, #E6D6FF)";
}

.section-title{
text-align:center;
font-size:32px;
font-weight:800;
margin-bottom:40px;
}

.benefits-grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:25px;
max-width:1100px;
margin:auto;
}

.benefit-card{
background:white;
border-radius:14px;
padding:25px;
text-align:center;
box-shadow:0 4px 12px rgba(0,0,0,0.1);
transition:0.3s;
}

.benefit-card:hover{
transform:translateY(-6px);
}

.benefit-icon{
font-size:40px;
margin-bottom:10px;
}

.benefit-card h3{
font-size:18px;
margin-bottom:8px;
}

.benefit-card p{
color:#666;
font-size:14px;
}

/* Responsive */

@media(max-width:768px){

.benefits-grid{
grid-template-columns:repeat(2,1fr);
}

}

@media(max-width:480px){

.benefits-grid{
grid-template-columns:1fr;
}

}

`}</style>
    </section>
  );
};

export default BenefitsSection;
