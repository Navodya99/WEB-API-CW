const Station = require("../Models/Station");

// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new station
exports.createStation = async (req, res) => {
  const { name, line, latitude, longitude } = req.body;
  const station = new Station({
    name,
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
};

// Update a station by ID
exports.updateStation = async (req, res) => {
  try {
    const { name, line, latitude, longitude } = req.body;
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      { name, line, latitude, longitude },
      { new: true, runValidators: true }
    );
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a station by ID
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json({ message: "Station deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
