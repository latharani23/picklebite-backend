// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// /* ================= SOCKET SETUP ================= */

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// // Make io available inside routes
// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("🔌 User connected:", socket.id);
// });

// /* ================= MIDDLEWARE ================= */

// app.use(cors());
// app.use(express.json());

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
// app.use("/api", userRoutes);
// /* ================= SERVER ================= */

// const PORT = process.env.PORT || 3002;

// server.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`),
// );

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* ================= ALLOWED ORIGINS ================= */

const allowedOrigins = [
  "http://localhost:3000",
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

// Make io available inside routes
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

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("🚀 PickleBite Backend is running...");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
