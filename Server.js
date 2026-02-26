// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt"); // Import bcrypt
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(express.json());
// // Middleware
// app.use(cors());
// //app.use(bodyParser.json());

// mongoose
//   .connect("mongodb://localhost:27017/your-database")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// // Define User Schema and Model
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });
// // Add methods to the user schema to compare passwords and generate a JWT token
// userSchema.methods.matchPasswords = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.getSignedToken = function () {
//   const payload = { id: this._id, email: this.email };
//   return jwt.sign(payload, "your_secret_key", { expiresIn: "1h" });
// };

// const User = mongoose.model("User", userSchema);

// // Route to handle user signup
// app.post("/api/signup", async (req, res) => {
//   //app.post("/api/signup", (req, res) => {
//   //console.log("Received Request:", req.body);
//   //res.status(200).json({ message: "Signup successful" }); // Send a response

//   const { username, email, password } = req.body;

//   try {
//     // Validate input
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

//     // Save user to the database (mock code)
//     console.log("Received Request:", {
//       username,
//       email,
//       password: hashedPassword,
//     });
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     //const existingUser = User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     //const hashedPassword = bcrypt.hashSync(password, 10);

//     // Create a new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     //newUser.save();
//     res.status(200).json({ message: "User Registered / Signup successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error. Please Try Again Later" });
//   }
// });

// // Login Route
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Validate input
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email and password" });
//     }

//     // Find user and check password
//     const user = await User.findOne({ email }).select("+password");
//     if (!user || !(await user.matchPasswords(password))) {
//       console.log("Login Done:", { email, password });
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate and send token
//     const token = user.getSignedToken();
//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Server Error. Please Try Again Later gsdchj" });
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

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

/* ================= SOCKET SETUP ================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make io available inside routes
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);
});

/* ================= MIDDLEWARE ================= */

app.use(cors());
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
app.use("/api", userRoutes);
/* ================= SERVER ================= */

const PORT = process.env.PORT || 3002;

server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
