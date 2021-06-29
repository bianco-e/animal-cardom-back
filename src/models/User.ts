import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>(
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

export default model<IUser>("User", UserSchema);
