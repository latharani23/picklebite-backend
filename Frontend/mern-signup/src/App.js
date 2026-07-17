import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";
import About from "./components/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Faq from "./components/Faq";
import MyOrders from "./pages/MyOrders";
import Feedback from "./pages/Feedback";
import ForgotPassword from "./components/ForgotPassword";
import Pickles from "./pages/Pickles";
import Contact from "./pages/Contact";
import OurStory from "./pages/OurStory";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Checkout from "./pages/Checkout";
import StorageInstructions from "./pages/StorageInstructions";
import Benefits from "./pages/Benefits";
import AdminAnalytics from "./pages/AdminAnalytics";
import Collections from "./pages/Collections";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProductDetails from "./pages/ProductDetails";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPage } from "./utils/analytics";
import ExpensesPage from "./pages/ExpensesPage";
import DeliveryUpdates from "./pages/DeliveryUpdates";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import SampleBox from "./pages/SampleBox";
import ProductExperienceSection from "./sections/ProductExperienceSection";
import Promotions from "./pages/Promotions";
import WhatsappOrders from "./pages/WhatsappOrders";

const App = () => {
  const location = useLocation();

  // initialize GA once
  useEffect(() => {
    initGA();
  }, []);

  // track page on route change
  useEffect(() => {
    trackPage(location.pathname);
  }, [location]);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pickles" element={<Pickles />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Collections" element={<Collections />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/storage-instructions" element={<StorageInstructions />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/whatsapp-orders" element={<WhatsappOrders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/sample-box" element={<SampleBox />} />
        <Route
          path="/product-experience"
          element={<ProductExperienceSection />}
        />
        <Route path="/delivery-updates" element={<DeliveryUpdates />} />
      </Routes>

      <Chatbot />
    </div>
  );
};
export default App;
