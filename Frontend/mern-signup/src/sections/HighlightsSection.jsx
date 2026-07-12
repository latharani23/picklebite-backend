import React from "react";

const HighlightsSection = ({
  selectedHighlight,
  setSelectedHighlight,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
    <section className="highlight-section">
      <h2 className="highlight-title">PickleBite Highlights❤ </h2>

      <div className="highlight-container">
        {[
          {
            label: "Feedback",
            images: [
              "/assets/images/reviews/review1.webp",
              "/assets/images/reviews/review2.webp",
              "/assets/images/reviews/review3.webp",
              "/assets/images/reviews/review4.webp",
              "/assets/images/reviews/review5.webp",
              "/assets/images/reviews/review6.webp",
              "/assets/images/reviews/review7.webp",
              "/assets/images/reviews/review8.webp",
              "/assets/images/reviews/review9.webp",
              "/assets/images/reviews/review10.webp",
            ],
          },
          {
            label: "Behind the Scenes",
            images: [
              "/assets/images/scene/scene1.webp",
              "/assets/images/scene/scene2.webp",
              "/assets/images/scene/scene3.webp",
              "/assets/images/scene/scene4.webp",
            ],
          },
          {
            label: "Fresh Pickles",
            images: [
              "/assets/images/Fresh Pickle/readypickle1.webp",
              "/assets/images/Fresh Pickle/readypickle2.webp",
              "/assets/images/Fresh Pickle/readypickle3.webp",
              "/assets/images/Fresh Pickle/readypickle4.webp",
              "/assets/images/Fresh Pickle/readypickle5.webp",
              "/assets/images/Fresh Pickle/readypickle6.webp",
              "/assets/images/Fresh Pickle/readypickle7.webp",
              "/assets/images/Fresh Pickle/readypickle8.webp",
            ],
          },
          {
            label: "Pickle Batch",
            images: [
              "/assets/images/batch/batch1.webp",
              "/assets/images/batch/batch2.webp",
              "/assets/images/batch/batch3.webp",
            ],
          },
        ].map((item, index) => (
          <div
            key={index}
            className="highlight-item"
            onClick={() => {
              setSelectedHighlight(item.images);
              setCurrentIndex(0);
            }}
          >
            <div className="highlight-ring">
              <div className="highlight-circle">📸</div>
            </div>

            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}

      {selectedHighlight && (
        <div
          className="review-modal"
          onClick={() => setSelectedHighlight(null)}
        >
          <div className="review-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close-btn"
              onClick={() => setSelectedHighlight(null)}
            >
              ✖
            </span>

            <img
              src={selectedHighlight[currentIndex]}
              alt="Highlight"
              className="review-image"
            />

            <div className="nav-buttons">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                ⬅
              </button>

              <button
                disabled={currentIndex === selectedHighlight.length - 1}
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                ➡
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`

.highlight-section{
padding:40px 10px;
text-align:center;
background:#ffffff;
}

.highlight-title{
font-weight:700;
margin-bottom:20px;
font-size:26px;
color:#4B0082;
}

.highlight-container{
display:flex;
justify-content:center;
gap:35px;
flex-wrap:wrap;
}

.highlight-item{
text-align:center;
cursor:pointer;
transition:0.3s ease;
}

.highlight-item:hover{
transform:translateY(-6px);
}

.highlight-ring{
padding:5px;
border-radius:50%;
background:linear-gradient(45deg,#4B0082,#8A2BE2);display:inline-block;
}

.highlight-circle{
width:85px;
height:85px;
border-radius:50%;
background:#ffffff;
display:flex;
align-items:center;
justify-content:center;
font-size:28px;
}

/* MODAL */

.review-modal{
position:fixed;
inset:0;
background:rgba(0,0,0,0.85);
display:flex;
align-items:center;
justify-content:center;
z-index:9999;
animation:fadeIn 0.3s ease;
}

.review-content{
width:95%;
max-width:450px;
background:white;
padding:20px;
border-radius:20px;
position:relative;
animation:scaleUp 0.3s ease;
}

.review-image{
width:100%;
max-height:500px;
object-fit:contain;
border-radius:15px;
}

.close-btn{
position:absolute;
top:12px;
right:15px;
font-size:20px;
cursor:pointer;
}

.nav-buttons{
display:flex;
justify-content:space-between;
margin-top:15px;
}

.nav-buttons button{
padding:6px 14px;
border:none;
border-radius:8px;
cursor:pointer;
background:#ff6b6b;
color:white;
}

.nav-buttons button:disabled{
background:#ccc;
cursor:not-allowed;
}

@keyframes fadeIn{
from{opacity:0;}
to{opacity:1;}
}

@keyframes scaleUp{
from{transform:scale(0.85);}
to{transform:scale(1);}
}

/* RESPONSIVE */

@media(max-width:768px){

.highlight-circle{
width:70px;
height:70px;
font-size:24px;
}

}

`}</style>
    </section>
  );
};

export default HighlightsSection;
