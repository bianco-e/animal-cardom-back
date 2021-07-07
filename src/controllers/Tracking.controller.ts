import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IAction } from "../interfaces";
import Action from "../models/Action";
import { getTimeStamp } from "../utils";
import { responseHandler } from "../utils/defaultResponses";

export class TrackingController {
  static async trackAction(req: Request, res: Response) {
    const newAction = new Action({
      ...req.body,
      created_at: getTimeStamp(),
    });
    newAction.save((err: CallbackError, createdAction: IAction) => {
      responseHandler(res, err, createdAction, "Action not tracked");
    });
  }
}
