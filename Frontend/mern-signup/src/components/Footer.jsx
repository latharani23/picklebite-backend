import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-section">
          <h4>Picklebite</h4>
          <p>
            Authentic homemade pickles made with traditional recipes and premium
            ingredients.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li onClick={() => navigate("/home")}>Home</li>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/wishlist")}>Wishlist</li>
            <li onClick={() => navigate("/cart")}>Cart</li>
            <li onClick={() => navigate("/faq")}>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Contact Us</h5>

          <p>📧 support@picklebite.in</p>
          <p>
            <a href="tel:7975390038" className="contact-link">
              <i className="bi bi-telephone-fill"></i> +91 7975390038
            </a>
          </p>
          <p>
            <a
              href="https://wa.me/917975390038?text=Hi Picklebite, I want to order pickle"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link whatsapp"
            >
              <i className="bi bi-whatsapp"></i> Chat on WhatsApp
            </a>
          </p>
          <div className="social-icons mt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/pickle_bite_?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="bi bi-instagram"></i> Instagram
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/185SaZ5vLu/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="bi bi-facebook"></i> Facebook
            </a>
          </div>
          <br></br>
          <p>📍 Bengaluru, India</p>
        </div>
        {/* PAYMENT */}
        <div className="footer-section">
          <h5>We Accept</h5>
          <p>PhonePe | Google Pay | UPI</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Picklebite. All Rights Reserved ||
          Website Designed & Developed by <strong>Latharani</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
