import { Request, Response } from "express";
import { Document, CallbackError } from "mongoose";
import Feedback from "../models/Feedback";
import { responseHandler } from "../utils/defaultResponses";

export class FeedbackControllers {
  static async giveFeedback(req: Request, res: Response) {
    const newFeedback = new Feedback({
      ...req.body,
      created_at: new Date().getTime(),
    });
    newFeedback.save((err: CallbackError, createdFeedback: Document) => {
      responseHandler(res, err, createdFeedback, "Feedback message not saved");
    });
  }
}
