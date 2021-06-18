const mongoose = require("mongoose");

const PlantCardSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    appliable_on: String,
  },
  { collection: "plants-cards", versionKey: false }
);

module.exports = mongoose.model("PlantCard", PlantCardSchema);
