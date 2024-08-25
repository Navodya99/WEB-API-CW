const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 8090;

// Middleware
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "My Train API" });
});

// MongoDB URL from environment variables
const mongoDBUrl = process.env.MONGODB_URL;

console.log("MongoDB URL:", mongoDBUrl);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});