const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8090;

// Middleware
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "My Train API" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});