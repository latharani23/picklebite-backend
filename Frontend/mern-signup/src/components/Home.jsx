import "bootstrap-icons/font/bootstrap-icons.css";
import { PICKLES } from "../constants/pickleConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/const";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { API } from "../constants/const";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import "./Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import ProductExperienceSection from "../sections/ProductExperienceSection";
import TrustSection from "../sections/TrustSection";
import PowdersSection from "../sections/PowdersSection";

const CarouselSection = React.lazy(() => import("../sections/CarouselSection"));
const HighlightsSection = React.lazy(
  () => import("../sections/HighlightsSection"),
);
const PicklesSection = React.lazy(() => import("../sections/PicklesSection"));
const CommentCarousel = React.lazy(() => import("./CommentCarousel"));

const Home = () => {
  const navigate = useNavigate();

  const [selectedWeights, setSelectedWeights] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const profileRef = useRef(null);
  const productsRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [weightFilter, setWeightFilter] = useState("");
  const [showNewOnly, setShowNewOnly] = useState(false);

  useEffect(() => {
    const cartTotal = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

    setCartCount(cartTotal);
    setNotificationCount(cartTotal + wishlistCount);
  }, [cart, wishlistCount]);
  /* ================= LOAD COUNTS ================= */
  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const cartTotal = cart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0,
      );

      setCartCount(cartTotal);
      setWishlistCount(wishlist.length);
      setNotificationCount(cartTotal + wishlist.length);
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);

    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const search = params.get("search");

    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  /* ================= SOCKET REAL-TIME ================= */
  useEffect(() => {
    if (!user) return;

    const socket = io(BASE_URL);

    socket.on("newProduct", (data) => {
      toast.info(data.message);
    });

    return () => socket.disconnect();
  }, [user]);
  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/login");
  };

  /* ================= ADD TO CART ================= */
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedWeight === product.selectedWeight,
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart); // ✅ IMPORTANT
    toast.success("Added to Cart");
  };

  const updateQuantity = (id, weight, change) => {
    let updatedCart = [...cart];

    const index = updatedCart.findIndex(
      (item) => item.id === id && item.selectedWeight === weight,
    );

    if (index !== -1) {
      updatedCart[index].quantity += change;

      if (updatedCart[index].quantity <= 0) {
        const removedItem = updatedCart[index];

        updatedCart.splice(index, 1);

        toast.info(`${removedItem.name} removed from cart 🗑️`);
      }
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Download Invoice
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(API.GET_ORDERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch orders");
        return;
      }

      setOrders(data);
      navigate("/orders");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Something went wrong");
    }
  };

  /* ================= ADD TO WISHLIST ================= */
  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) =>
        item.id === product.id &&
        item.selectedWeight === product.selectedWeight,
    );

    if (exists) {
      toast.info("Already in wishlist ❤️");
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    setWishlistCount(wishlist.length);
    setNotificationCount(cartCount + wishlist.length);

    toast.success(`${product.name} added to wishlist ❤️`);
  };

  // STEP 1: Search + Category
  let filteredPickles = PICKLES.filter((product) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // STEP 2: Weight Filter
  if (weightFilter) {
    filteredPickles = filteredPickles.filter((product) =>
      Object.keys(product.prices).includes(weightFilter),
    );
  }

  // STEP 3: Sort
  if (sortOption === "az") {
    filteredPickles.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOption === "lowHigh") {
    filteredPickles.sort((a, b) => {
      const aPrice = Math.min(...Object.values(a.prices));
      const bPrice = Math.min(...Object.values(b.prices));
      return aPrice - bPrice;
    });
  }

  if (sortOption === "recent") {
    filteredPickles.reverse();
  }

  let filteredPickle = [...PICKLES];

  // Weight filter

  // Newly added (assume last 3 products are new)
  if (showNewOnly) {
    filteredPickle = filteredPickle.slice(-3);
  }

  // Sorting
  if (sortOption === "az") {
    filteredPickle.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOption === "lowHigh") {
    filteredPickle.sort((a, b) => {
      const aPrice = Math.min(...Object.values(a.prices));
      const bPrice = Math.min(...Object.values(b.prices));
      return aPrice - bPrice;
    });
  }

  if (sortOption === "recent") {
    filteredPickle.reverse();
  }
  useEffect(() => {
    if (selectedHighlight) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedHighlight]);

  useEffect(() => {
    const delayScroll = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        productsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);

    return () => clearTimeout(delayScroll);
  }, [searchTerm]);

  const getCartItem = (productId, weight) => {
    return cart.find(
      (item) => item.id === productId && item.selectedWeight === weight,
    );
  };
  const categories = ["All", ...new Set(PICKLES.map((item) => item.category))];
  return (
    <div className="home-container">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent"></div>
      <Navbar />

      {/* ================= BRAND CENTER ================= */}
      <div className="brand-container">
        <h1 className="brand-title">Picklebite</h1>
        <p className="brand-sub">Homemade • Authentic • Crafted with Love</p>
        <div className="veggie-container">
          <span className="big">🥭</span>
          <span>🥒</span>
          <span>🍋</span>
          <span>🧄</span>
          <span>🫑</span>
          <span>🧅</span>
          <span>🥕</span>
          <span>🥬</span>
          <span>🌶️</span>
        </div>
      </div>
      <TrustSection />

      <div className="bulk-container">
        <div className="bulk-box">
          📦 We Also Accept Bulk Orders for Events & Special Occasions
        </div>
      </div>
      {/* ================= IMAGE CAROUSEL ================= */}
      <Suspense fallback={<div>Loading...</div>}>
        <CarouselSection />

        <HighlightsSection
          selectedHighlight={selectedHighlight}
          setSelectedHighlight={setSelectedHighlight}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />

        <PicklesSection />
        <PowdersSection />

        <ProductExperienceSection />

        <CommentCarousel />
      </Suspense>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Home;
