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
   },
 ],
 status: {
   type: String,
   enum: ["Running", "Stopped"],
   default: "Running",
 },
});


module.exports = mongoose.model("Train", trainSchema);
