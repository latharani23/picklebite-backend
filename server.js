const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const path = require("path");
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

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

/* ================= LOAD PRODUCTS & FAQ ================= */

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "products.json"), "utf-8"),
);
const faqs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "faq.json"), "utf-8"),
);

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

/* ================= CHATBOT HELPERS ================= */

// Tier 1 – FAQ lookup from already-loaded faq.json
function searchFAQ(userMessage) {
  for (const faq of faqs) {
    const cleanQuestion = faq.question.toLowerCase().replace(/[?]/g, "").trim();
    if (userMessage.includes(cleanQuestion)) return faq.answer;
  }
  return null;
}

// Tier 2 – Semantic keyword + direct product name match
function semanticSearch(userMessage) {
  const SEMANTIC_TAGS = {
    spicy: [
      "Mango Pickle",
      "Gongura Pickle",
      "Garlic Pickle",
      "Mixed Veg Pickle",
    ],
    hot: [
      "Mango Pickle",
      "Gongura Pickle",
      "Garlic Pickle",
      "Mixed Veg Pickle",
    ],
    achar: [
      "Mango Pickle",
      "Gongura Pickle",
      "Garlic Pickle",
      "Mixed Veg Pickle",
    ],
    sour: ["Lemon Pickle", "Raw Mango Pickle"],
    tangy: ["Lemon Pickle", "Mango Pickle"],
    mild: ["Mixed Veg Pickle", "Lemon Pickle"],
  };

  for (const [tag, names] of Object.entries(SEMANTIC_TAGS)) {
    if (userMessage.includes(tag)) {
      const enriched = names.map((name) => {
        const p = products.find(
          (x) => x.name.toLowerCase() === name.toLowerCase(),
        );
        return p ? `${p.name} (${p.price})` : name;
      });
      return `Based on "${tag}", we recommend: ${enriched.join(", ")}.`;
    }
  }

  // Direct product name match
  for (const product of products) {
    if (userMessage.includes(product.name.toLowerCase())) {
      return `${product.name} is available for ${product.price}. Sizes: ${product.quantity.join(", ")}.`;
    }
  }

  return null;
}

// Tier 3 – RAG: context-aware recommendations + intents
function ragResponse(userMessage) {
  const RAG_RULES = [
    {
      keywords: ["rice", "dal", "sambar"],
      reply:
        "🍚 Best with rice: Mango Pickle, Gongura Pickle, and Mixed Veg Pickle.",
    },
    {
      keywords: ["chapati", "dosa", "roti", "paratha", "bread"],
      reply: "🫓 Best with chapati: Garlic Pickle and Lemon Pickle.",
    },
    {
      keywords: ["contact", "email", "phone", "location", "address"],
      reply:
        "📧 Email: picklebiteco@gmail.com\n📞 Phone: +91 7975390038\n📍 Location: Bengaluru, Karnataka, India\n🕒 Business Hours: 9:00 AM – 8:00 PM.",
    },
    {
      keywords: ["order", "buy", "purchase"],
      reply: "🛒 Please tell us which pickle and quantity you'd like to order.",
    },
    {
      keywords: ["delivery", "ship", "shipping", "courier"],
      reply:
        "🚚 We deliver to nearby cities in 1–3 days. Share your pincode to confirm availability.",
    },
    {
      keywords: ["storage", "how to store", "store pickle", "shelf life"],
      reply:
        "🫙 Store pickles in a cool and dry place. Always use a dry spoon. Pickles can last up to 6 months if stored properly.",
    },
    {
      keywords: ["fresh", "homemade", "preservatives"],
      reply:
        "🏡 Our pickles are homemade-style and prepared using fresh ingredients with traditional taste.",
    },
    {
      keywords: ["discount", "offer", "coupon", "sale"],
      reply:
        "🎉 We occasionally provide discounts and special offers. Please check our website or social media pages for latest deals.",
    },
    {
      keywords: ["cancel order", "cancel", "change order"],
      reply:
        "❌ Orders can be cancelled or modified before dispatch. Please contact us as soon as possible.",
    },
    {
      keywords: ["damaged", "wrong product", "broken", "issue with order"],
      reply:
        "⚠️ If you received a damaged or wrong product, please contact us within 24 hours with photos.",
    },
    {
      keywords: ["bulk order", "wholesale", "large quantity"],
      reply:
        "📦 We accept bulk and wholesale pickle orders. Please contact us for pricing and details.",
    },
    {
      keywords: ["festival", "special occasion", "family pack"],
      reply:
        "🎊 We provide special combo packs and family packs during festivals and special occasions.",
    },
    {
      keywords: ["best seller", "popular", "most famous"],
      reply:
        "⭐ Our most popular pickles are Mango Pickle, Gongura Pickle, and Garlic Pickle.",
    },
    {
      keywords: ["combo", "combo pack", "mixed pack"],
      reply:
        "🥒 We offer combo packs with multiple pickle varieties for customers who want to try different flavors.",
    },
    {
      keywords: ["thank you", "thanks"],
      reply: "💜 You're welcome! Happy to help you.",
    },
    {
      keywords: [
        "buy",
        "order",
        "purchase",
        "place order",
        "how to order",
        "how can i order",
        "how to place the order",
        "how to buy",
      ],
      reply:
        "🛒 To buy a pickle, please go to the Pickles section, choose your favorite pickle, select the quantity, add it to cart, proceed to payment, and place your order.",
    },
    {
      keywords: ["1kg", "500g", "250g", "sizes", "quantity"],
      reply:
        "📦 We offer pickle quantities in 200g, 400g, and 600g depending on the product.",
    },
    {
      keywords: ["return", "refund", "exchange"],
      reply:
        "↩️ We accept returns within 7 days if the product is unopened. Contact us to initiate.",
    },
    {
      keywords: ["hi", "hello", "hey", "hii", "howdy"],
      reply: "👋 Hello! Welcome to PickleBite 💜 How can I help you today?",
    },
    {
      keywords: ["spicy", "hot", "strong pickle"],
      reply:
        "🌶️ Our spicy pickles include Mango Pickle, Gongura Pickle, Garlic Pickle, and Mixed Veg Pickle.",
    },
  ];

  for (const rule of RAG_RULES) {
    if (rule.keywords.some((kw) => userMessage.includes(kw))) {
      return rule.reply;
    }
  }

  return null;
}

/* ================= CHATBOT ROUTE ================= */

app.post("/chat", (req, res) => {
  const userMessage = req.body.message?.toLowerCase().trim();

  if (!userMessage) {
    return res.status(400).json({ reply: "Message cannot be empty." });
  }

  // Tier 1: FAQ
  const faqReply = searchFAQ(userMessage);
  if (faqReply) return res.json({ reply: faqReply, source: "faq" });

  // Tier 2: Semantic Search
  const semanticReply = semanticSearch(userMessage);
  if (semanticReply)
    return res.json({ reply: semanticReply, source: "semantic" });

  // Tier 3: RAG
  const ragReply = ragResponse(userMessage);
  if (ragReply) return res.json({ reply: ragReply, source: "rag" });

  // Fallback
  return res.json({
    reply:
      "Sorry, I didn't understand. Try asking about pickles, prices, delivery, or orders. 🥒",
    source: "fallback",
  });
});

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("🚀 PickleBite Backend is running...");
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
