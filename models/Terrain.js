const mongoose = require("mongoose");

const TerrainSchema = new mongoose.Schema(
  {
    speciesToBuff: String,
    image: String,
    name: String,
    color: String,
  },
  { collection: "terrains", versionKey: false }
);

module.exports = mongoose.model("Terrain", TerrainSchema);
