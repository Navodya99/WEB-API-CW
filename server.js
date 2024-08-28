const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const trainRoutes = require("./Routes/trainRoutes");

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;
const cors = require("cors");
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/trains", trainRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});