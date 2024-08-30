const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  line: {
    type: String,
    enum: ["Main Line", "Puttalam Line", "Coastal Line", "Kalaniwali Line"],
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Station", stationSchema);