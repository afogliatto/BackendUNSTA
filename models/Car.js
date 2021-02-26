const mongoose = require("mongoose");

const CarsSchema = mongoose.Schema({
  brand: String,
  plate: String,
  model: Number,
  pickupLocation: String,
  pickupDate: String,
  dropLocation: String,
  dropDate: String,
});

module.exports = mongoose.model("Cars", CarsSchema);
