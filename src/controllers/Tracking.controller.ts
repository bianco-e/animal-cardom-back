import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IAction, SortedActions } from "../interfaces";
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
    Action.find({}).exec((err: CallbackError, actions: IAction[]) => {
      const actionsToReturn: SortedActions = actions.reduce(
        (acc: SortedActions, curr: IAction) => {
          const currentKey: keyof SortedActions = curr.action;
          return { ...acc, [currentKey]: acc[currentKey].concat(curr) };
        },
        {
          "visit-landing": [],
          "play-as-guest-button": [],
          "sign-in-button": [],
          "you-are-allowed-button": [],
        }
      );
      responseHandler(res, err, actionsToReturn, "Error getting all actions");
    });
  }
}
