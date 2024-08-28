const express = require("express");
const router = express.Router();
const Train = require("../Models/Train");

router.get("/", async (req, res) => {
  try {
    const trains = await Train.find().populate(
      "currentStation passedStations.station"
    );
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific train
router.get("/:trainId", async (req, res) => {
  try {
    const train = await Train.findOne({ trainId: req.params.trainId });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update train location
router.put("/:trainId", async (req, res) => {
  try {
    const { lastPassedStation, lastPassedTime, passedStations } = req.body;
    const train = await Train.findOneAndUpdate(
      { trainId: req.params.trainId },
      {
        lastPassedStation,
        lastPassedTime,
        $push: { passedStations: { $each: passedStations } },
      },
      { new: true }
    );
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;