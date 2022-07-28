import { Schema, model } from "mongoose";
import { ITerrain } from "../interfaces";

const TerrainSchema = new Schema<ITerrain>(
  {
    speciesToBuff: String,
    image: String,
    name: String,
    color: String,
    campaign_xp: [Number],
  },
  { collection: "terrains", versionKey: false }
);

export default model<ITerrain>("Terrain", TerrainSchema);
