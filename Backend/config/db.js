const mongoose = require("mongoose");

const uri = "mongodb+srv://user:pass@cluster0.abcd.mongodb.net/mydatabase";
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 100,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas!");
});
