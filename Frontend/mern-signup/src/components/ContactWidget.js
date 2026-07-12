import React, { useState } from "react";

const ContactWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "25px",
          cursor: "pointer",
          zIndex: "1000",
        }}
      >
        💬 Contact Us
      </button>

      {/* Chat Box */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            overflow: "hidden",
            zIndex: "1000",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#f7c5d3",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Picklebite</strong>

            <span
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              ✕
            </span>
          </div>

          {/* Message */}
          <div style={{ padding: "15px", background: "#fde7ee" }}>
            <p style={{ fontSize: "14px" }}>
              Leave us a message and we'll reply as soon as we can.
            </p>
          </div>

          {/* Input */}
          <div style={{ padding: "10px" }}>
            <input
              type="text"
              placeholder="Write your message..."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactWidget;
