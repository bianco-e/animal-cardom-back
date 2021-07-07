import { Request, Response } from "express";
import { Document, CallbackError } from "mongoose";
import Feedback from "../models/Feedback";
import { getTimeStamp } from "../utils";
import { responseHandler } from "../utils/defaultResponses";

export class FeedbackControllers {
  static async giveFeedback(req: Request, res: Response) {
    const newFeedback = new Feedback({
      ...req.body,
      created_at: getTimeStamp(),
    });
    newFeedback.save((err: CallbackError, createdFeedback: Document) => {
      responseHandler(res, err, createdFeedback, "Feedback message not saved");
    });
  }
}
