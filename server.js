const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const { getShippingRate } = require("./routes/shipping");
const { Server } = require("socket.io");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ================= ALLOWED ORIGINS ================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://www.picklebite.in",
  "https://picklebite.in",
];

/* ================= SOCKET SETUP ================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);
});

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

/* ================= PRODUCTS & FAQ ================= */

const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const faqs = JSON.parse(fs.readFileSync("faq.json", "utf8"));

/* ================= MONGODB ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", contactRoutes);
app.post("/api/shipping-rate", getShippingRate);

/* ================= CHATBOT ROUTE ================= */

app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();

  let reply =
    "Sorry, I did not understand. Please ask about pickles, prices, delivery, or orders.";

  let faqMatched = false;

  // FAQ Search First
  for (let faq of faqs) {
    const cleanQuestion = faq.question.toLowerCase().replace("?", "").trim();

    if (userMessage.includes(cleanQuestion)) {
      reply = faq.answer;
      faqMatched = true;
      break;
    }
  }

  // Product Search
  if (!faqMatched) {
    for (let product of products) {
      if (userMessage.includes(product.name.toLowerCase())) {
        reply = `${product.name} is available for ${product.price}. Available quantities: ${product.quantity.join(", ")}.`;
        break;
      }
    }
  }

  // Greeting
  if (
    !faqMatched &&
    (userMessage === "hi" || userMessage === "hello" || userMessage === "hey")
  ) {
    reply = "Hello! Welcome to PickleBite 💜";
  }

  // Semantic Search
  if (
    !faqMatched &&
    (userMessage.includes("spicy") ||
      userMessage.includes("hot") ||
      userMessage.includes("achar"))
  ) {
    reply =
      "We recommend Mango Pickle, Gongura Pickle, Garlic Pickle, and Mixed Veg Pickle.";
  }

  // Rice Recommendation
  if (!faqMatched && userMessage.includes("rice")) {
    reply =
      "Mango Pickle, Gongura Pickle, and Mixed Veg Pickle are best with rice.";
  }

  // Chapati Recommendation
  if (!faqMatched && userMessage.includes("chapati")) {
    reply = "Garlic Pickle and Lemon Pickle go very well with chapati.";
  }

  // Order Workflow
  if (!faqMatched && userMessage.includes("order")) {
    reply = "Please tell us which pickle and quantity you want to order.";
  }

  // Delivery Workflow
  if (!faqMatched && userMessage.includes("delivery")) {
    reply =
      "We provide delivery in nearby cities and selected areas. Delivery takes 1 to 3 days.";
  }

  res.json({ reply });
});

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("🚀 PickleBite Backend is running...");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
