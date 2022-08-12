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

  static async getAllActionsStats(req: Request, res: Response) {
    const { sort_by, order } = req.query;
    const orderKey = !order || order === "desc" ? -1 : order === "asc" && 1;

    if (sort_by === "actions") {
      Action.aggregate([
        {
          $group: {
            _id: "$action",
            actions: { $push: "$$ROOT" },
          },
        },
      ]).exec((err: CallbackError, actions) => {
        responseHandler(
          res,
          err,
          actions,
          "Error getting all tracking stats by actions"
        );
      });
    } else {
      Action.find({})
        .sort([[sort_by, orderKey]])
        .exec((err: CallbackError, actions) => {
          responseHandler(
            res,
            err,
            actions,
            `Error getting all actions sorted by ${sort_by} in ${order} order`
          );
        });
    }
  }
}
