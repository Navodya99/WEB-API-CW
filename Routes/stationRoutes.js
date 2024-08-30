const express = require("express");
const router = express.Router();
const Station = require("../Models/Station");

// Get all stations
router.get("/", async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific station by ID
router.get("/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new station
router.post("/", async (req, res) => {
  const { name, distanceFromFort, line, latitude, longitude } = req.body;

  const station = new Station({
    name,
    distanceFromFort,
    line,
    latitude,
    longitude,
  });

  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a station by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, distanceFromFort, line, latitude, longitude } = req.body;
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      { name, distanceFromFort, line, latitude, longitude },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a station by ID
router.delete("/:id", async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json({ message: "Station deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;