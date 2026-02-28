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

// // const io = new Server(server, {
// //   cors: {
// //     origin: "*",
// //   },
// // });

// // Make io available inside routes
// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("🔌 User connected:", socket.id);
// });
// const allowedOrigins = [
//   "https://picklebite.vercel.app",
//   "http://localhost:3001",
// ];
// /* ================= MIDDLEWARE ================= */

// app.use(cors());
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//   },
// });
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

// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

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
  "https://picklebite.vercel.app",
  "http://localhost:3001",
];

/* ================= SOCKET SETUP ================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
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

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("Pickle Bite Backend Running ✅");
});

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

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3002;
console.log("MONGO_URI:", process.env.MONGO_URI);

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

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

// /* ================= ALLOWED ORIGINS ================= */

// const allowedOrigins = [
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

// // Make io available inside routes
// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("🔌 User connected:", socket.id);
// });

// /* ================= MIDDLEWARE ================= */

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }),
// );

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

// /* ================= HEALTH CHECK ================= */

// app.get("/", (req, res) => {
//   res.send("🚀 PickleBite Backend is running...");
// });

// /* ================= SERVER ================= */

// const PORT = process.env.PORT || 3002;

// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
