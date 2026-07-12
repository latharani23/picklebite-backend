"use client";

import React from "react";
import Footer from "./Footer";

const Faq = () => {
  const faqs = [
    {
      question: "Can I get my order within 2 or 3 days?",
      answer:
        "Yes, we typically process and deliver orders within 2–3 working days depending on your location.",
    },
    {
      question: "How long does pickle last after opening?",
      answer:
        "Our pickles can last several months if stored properly in a clean, airtight container and refrigerated after opening.",
    },
    {
      question: "How can we prevent pickle from spoiling?",
      answer:
        "Always use a dry spoon, store in an airtight container, and keep refrigerated after opening.",
    },
    {
      question:
        "What is the difference between instant pickle and traditional pickle?",
      answer:
        "Instant pickles are prepared quickly and consumed within a short period, while traditional pickles are naturally cured and fermented over time for deeper flavor.",
    },
    {
      question: "How can customers place bulk orders?",
      answer:
        "Customers can contact us directly through Instagram, WhatsApp, or our Contact page for bulk and customized orders.",
    },
    {
      question: "Do you offer custom spice levels?",
      answer:
        "Yes! We offer customizable spice levels based on customer preference, especially for bulk and special orders.",
    },
  ];

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh" }}>
      {/* HERO */}
      <section
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg,#ff9f43,#ff6b6b)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: "700" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ marginTop: "15px", fontSize: "18px" }}>
          Everything you need to know about Picklebite
        </p>
      </section>

      {/* FAQ CONTENT */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "auto" }}>
          {faqs.map((faq, index) => (
            <details
              key={index}
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                cursor: "pointer",
              }}
            >
              <summary
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                }}
              >
                {faq.question}
              </summary>

              <p
                style={{
                  marginTop: "15px",
                  color: "#555",
                  lineHeight: "1.8",
                }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faq;
