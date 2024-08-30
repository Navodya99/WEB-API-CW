const Train = require("../Models/Train");
const { startTrain } = require("../Service/trainService");

// Get all trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find().populate(
      "currentStation passedStations.station"
    );
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findOne({ trainName: req.params.trainName });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a train's location
exports.updateTrainLocation = async (req, res) => {
  try {
    const { lastPassedStation, lastPassedTime, passedStations } = req.body;
    const train = await Train.findOneAndUpdate(
      { trainName: req.params.trainName },
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
};

// Start a new train
exports.startTrain = async (req, res) => {
  const { trainName, lineName } = req.body;

  // Validate input
  if (!trainName || !lineName) {
    return res.status(400).json({ msg: "Train ID and Line Name are required" });
  }

  try {
    await startTrain(trainName, lineName);
    res.status(200).json({ msg: "Train starting process initiated" });
  } catch (error) {
    res.status(500).json({ msg: "Error starting train", error: error.message });
  }
};

// Delete a train by ID
exports.deleteTrainById = async (req, res) => {
  try {
    const train = await Train.findOneAndDelete({
      trainName: req.params.trainName,
    });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json({ message: "Train deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
