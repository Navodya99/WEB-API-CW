const mongoose = require("mongoose");


const lineSchema = new mongoose.Schema({
 name: {
   type: String,
   enum: ["Main Line", "Puttalam Line", "Coastal Line", "Kalaniwali Line"],
   required: true,
 },
 stations: [
   {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Station",
   },
 ],
});


module.exports = mongoose.model("Line", lineSchema);
