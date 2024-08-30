const Train = require("../Models/Train");
const Station = require("../Models/Station");
const Line = require("../Models/Line");

const startTrain = async (trainName, lineName) => {
  try {
    // Fetch the specified line and its stations using the correct lineName
    const line = await Line.findOne({ name: lineName }).populate("stations");
    if (!line) {
      throw new Error(`${lineName} not found`);
    }

    console.log(lineName);
    console.log(`Fetched line: ${line.name}`);
    console.log(
      `Stations for line ${lineName}:`,
      line.stations.map((s) => s.name)
    );

    // Check if the train already exists
    let train = await Train.findOne({ trainName });
    if (train) {
      throw new Error("Train already started");
    }

    // Initialize the train at the first station
    const initialStation = line.stations[0];
    console.log(initialStation);

    // Assuming that stations have coordinates stored as [longitude, latitude]
    train = new Train({
      trainName,
      line: lineName,
      currentStation: initialStation._id,
      currentCoordinates: initialStation.coordinates, // Add coordinates
      lastPassedTime: new Date(),
      passedStations: [
        {
          station: initialStation._id,
          time: new Date(),
          coordinates: initialStation.coordinates,
        },
      ],
    });

    await train.save();
    console.log(`Train started on ${lineName}:`, trainName);

    // Update train position every 10 seconds
    let currentIndex = 0;
    const intervalId = setInterval(async () => {
      // Move to the next station
      currentIndex += 1;
      if (currentIndex >= line.stations.length) {
        clearInterval(intervalId); // Stop if end of line
        train.status = "Stopped";
        await train.save();
        console.log(
          `Train reached the end of ${lineName} and stopped:`,
          trainName
        );
        return;
      }

      // Update train's current station, last passed time, and coordinates
      const nextStation = line.stations[currentIndex];
      train.currentStation = nextStation._id;
      train.currentCoordinates = nextStation.coordinates; // Update coordinates
      train.lastPassedTime = new Date();
      train.passedStations.push({
        station: nextStation._id,
        time: new Date(),
        coordinates: nextStation.coordinates,
      });

      await train.save();

      console.log(
        `Train ${trainName} moved to station ${nextStation.name} on ${lineName}`
      );
    }, 10000); // Update every 10 seconds
  } catch (error) {
    console.error("Error starting train:", error.message);
  }
};

module.exports = { startTrain };
