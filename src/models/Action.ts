import { Schema, model } from "mongoose";
import { IAction } from "../interfaces";

const ActionSchema = new Schema<IAction>(
  {
    action: String,
    utm: String,
    guest_name: String,
    auth_id: String,
    created_at: Date,
  },
  { collection: "actions", versionKey: false }
);

export default model<IAction>("Action", ActionSchema);
