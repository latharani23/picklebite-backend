import React from "react";

const StorageSection = () => {
  const storageTips = [
    {
      icon: "🫙",
      title: "Use Clean Dry Spoon",
      desc: "Always use a dry spoon while taking pickle from the jar.",
    },
    {
      icon: "🌡️",
      title: "Store in Cool Place",
      desc: "Keep pickles in a cool and dry place away from direct sunlight.",
    },
    {
      icon: "❄️",
      title: "Refrigeration",
      desc: "For longer freshness you can refrigerate the pickle jar.",
    },
    {
      icon: "🔒",
      title: "Close Lid Properly",
      desc: "Always close the lid tightly after use.",
    },
    {
      icon: "🍶",
      title: "Avoid Moisture",
      desc: "Do not allow water or moisture inside the pickle jar.",
    },
  ];

  return (
    <section className="storage-section">
      <div className="container">
        <h2 className="section-title">Pickle Storage Instructions</h2>

        <div className="storage-grid">
          {storageTips.map((item, index) => (
            <div key={index} className="storage-card">
              <div className="storage-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`

.storage-section{
padding:60px 20px;
background: linear-gradient(135deg, #F3ECFF, #CDB4FF);
}

.section-title{
text-align:center;
font-size:32px;
font-weight:800;
margin-bottom:40px;
}

.storage-grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:25px;
max-width:1100px;
margin:auto;
}

.storage-card{
background:white;
border-radius:14px;
padding:25px;
text-align:center;
box-shadow:0 4px 12px rgba(0,0,0,0.1);
transition:0.3s;
}

.storage-card:hover{
transform:translateY(-6px);
}

.storage-icon{
font-size:40px;
margin-bottom:10px;
}

.storage-card h3{
font-size:18px;
margin-bottom:8px;
}

.storage-card p{
color:#666;
font-size:14px;
}

/* Responsive */

@media(max-width:768px){

.storage-grid{
grid-template-columns:repeat(2,1fr);
}

}

@media(max-width:480px){

.storage-grid{
grid-template-columns:1fr;
}

}

`}</style>
    </section>
  );
};

export default StorageSection;
