import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IAction } from "../interfaces";
import Action from "../models/Action";
import { responseHandler } from "../utils/defaultResponses";
const router: Router = express.Router();

router.post("/track_action", (req: Request, res: Response) => {
  const newAction = new Action({
    ...req.body,
    created_at: new Date().getTime(),
  });
  newAction.save((err: CallbackError, createdAction: IAction) => {
    responseHandler(res, err, createdAction, "Action not tracked");
  });
});

export default router;
