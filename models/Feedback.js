const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    created_at: Date,
  },
  { collection: "feedback", versionKey: false }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
