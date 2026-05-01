// const express = require("express"); // ✅ fixed typo
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const { getShippingRate } = require("./routes/shipping");
// const { Server } = require("socket.io");

// require("dotenv").config(); // ✅ only once

// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const authRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// const app = express();

// /* ================= ALLOWED ORIGINS ================= */

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
//   "https://www.picklebite.in",
//   "https://picklebite.in",
// ];

// /* ================= SOCKET SETUP ================= */

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   },
// });

// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("🔌 User connected:", socket.id);
// });

// /* ================= MIDDLEWARE ================= */

// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(express.json());

// /* ================= LOAD DATA ================= */

// const products = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "products.json"), "utf-8"),
// );

// const faqs = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "faq.json"), "utf-8"),
// );

// /* ================= MONGODB ================= */

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ================= ROUTES ================= */

// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api", contactRoutes);
// app.post("/api/shipping-rate", getShippingRate);

// /* ================= CHATBOT HELPERS ================= */

// // FAQ
// function searchFAQ(userMessage) {
//   for (const faq of faqs) {
//     const cleanQuestion = faq.question.toLowerCase().replace(/[?]/g, "").trim();
//     if (userMessage.includes(cleanQuestion)) return faq.answer;
//   }
//   return null;
// }

// // Product search (keyword-based)
// function semanticSearch(userMessage) {
//   const message = userMessage.toLowerCase();

//   const KEYWORD_MAP = {
//     garlic: "Garlic Pickle",
//     gajanimbe: "Gajanimbe Pickle",
//     mango: "Mango Pickle",
//     hiralekayi: "Hiralekayi Pickle",
//     lemon: "Lemon Pickle",
//     amla: "Amla Pickle",
//     "green chilli": "Green Chilli Pickle",
//     gongura: "Gongura Pickle",
//     "mixed veg": "Mixed Veg Pickle",
//     cucumber: "Cucumber Pickle",
//     "bitter gourd": "Bitter Gourd Pickle",
//   };

//   for (const keyword in KEYWORD_MAP) {
//     if (message.includes(keyword)) {
//       const productName = KEYWORD_MAP[keyword];

//       const product = products.find(
//         (p) => p.name.toLowerCase() === productName.toLowerCase(),
//       );

//       if (product) {
//         return `${product.name} is available for ${product.price}. Sizes: ${product.quantity.join(", ")}.`;
//       }
//     }
//   }

//   // fallback
//   for (const product of products) {
//     if (message.includes(product.name.toLowerCase())) {
//       return `${product.name} is available for ${product.price}. Sizes: ${product.quantity.join(", ")}.`;
//     }
//   }

//   return null;
// }

// // RAG rules
// function ragResponse(userMessage) {
//   const rules = [
//     {
//       keywords: ["contact", "email", "phone", "location"],
//       reply:
//         "📧 Email: picklebiteco@gmail.com\n📞 Phone: +91 7975390038\n📍 Bengaluru\n🕒 9:00 AM – 8:00 PM",
//     },
//     {
//       keywords: ["order", "buy", "purchase"],
//       reply: "🛒 Go to Pickles → Select → Add to cart → Checkout → Pay → Order",
//     },
//     {
//       keywords: ["delivery"],
//       reply: "🚚 Delivery takes 1–3 days.",
//     },
//     {
//       keywords: ["hi", "hello"],
//       reply: "👋 Hello! Welcome to PickleBite 💜",
//     },
//   ];

//   for (const rule of rules) {
//     if (rule.keywords.some((k) => userMessage.includes(k))) {
//       return rule.reply;
//     }
//   }

//   return null;
// }

// // ✅ CONTEXT FOR AI
// function buildContext() {
//   let context = "PickleBite Information:\n\n";

//   context += "Products:\n";
//   products.forEach((p) => {
//     context += `- ${p.name}: ${p.price}, Sizes: ${p.quantity.join(", ")}\n`;
//   });

//   context += "\nFAQs:\n";
//   faqs.forEach((f) => {
//     context += `Q: ${f.question}\nA: ${f.answer}\n`;
//   });

//   return context;
// }

// /* ================= CHAT ROUTE ================= */

// app.post("/chat", async (req, res) => {
//   const userMessage = req.body.message?.toLowerCase().trim();

//   if (!userMessage) {
//     return res.status(400).json({ reply: "Message cannot be empty." });
//   }

//   try {
//     // 1. FAQ
//     const faq = searchFAQ(userMessage);
//     if (faq) return res.json({ reply: faq });

//     // 2. Product
//     const product = semanticSearch(userMessage);
//     if (product) return res.json({ reply: product });

//     // 3. Rules
//     const rag = ragResponse(userMessage);
//     if (rag) return res.json({ reply: rag });

//     // 4. AI
//     const context = buildContext();

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are PickleBite assistant. Help users with pickles, ordering and suggestions. Keep answers short.",
//         },
//         {
//           role: "user",
//           content: `${context}\n\nUser: ${userMessage}`,
//         },
//       ],
//     });

//     const reply = response.choices[0].message.content;

//     return res.json({ reply });
//   } catch (error) {
//     console.error(error);
//     return res.json({ reply: "AI error. Please try again." });
//   }
// });

// /* ================= SERVER ================= */

// app.get("/", (req, res) => {
//   res.send("🚀 PickleBite Backend is running...");
// });

// const PORT = process.env.PORT || 3002;

// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });








// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const { getShippingRate } = require("./routes/shipping");
// const { Server } = require("socket.io");

// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// const app = express();

// /* ================= ALLOWED ORIGINS ================= */

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
//   "https://www.picklebite.in",
//   "https://picklebite.in",
// ];

// /* ================= SOCKET ================= */

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("🔌 User connected:", socket.id);
// });

// /* ================= MIDDLEWARE ================= */

// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(express.json());

// /* ================= LOAD DATA ================= */

// const products = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "products.json"), "utf-8"),
// );

// const faqs = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "faq.json"), "utf-8"),
// );

// /* ================= MONGODB ================= */

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ================= ROUTES ================= */

// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api", contactRoutes);
// app.post("/api/shipping-rate", getShippingRate);

// /* ================= CHATBOT ================= */

// // FAQ
// function searchFAQ(userMessage) {
//   for (const faq of faqs) {
//     const q = faq.question.toLowerCase().replace(/[?]/g, "").trim();
//     if (userMessage.includes(q)) return faq.answer;
//   }
//   return null;
// }

// // Semantic + product
// function semanticSearch(userMessage) {
//   const message = userMessage.toLowerCase();

//   const TAGS = {
//     spicy: ["Mango Pickle", "Gongura Pickle", "Garlic Pickle"],
//     sour: ["Lemon Pickle"],
//     mild: ["Mixed Veg Pickle"],
//   };

//   for (const [tag, list] of Object.entries(TAGS)) {
//     if (message.includes(tag)) {
//       return `🌟 Recommended: ${list.join(", ")}`;
//     }
//   }

//   for (const p of products) {
//     if (message.includes(p.name.toLowerCase())) {
//       return `${p.name} costs ${p.price}. Sizes: ${p.quantity.join(", ")}`;
//     }
//   }

//   return null;
// }

// // Tier 3 – RAG: context-aware recommendations + intents
// function ragResponse(userMessage) {
//   const message = userMessage.toLowerCase();
//   const RAG_RULES = [
//     {
//       keywords: ["rice", "dal", "sambar"],
//       reply:
//         "🍚 Best with rice: Mango Pickle, Gongura Pickle, and Mixed Veg Pickle.",
//     },
//     {
//       keywords: ["chapati", "dosa", "roti", "paratha", "bread"],
//       reply: "🫓 Best with chapati: Garlic Pickle and Lemon Pickle.",
//     },
//     {
//       keywords: ["contact", "email", "phone", "location", "address"],
//       reply:
//         "📧 Email: picklebiteco@gmail.com\n📞 Phone: +91 7975390038\n📍 Location: Bengaluru, Karnataka, India\n🕒 Business Hours: 9:00 AM – 8:00 PM.",
//     },
//     //{
//     //keywords: ["order", "buy", "purchase"],
//     //reply: "🛒 Please tell us which pickle and quantity you'd like to order.",
//     //},
//     {
//       keywords: ["delivery", "ship", "shipping", "courier"],
//       reply:
//         "🚚 We deliver to nearby cities in 1–3 days. Share your pincode to confirm availability.",
//     },
//     {
//       keywords: ["storage", "how to store", "store pickle", "shelf life"],
//       reply:
//         "🫙 Store pickles in a cool and dry place. Always use a dry spoon. Pickles can last up to 6 months if stored properly.",
//     },
//     {
//       keywords: ["fresh", "homemade", "preservatives"],
//       reply:
//         "🏡 Our pickles are homemade-style and prepared using fresh ingredients with traditional taste.",
//     },
//     {
//       keywords: ["discount", "offer", "coupon", "sale"],
//       reply:
//         "🎉 We occasionally provide discounts and special offers. Please check our website or social media pages for latest deals.",
//     },
//     {
//       keywords: ["cancel order", "cancel", "change order"],
//       reply:
//         "❌ Orders can be cancelled or modified before dispatch. Please contact us as soon as possible.",
//     },
//     {
//       keywords: ["damaged", "wrong product", "broken", "issue with order"],
//       reply:
//         "⚠️ If you received a damaged or wrong product, please contact us within 24 hours with photos.",
//     },
//     {
//       keywords: ["bulk order", "wholesale", "large quantity"],
//       reply:
//         "📦 We accept bulk and wholesale pickle orders. Please contact us for pricing and details.",
//     },
//     {
//       keywords: ["festival", "special occasion", "family pack"],
//       reply:
//         "🎊 We provide special combo packs and family packs during festivals and special occasions.",
//     },
//     {
//       keywords: ["best seller", "popular", "most famous"],
//       reply:
//         "⭐ Our most popular pickles are Mango Pickle, Gongura Pickle, and Garlic Pickle.",
//     },
//     {
//       keywords: ["combo", "combo pack", "mixed pack"],
//       reply:
//         "🥒 We offer combo packs with multiple pickle varieties for customers who want to try different flavors.",
//     },
//     {
//       keywords: ["thank you", "thanks"],
//       reply: "💜 You're welcome! Happy to help you.",
//     },
//     {
//       keywords: [
//         "buy",
//         "order",
//         "purchase",
//         "place order",
//         "how to order",
//         "how can i order",
//         "how to place the order",
//         "how to buy",
//       ],
//       reply:
//         "🛒 To buy a pickle, please go to the Pickles section, choose your favorite pickle, select the quantity, add it to cart, proceed to payment, and place your order.",
//     },
//     {
//       keywords: ["1kg", "500g", "250g", "sizes", "quantity"],
//       reply:
//         "📦 We offer pickle quantities in 200g, 400g, and 600g depending on the product.",
//     },
//     {
//       keywords: ["return", "refund", "exchange"],
//       reply:
//         "↩️ We accept returns within 7 days if the product is unopened. Contact us to initiate.",
//     },
//     {
//       keywords: ["hi", "hello", "hey", "hii", "howdy"],
//       reply: "👋 Hello! Welcome to PickleBite 💜 How can I help you today?",
//     },
//     {
//       keywords: ["spicy", "hot", "strong pickle"],
//       reply:
//         "🌶️ Our spicy pickles include Mango Pickle, Gongura Pickle, Garlic Pickle, and Mixed Veg Pickle.",
//     },
//     {
//       keywords: ["bye", "goodbye", "see you"],
//       reply: "👋 Thank you for visiting PickleBite. Have a great day!",
//     },
//   ];
//   for (const rule of RAG_RULES) {
//     // ✅ fix here
//     if (rule.keywords.some((k) => message.includes(k))) {
//       return rule.reply;
//     }
//   }

//   return null;
// }

// /* ================= CHAT ROUTE ================= */

// app.post("/chat", (req, res) => {
//   const userMessage = req.body.message?.toLowerCase().trim();

//   if (!userMessage) {
//     return res.json({ reply: "Please type something." });
//   }

//   const faq = searchFAQ(userMessage);
//   if (faq) return res.json({ reply: faq });

//   const semantic = semanticSearch(userMessage);
//   if (semantic) return res.json({ reply: semantic });

//   const rag = ragResponse(userMessage);
//   if (rag) return res.json({ reply: rag });

//   return res.json({
//     reply: "Sorry, I didn’t understand. Ask about pickles 🥒",
//   });
// });

// /* ================= SERVER ================= */

// app.get("/", (req, res) => {
//   res.send("🚀 Backend working");
// });

// const PORT = process.env.PORT || 3002;

// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



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

/* ================= LOAD DATA ================= */

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
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

/* ================= SERVER ================= */

app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});