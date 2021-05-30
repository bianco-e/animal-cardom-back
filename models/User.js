const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    auth_id: String,
    picture: String,
    email: String,
    first_name: String,
    last_name: String,
    locale: String,
    xp: Number,
    coins: Number,
    owned_cards: [String],
    hand: [String],
    preferences: {
      language: String,
    },
  },
  { collection: "users", versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
