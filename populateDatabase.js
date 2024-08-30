const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Station = require("./Models/Station");
const Line = require("./Models/Line");

dotenv.config();

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

const populateData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Station.deleteMany({});
    await Line.deleteMany({});

    // Sample data for stations
    const stations = [
      {
        name: "Maradana",
        line: "Main Line",
        latitude: 6.9271,
        longitude: 79.8612,
      },
      {
        name: "Dematagoda",
        line: "Main Line",
        latitude: 6.9508,
        longitude: 79.8785,
      },
      {
        name: "Kelaniya",
        line: "Main Line",
        latitude: 6.9711,
        longitude: 79.9091,
      },
      {
        name: "Wanawasala",
        line: "Main Line",
        latitude: 6.9869,
        longitude: 79.9198,
      },
      {
        name: "Hunupitiya",
        line: "Main Line",
        latitude: 6.9991,
        longitude: 79.9269,
      },
      {
        name: "Enderamulla",
        line: "Main Line",
        latitude: 7.0125,
        longitude: 79.9504,
      },
      {
        name: "Horape",
        line: "Main Line",
        latitude: 7.0261,
        longitude: 79.9615,
      },
      {
        name: "Ragama",
        line: "Main Line",
        latitude: 7.0496,
        longitude: 79.9656,
      },
      {
        name: "Walpola",
        line: "Main Line",
        latitude: 7.0667,
        longitude: 79.9771,
      },
      {
        name: "Batuwatte",
        line: "Main Line",
        latitude: 7.0811,
        longitude: 79.9855,
      },
      {
        name: "Bulugahagoda",
        line: "Main Line",
        latitude: 7.0929,
        longitude: 79.9919,
      },
      {
        name: "Ganemulla",
        line: "Main Line",
        latitude: 7.0976,
        longitude: 80.0046,
      },
      {
        name: "Yagoda",
        line: "Main Line",
        latitude: 7.1169,
        longitude: 80.0133,
      },
      {
        name: "Gampaha",
        line: "Main Line",
        latitude: 7.0899,
        longitude: 79.9926,
      },
      {
        name: "Daraluwa",
        line: "Main Line",
        latitude: 7.1662,
        longitude: 80.0159,
      },
      {
        name: "Bemmulla",
        line: "Main Line",
        latitude: 7.1738,
        longitude: 80.0195,
      },
      {
        name: "Heendeniya",
        line: "Main Line",
        latitude: 7.2095,
        longitude: 80.0612,
      },
      {
        name: "Veyangoda",
        line: "Main Line",
        latitude: 7.1599,
        longitude: 80.0316,
      },
      {
        name: "Keenawala",
        line: "Main Line",
        latitude: 7.2109,
        longitude: 80.0856,
      },
      {
        name: "Pallewala",
        line: "Main Line",
        latitude: 7.2268,
        longitude: 80.1019,
      },
      {
        name: "Mirigama",
        line: "Main Line",
        latitude: 7.2351,
        longitude: 80.1114,
      },
      {
        name: "Ganegoda",
        line: "Main Line",
        latitude: 7.2524,
        longitude: 80.1458,
      },
      {
        name: "Wilwatte",
        line: "Main Line",
        latitude: 7.2675,
        longitude: 80.1607,
      },
      {
        name: "Abeypussa",
        line: "Main Line",
        latitude: 7.2947,
        longitude: 80.1958,
      },
      {
        name: "Yattalgoda",
        line: "Main Line",
        latitude: 7.3071,
        longitude: 80.2101,
      },
      {
        name: "Alawwa",
        line: "Main Line",
        latitude: 7.3171,
        longitude: 80.2671,
      },
      {
        name: "Polgahawela",
        line: "Main Line",
        latitude: 7.3271,
        longitude: 80.2837,
      },
      {
        name: "Rambukkana",
        line: "Main Line",
        latitude: 7.3023,
        longitude: 80.3924,
      },
      {
        name: "Kadigamuwa",
        line: "Main Line",
        latitude: 7.3184,
        longitude: 80.3505,
      },
      {
        name: "Gangoda",
        line: "Main Line",
        latitude: 7.3467,
        longitude: 80.4267,
      },
      {
        name: "Balana",
        line: "Main Line",
        latitude: 7.3094,
        longitude: 80.4836,
      },
      {
        name: "Kadugannawa",
        line: "Main Line",
        latitude: 7.3048,
        longitude: 80.4925,
      },
      {
        name: "Peradeniya",
        line: "Main Line",
        latitude: 7.2667,
        longitude: 80.5947,
      },
      {
        name: "Gampola",
        line: "Main Line",
        latitude: 7.1647,
        longitude: 80.5752,
      },
      {
        name: "Nawalapitiya",
        line: "Main Line",
        latitude: 7.0522,
        longitude: 80.5122,
      },
      {
        name: "Hatton",
        line: "Main Line",
        latitude: 6.8977,
        longitude: 80.5998,
      },
      {
        name: "Nanuoya",
        line: "Main Line",
        latitude: 6.9244,
        longitude: 80.7278,
      },
      {
        name: "Haputale",
        line: "Main Line",
        latitude: 6.7683,
        longitude: 80.9487,
      },
      {
        name: "Ella",
        line: "Main Line",
        latitude: 6.8723,
        longitude: 81.0468,
      },
      {
        name: "Badulla",
        line: "Main Line",
        latitude: 6.9932,
        longitude: 81.0553,
      },
    ];

    const coastalLineStations = [
      {
        name: "Fort",
        line: "Coastal Line",
        latitude: 6.9331,
        longitude: 79.85,
      },
      {
        name: "Secretartat Halt",
        line: "Coastal Line",
        latitude: 6.9321,
        longitude: 79.8555,
      },
      {
        name: "Kompnnavidiya",
        line: "Coastal Line",
        latitude: 6.93,
        longitude: 79.86,
      },
      {
        name: "Bambalapitiya",
        line: "Coastal Line",
        latitude: 6.8957,
        longitude: 79.8591,
      },
      {
        name: "Wellawatte",
        line: "Coastal Line",
        latitude: 6.8762,
        longitude: 79.8616,
      },
      {
        name: "Dehiwala",
        line: "Coastal Line",
        latitude: 6.8516,
        longitude: 79.869,
      },
      {
        name: "Mount Lavinia",
        line: "Coastal Line",
        latitude: 6.831,
        longitude: 79.8748,
      },
      {
        name: "Ratmalana",
        line: "Coastal Line",
        latitude: 6.8014,
        longitude: 79.881,
      },
      {
        name: "Moratuwa",
        line: "Coastal Line",
        latitude: 6.7878,
        longitude: 79.8821,
      },
      {
        name: "Panadura",
        line: "Coastal Line",
        latitude: 6.7131,
        longitude: 79.9075,
      },
    ];

    // Insert stations
    const insertedStations = await Station.insertMany(stations);
    console.log("Stations inserted:", insertedStations.length);

    const insertedCoastalStations = await Station.insertMany(
      coastalLineStations
    );
    console.log("Coastal Stations inserted:", insertedCoastalStations.length);

    // Sample data for lines
    const lines = [
      {
        name: "Main Line",
        stations: insertedStations.map((station) => station._id),
      },
      {
        name: "Coastal Line",
        stations: insertedCoastalStations.map((station) => station._id),
      },
    ];

    // Insert lines
    const insertedLines = await Line.insertMany(lines);
    console.log("Lines inserted:", insertedLines.length);

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

populateData();