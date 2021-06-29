import { Schema, model } from "mongoose";
import { IFeedback } from "../interfaces";

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: String,
    message: String,
    created_at: Date,
  },
  { collection: "feedback", versionKey: false }
);

export default model<IFeedback>("Feedback", FeedbackSchema);
