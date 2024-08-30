const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainName: {
    type: String,
    required: true,
  },
  line: {
    type: String,
    enum: ["Main Line", "Puttalam Line", "Coastal Line", "Kalaniwali Line"],
    required: true,
  },
  currentStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  currentCoordinates: {
    type: [Number],
    index: "2dsphere",
  },
  lastPassedTime: {
    type: Date,
    required: true,
  },
  passedStations: [
    {
      station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
      },
      time: Date,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
  ],
  status: {
    type: String,
    enum: ["Running", "Stopped"],
    default: "Running",
  },
});

module.exports = mongoose.model("Train", trainSchema);