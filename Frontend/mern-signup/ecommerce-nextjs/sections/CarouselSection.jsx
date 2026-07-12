import React from "react";
import { Helmet } from "react-helmet-async";

const CarouselSection = () => {
  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Picklebite | Authentic Homemade Pickles</title>

        <meta
          name="description"
          content="Buy authentic homemade pickles online from Picklebite. Fresh mango, lemon, garlic and traditional Indian pickles made without preservatives."
        />

        <meta
          name="keywords"
          content="homemade pickles, mango pickle, garlic pickle, lemon pickle, traditional Indian pickles, picklebite"
        />

        <meta property="og:title" content="Picklebite Homemade Pickles" />
        <meta
          property="og:description"
          content="Authentic homemade pickles crafted using traditional recipes."
        />
      </Helmet>

      {/* ================= CAROUSEL ================= */}

      <section
        className="carousel-section"
        aria-label="Picklebite Featured Pickles"
      >
        <div
          id="homeCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3500"
          aria-label="Pickle images carousel"
        >
          {/* Indicators */}

          <div className="carousel-indicators">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>

          {/* ================= SLIDES ================= */}

          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="carousel-image-wrapper">
                <img
                  src="/assets/images/carousel.webp"
                  alt=""
                  className="carousel-img"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>

            <div className="carousel-item">
              <div className="carousel-image-wrapper">
                <img
                  src="/assets/images/carousel1.webp"
                  alt="Authentic homemade mango pickle jar"
                  className="carousel-img"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="carousel-image-wrapper">
                <img
                  src="/assets/images/carousel2.webp"
                  alt="Spicy traditional Indian pickle"
                  className="carousel-img"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Slide 5 */}
            <div className="carousel-item">
              <div className="carousel-image-wrapper">
                <img
                  src="/assets/images/carousel3.webp"
                  alt="Traditional pickle preparation"
                  className="carousel-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ================= CONTROLS ================= */}

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* ================= CSS ================= */}

        <style>{`

.carousel-section{
width:100%;
padding:20px;
overflow:hidden;
position:relative;
}

.carousel-image-wrapper{
width:100%;
height:clamp(380px,70vh,750px);
overflow:hidden;
border-radius:16px;
}

.carousel-img{
width:100%;
height:100%;
object-fit: contain;
object-position:center;
transition:transform 6s ease;
}

.carousel-item.active .carousel-img{
transform:scale(1.08);
}


.carousel-control-prev-icon,
.carousel-control-next-icon{
background-size:70%;
}

@media (max-width:768px){

.carousel-image-wrapper{
height:360px;
}



}

@media (max-width:480px){

.carousel-image-wrapper{
height:260px;
}


}

`}</style>
      </section>
    </>
  );
};

export default CarouselSection;
