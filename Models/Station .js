const mongoose = require("mongoose");


const stationSchema = new mongoose.Schema({
 name: {
   type: String,
   required: true,
 },
 distanceFromFort: {
   type: Number,
   required: true,
 },
 line: {
   type: String,
   enum: ["Main Line", "Puttalam Line", "Coastal Line", "Kalaniwali Line"],
   required: true,
 },
});


module.exports = mongoose.model("Station", stationSchema);


