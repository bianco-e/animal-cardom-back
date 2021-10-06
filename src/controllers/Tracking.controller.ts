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

  static async getActionsStats(req: Request, res: Response) {
    Action.aggregate([
      {
        $group: {
          _id: "$action",
          actions: { $push: "$$ROOT" },
        },
      },
    ]).exec((err: CallbackError, actions) => {
      console.log(actions);
      responseHandler(res, err, actions, "Error getting all actions");
    });
  }
}
