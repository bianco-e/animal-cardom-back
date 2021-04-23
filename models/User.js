const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    auth_id: String,
    picture: String,
    email: String,
    first_name: String,
    last_name: String,
    locale: String,
    preferences: {
      language: String,
    },
    profile: {
      campaign_level: Number,
      xp: Number,
    },
    owned_cards: [String],
  },
  { collection: "users", versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
