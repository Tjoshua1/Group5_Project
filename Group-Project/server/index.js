require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
console.log('MongoDB URI:', process.env.MONGODB_URI);
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB Atlas");

  // Start server **after** DB connection
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Tap in @TU Server!" });
});
