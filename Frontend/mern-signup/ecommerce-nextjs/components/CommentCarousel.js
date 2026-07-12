"use client";
import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import axios from "axios";
import { API } from "../constants/const";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CommentCarousel = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(API.GET_COMMENTS);
        setComments(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // ✅ Optimized slider settings
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3500,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: false,
      pauseOnHover: true,
    }),
    [],
  );

  // ✅ SEO Structured Data
  useEffect(() => {
    if (comments.length > 0) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Picklebite Homemade Pickles",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue:
            comments.reduce((sum, c) => sum + c.rating, 0) / comments.length,
          reviewCount: comments.length,
        },
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => document.head.removeChild(script);
    }
  }, [comments]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#7B2CBF" }}>
        <h3>Loading customer reviews...</h3>
      </div>
    );
  }

  return (
    <>
      <section
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg,#ffffff,#f3e8ff)",
          textAlign: "center",
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#4B0082",
            marginBottom: "40px",
          }}
        >
          Customer Reviews – Picklebite Homemade Pickles
        </h2>

        <div style={{ maxWidth: "750px", margin: "auto" }}>
          <Slider {...settings}>
            {comments.map((item) => (
              <div key={item._id}>
                <article
                  style={{
                    background: "#ffffff",
                    padding: "40px",
                    borderRadius: "20px",
                    boxShadow: "0 15px 40px rgba(123,44,191,0.1)",
                    position: "relative",
                  }}
                >
                  {/* Quote */}
                  <div
                    style={{
                      fontSize: "60px",
                      color: "#7B2CBF",
                      position: "absolute",
                      top: "5px",
                      left: "20px",
                      opacity: 0.15,
                    }}
                  >
                    ❝
                  </div>

                  {/* Review */}
                  <p
                    style={{
                      fontSize: "18px",
                      fontStyle: "italic",
                      color: "#555",
                      marginBottom: "20px",
                      lineHeight: "1.6",
                    }}
                  >
                    "{item.message}"
                  </p>

                  {/* Stars */}
                  <div
                    style={{
                      marginBottom: "15px",
                      color: "#7B2CBF",
                      fontSize: "18px",
                    }}
                  >
                    {"⭐".repeat(item.rating)}
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontWeight: "700",
                      color: "#4B0082",
                    }}
                  >
                    — {item.name}
                  </h3>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default CommentCarousel;
