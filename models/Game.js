const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    auth_id: String,
    games: [
      {
        created_at: Date,
        terrain: String,
        xp_earned: Number,
        won: Boolean,
        usedAnimals: {
          user: [{ name: String, survived: Boolean }],
          pc: [{ name: String, survived: Boolean }],
        },
        usedPlants: {
          user: [{ name: String, applied: Boolean }],
          pc: [{ name: String, applied: Boolean }],
        },
      },
    ],
  },
  { collection: "users-games", versionKey: false }
);

module.exports = {
  GameModel: mongoose.model("Game", GameSchema),
  GameSchema,
};
