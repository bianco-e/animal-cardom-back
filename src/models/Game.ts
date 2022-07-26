import { Schema, model } from "mongoose";
import { IGame } from "../interfaces";

export const GameSchema = new Schema<IGame>(
  {
    auth_id: String,
    games: [
      {
        created_at: Date,
        earned_animal: String,
        terrain: String,
        earned_coins: Number,
        earned_xp: Number,
        won: Boolean,
        used_animals: {
          user: [{ name: String, survived: Boolean }],
          pc: [{ name: String, survived: Boolean }],
        },
        used_plants: {
          user: [{ name: String, applied: Boolean }],
          pc: [{ name: String, applied: Boolean }],
        },
      },
    ],
  },
  { collection: "users-games", versionKey: false }
);

export const GameModel = model<IGame>("Game", GameSchema);

const ModelObject = {
  GameModel,
  GameSchema,
};

export default ModelObject;
