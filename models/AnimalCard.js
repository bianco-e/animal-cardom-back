const mongoose = require("mongoose");

const AnimalCardSchema = new mongoose.Schema(
  {
    name: String,
    species: String,
    image: String,
    skill: {
      name: String,
      description: String,
      types: [String],
    },
    attack: { initial: Number, current: Number },
    life: { initial: Number, current: Number },
    poisoned: { damage: Number, rounds: Number },
    paralyzed: Number,
    targeteable: Boolean,
    bleeding: Boolean,
  },
  { collection: "animals", versionKey: false }
);

module.exports = mongoose.model("AnimalCard", AnimalCardSchema);
