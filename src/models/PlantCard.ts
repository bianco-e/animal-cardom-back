import { Schema, model } from "mongoose";
import { IPlant } from "../interfaces";

const PlantCardSchema = new Schema<IPlant>(
  {
    name: String,
    description: String,
    image: String,
    appliable_on: String,
  },
  { collection: "plants-cards", versionKey: false }
);

export default model<IPlant>("PlantCard", PlantCardSchema);
