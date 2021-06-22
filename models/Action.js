const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema(
  {
    action: String,
    utm: String,
    guest_name: String,
    auth_id: String,
    created_at: Date,
  },
  { collection: "actions", versionKey: false }
);

module.exports = mongoose.model("Action", ActionSchema);
