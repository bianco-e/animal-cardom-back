import express, { Request, Response, Router } from "express";
import { Document, CallbackError } from "mongoose";
import Feedback from "../models/Feedback";
import { responseHandler } from "../utils/defaultResponses";
const router: Router = express.Router();

router.post("/give_feedback", (req: Request, res: Response) => {
  const newFeedback = new Feedback({
    ...req.body,
    created_at: new Date().getTime(),
  });
  newFeedback.save((err: CallbackError, createdFeedback: Document) => {
    responseHandler(res, err, createdFeedback, "Feedback message not saved");
  });
});

export default router;
