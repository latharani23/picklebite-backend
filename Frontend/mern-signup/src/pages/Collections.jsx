import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import CommentCarousel from "../components/CommentCarousel";

const Collections = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const videos = [
    {
      src: "/assets/images/collection/pickle1.mp4",
      title: "Mango Pickle Preparation",
    },
    {
      src: "/assets/images/collection/pickle2.mp4",
      title: "Herelikayi Pickle Making",
    },
    {
      src: "/assets/images/collection/pickle3.mp4",
      title: "Mango Achar Process",
    },
    {
      src: "/assets/images/collection/pickle4.mp4",
      title: "Mango Pickle ",
    },
    {
      src: "/assets/images/collection/pickle5.mp4",
      title: "Herelikayi Pickle",
    },
    {
      src: "/assets/images/collection/pickle6.mp4",
      title: "Packaging & Shipping",
    },
  ];
  const jarImages = [
    { src: "/assets/images/collection/jar1.webp", name: "Front View" },
    { src: "/assets/images/collection/jar2.webp", name: "Multiple Jars" },
    { src: "/assets/images/collection/jar3.webp", name: "Top View" },
    { src: "/assets/images/collection/jar4.webp", name: "Packaging Style" },
    { src: "/assets/images/collection/jar5.webp", name: "Ready to Deliver" },
    { src: "/assets/images/collection/jar6.webp", name: "Front View" },
    { src: "/assets/images/collection/jar7.webp", name: "Multiple Jars" },
    { src: "/assets/images/collection/jar8.webp", name: "Top View" },
    { src: "/assets/images/collection/jar9.webp", name: "Packaging Style" },
    { src: "/assets/images/collection/jar10.webp", name: "Ready to Deliver" },
    { src: "/assets/images/collection/jar11.webp", name: "Ready to Deliver" },
  ];
  const pickleImages = [
    {
      src: "/assets/images/collection/pickle3.webp",
      alt: "Mango Pickle",
      name: "Mango Pickle",
    },
    {
      src: "/assets/images/collection/pickle4.webp",
      alt: "Lemon Pickle",
      name: "Lemon Pickle",
    },

    {
      src: "/assets/images/collection/pickle7.webp",
      alt: "Garlic Pickle",
      name: "Garlic Pickle",
    },
    {
      src: "/assets/images/collection/pickle11.webp",
      alt: "Bitter Gourd Pickle",
      name: "Bitter Gourd Pickle",
    },

    {
      src: "/assets/images/collection/pickle14.webp",
      alt: "Gajanimbe Pickle",
      name: "Gajanimbe Pickle",
    },

    {
      src: "/assets/images/collection/pickle16.webp",
      alt: "Mangalore Cucumber Pickle",
      name: "Mangalore Cucumber Pickle",
    },
    {
      src: "/assets/images/collection/pickle22.webp",
      alt: "Mix veg with Corn Pickle",
      name: "Mix veg with Corn Pickle",
    },
    {
      src: "/assets/images/collection/pickle23.webp",
      alt: "Herelikayi Pickle",
      name: "Herelikayi Pickle",
    },
    {
      src: "/assets/images/collection/pickle25.webp",
      alt: "Bittergourd Pickle",
      name: "Bittergourd Pickle",
    },
  ];
  const powderImages = [
    {
      src: "/assets/images/powdersgallery/groundnut2.webp",
      alt: "Ground nut Chutney Powder",
      name: "Ground nut Chutney Powder",
    },
    {
      src: "/assets/images/powdersgallery/huchhellu1.webp",
      alt: "Huchhellu Powder",
      name: "Huchhellu Powder",
    },

    {
      src: "/assets/images/powdersgallery/mixed-seeds1.webp",
      alt: "Mixed Seeds Powder",
      name: "Mixed Seeds Powder",
    },

    {
      src: "/assets/images/powdersgallery/majjigemenasinakayi1.webp",
      alt: "Sambar Powder",
      name: "Sambar Powder",
    },
    {
      src: "/assets/images/powdersgallery/majjigemenasinakayi2.webp",
      alt: "Rasam Powder",
      name: "Rasam Powder",
    },
    {
      src: "/assets/images/powdersgallery/majjigemenasinakayi3.webp",
      alt: "Majjige Menasinakayi",
      name: "Majjige Menasinakayi",
    },
    {
      src: "/assets/images/powdersgallery/huchhellu2.webp",
      alt: "Huchchellu Powder",
      name: "Huchchellu Powder",
    },
    {
      src: "/assets/images/powdersgallery/mixed-seeds2.webp",
      alt: "Red Chilly Powder",
      name: "Red Chilly Powder",
    },
  ];
  const features = [
    {
      icon: "🌿",
      title: "100% Natural",
      desc: "No preservatives or artificial colors",
    },
    {
      icon: "👩‍🍳",
      title: "Homemade",
      desc: "Made with love using family recipes",
    },
    {
      icon: "🌶️",
      title: "Fresh Spices",
      desc: "Hand-ground authentic Indian spices",
    },
    {
      icon: "📦",
      title: "Secure Packaging",
      desc: "Freshness guaranteed on delivery",
    },
  ];

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="collections-page">
      <Helmet>
        <title>Pickle Collections | Homemade Indian Pickles</title>
        <meta
          name="description"
          content="Explore our homemade pickle collections including mango, gongura and traditional Indian achar made with authentic recipes."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🏆 Award Winning Recipes</span>
          <h1>Homemade Pickle Collections</h1>
          <p>
            Discover authentic Indian pickles crafted with traditional recipes
            passed down through generations. Made with fresh ingredients and
            love.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/pickles")}
            >
              🛒 Shop Now
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                document
                  .querySelector(".videos")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              🎥 Watch Process
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">11+</span>
            <span className="stat-label">Varieties</span>
          </div>
          <div className="stat">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Natural</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* VIDEO SECTION */}
      <section className="videos">
        <div className="section-header">
          <h2>🎥 How We Prepare Our Pickles</h2>
          <p>Watch our traditional pickle-making process</p>
        </div>
        <div className="video-grid">
          {videos.map((video, index) => (
            <div className="video-card" key={index}>
              <div className="video-box">
                <video controls preload="auto">
                  <source
                    src={process.env.PUBLIC_URL + video.src}
                    type="video/mp4"
                  />
                </video>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </div>
              <h4>{video.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 ADD HERE */}
      <section className="jar-gallery">
        <div className="section-header">
          <h2>🫙 Our Glass Jar </h2>
          <p>Premium quality jars for freshness & hygiene</p>
        </div>

        <div className="jar-grid">
          {jarImages.map((img, index) => (
            <div className="jar-card" key={index}>
              <img src={process.env.PUBLIC_URL + img.src} alt={img.name} />

              <div className="jar-overlay">
                🫙 Glass Jar
                <span>{img.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery">
        <section className="usage-section">
          <div className="section-header">
            <h2>🍽️ How To Enjoy Our Products</h2>
            <p>Traditional serving suggestions</p>
          </div>

          <div className="usage-grid">
            <div className="usage-card">
              <video controls>
                <source
                  src="/assets/images/collection/products.mp4"
                  type="video/mp4"
                />
              </video>

              <h3>Out For Delivery</h3>

              <p>orders Goes Out For Delivery</p>
            </div>

            <div className="usage-card">
              <video controls>
                <source
                  src="/assets/images/collection/huchhellu.mp4"
                  type="video/mp4"
                />
              </video>

              <h3>🌰 Huchchellu Powder</h3>

              <p>
                Best served with Roti, Chapati and Hot Rice mixed with Ghee.
              </p>
            </div>

            <div className="usage-card">
              <video controls>
                <source
                  src="/assets/images/collection/majjigemenasinakayi.mp4"
                  type="video/mp4"
                />
              </video>

              <h3>🌶️ Majjige Menasinakayi</h3>

              <p>
                Perfect combination with Curd Rice, Dal Rice and Traditional
                South Indian Meals.
              </p>
            </div>
          </div>
          <br />
          <div className="usage-grid">
            <div className="usage-card">
              <video controls>
                <source
                  src="/assets/images/collection/mixed-seeds.mp4"
                  type="video/mp4"
                />
              </video>

              <h3>Mixed Seeds Powder</h3>

              <p>Receipe for Mixed Seeds Powder</p>
            </div>

            <div className="usage-card">
              <video controls>
                <source
                  src="/assets/images/collection/customer1.mp4"
                  type="video/mp4"
                />
              </video>

              <h3>Customer review</h3>

              <p>Best served with Roti, Chapati and Hot Rice.</p>
            </div>

            <div className="usage-card">
              <video controls>
                <source
                  src="/assets/images/collection/customer2.mp4"
                  type="video/mp4"
                />
              </video>

              <h3>Customer Review</h3>

              <p>
                Perfect combination with Curd Rice, Dal Rice and Traditional
                South Indian Meals.
              </p>
            </div>
          </div>
        </section>
        <section className="gallery">
          <div className="section-header">
            <h2>🌿 Homemade Powders & Essentials</h2>
            <p>Freshly prepared traditional powders</p>
          </div>

          <div className="gallery-grid">
            {powderImages.map((image, index) => (
              <div
                className="gallery-item"
                key={index}
                onClick={() => openLightbox(image)}
              >
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">
                  <span>{image.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="section-header">
          <h2>🖼️ Our Pickle Varieties</h2>
          <p>Click on any image to view details</p>
        </div>
        <div className="gallery-grid">
          {pickleImages.map((image, index) => (
            <div
              className="gallery-item"
              key={index}
              onClick={() => openLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(image)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span>{image.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-info">
              <h3>{selectedImage.name}</h3>
              <button
                className="btn-primary"
                onClick={() => navigate("/pickles")}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIAL */}
      <CommentCarousel />

      {/* CTA SECTION */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to taste something delicious?</h2>
          <button
            className="btn-primary btn-large"
            onClick={() => navigate("/pickles")}
          >
            Explore Products
          </button>
        </div>
      </section>

      <style>{`
        .collections-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #F8F4FF 0%, #E8DEFF 50%, #D4C4FF 100%);
        }

        /* HERO */
        .hero {
          padding: 60px 20px;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          margin-bottom: 40px;
        }

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #4B0082;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero h1 {
          font-size: 48px;
          color: #4B0082;
          margin-bottom: 20px;
          font-weight: 700;
          line-height: 1.2;
        }

        .hero p {
          color: #666;
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.6;
        }
.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(320px,1fr));
  gap: 25px;
}

.usage-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,.08);
}

.usage-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.usage-card video {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.usage-card h3 {
  padding: 15px 15px 5px;
  color: #6a0dad;
}

.usage-card p {
  padding: 0 15px 20px;
}
        .hero-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6a0dad, #8B5CF6);
          color: white;
          padding: 14px 28px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(106, 13, 173, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(106, 13, 173, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #6a0dad;
          padding: 14px 28px;
          border: 2px solid #6a0dad;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #F3ECFF;
        }

        .btn-large {
          padding: 18px 40px;
          font-size: 18px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid rgba(106, 13, 173, 0.1);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: #6a0dad;
        }

        .stat-label {
          color: #888;
          font-size: 14px;
        }

        /* FEATURES */
        .features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 20px;
        }

        .feature-card {
          background: white;
          padding: 30px 20px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 15px;
        }

        .feature-card h3 {
          color: #4B0082;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .feature-card p {
          color: #888;
          font-size: 14px;
          margin: 0;
        }

        /* SECTION HEADERS */
        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-header h2 {
          font-size: 32px;
          color: #4B0082;
          margin-bottom: 10px;
        }

        .section-header p {
          color: #888;
          font-size: 16px;
        }

        /* VIDEOS */
        .videos {
          max-width: 1300px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .video-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-5px);
        }

        .video-box {
          height: 320px;
          overflow: hidden;
        }

        .video-box video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-card h4 {
          padding: 15px;
          margin: 0;
          color: #4B0082;
          font-size: 16px;
          text-align: center;
        }
/* 🔥 JAR GALLERY */

/* GRID */
.jar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* CARD */
.jar-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

/* IMAGE */
.jar-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.jar-gallery {
  max-width: 1300px;
  margin: 0 auto;
  padding: 60px 20px;
}

.jar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.jar-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.jar-card img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s;
}

.jar-card:hover img {
  transform: scale(1.1);
}

.jar-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;

  padding: 10px;
  font-weight: bold;
}

.jar-overlay span {
  display: block;
  font-size: 12px;
  color: #FFD700;
}
        /* GALLERY */
        .gallery {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.03);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(75, 0, 130, 0.9));
          padding: 40px 15px 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay span {
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        /* LIGHTBOX */
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          max-width: 500px;
          width: 100%;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .lightbox-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          z-index: 1;
          transition: background 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .lightbox-content img {
          width: 100%;
          height: 350px;
          object-fit: cover;
        }

        .lightbox-info {
          padding: 25px;
          text-align: center;
        }

        .lightbox-info h3 {
          color: #4B0082;
          margin-bottom: 15px;
          font-size: 24px;
        }

        /* TESTIMONIAL */
        .testimonial {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .testimonial-content {
          background: white;
          padding: 50px 40px;
          border-radius: 20px;
          text-align: center;
          position: relative;
          box-shadow: 0 10px 40px rgba(106, 13, 173, 0.1);
        }

        .quote-icon {
          font-size: 80px;
          color: #E8DEFF;
          position: absolute;
          top: 10px;
          left: 30px;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .testimonial-content p {
          font-size: 20px;
          color: #555;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 20px;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .author-name {
          color: #4B0082;
          font-weight: 600;
          font-size: 18px;
        }

        .author-location {
          color: #888;
          font-size: 14px;
        }

        /* CTA */
        .cta {
          padding: 80px 20px;
          background: linear-gradient(135deg, #6a0dad, #8B5CF6);
          margin-top: 40px;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .cta h2 {
          color: white;
          font-size: 36px;
          margin-bottom: 15px;
        }

        .cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          margin-bottom: 30px;
        }

        .cta .btn-primary {
          background: white;
          color: #6a0dad;
        }

        .cta .btn-primary:hover {
          background: #F3ECFF;
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .hero h1 {
            font-size: 36px;
          }

          .hero-stats {
            gap: 40px;
          }

          .features {
            grid-template-columns: repeat(2, 1fr);
          }

          .video-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .hero {
            padding: 40px 20px;
          }

          .hero h1 {
            font-size: 28px;
          }
a
          .hero p {
            font-size: 16px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }

          .stat-number {
            font-size: 28px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .video-grid {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .section-header h2 {
            font-size: 24px;
          }

          .testimonial-content {
            padding: 40px 25px;
          }

          .testimonial-content p {
            font-size: 16px;
          }

          .cta h2 {
            font-size: 26px;
          }

          .cta p {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Collections;
