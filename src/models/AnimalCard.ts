import { Schema, model } from "mongoose";
import { IAnimal } from "../interfaces";

const AnimalCardSchema = new Schema<IAnimal>(
  {
    created_at: Date,
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
    price: Number,
    sell_price: Number,
    missing: {
      chance: Number,
      exceptions: [String],
    },
  },
  { collection: "animals", versionKey: false }
);

export default model<IAnimal>("AnimalCard", AnimalCardSchema);
