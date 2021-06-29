import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IUser } from "../interfaces";
import User from "../models/User";
import {
  defaultOkResponse,
  defaultErrorResponse,
} from "../utils/defaultResponses";
const router: Router = express.Router();

router.post("/users/create", (req: Request, res: Response) => {
  const newUser = new User(req.body);
  newUser.save((err: CallbackError, createdUser: IUser) => {
    if (err) return console.error("Error creating new user", err);
    defaultOkResponse(res, createdUser);
  });
});

router.post("/users/me", (req: Request, res: Response) => {
  const { auth_id } = req.body;
  User.findOne({ auth_id }, (err: CallbackError, userMe: IUser | null) => {
    if (err) return console.error(`Error getting user data: ${err}`);
    if (userMe) {
      defaultOkResponse(res, userMe);
    } else defaultErrorResponse(res, "User not found", "user_not_found");
  });
});

router.post("/users/profile", (req: Request, res: Response) => {
  const { auth_id } = req.body;
  const query = User.findOne({ auth_id }).select([
    "xp",
    "owned_cards",
    "hand",
    "coins",
  ]);
  query.exec((err: CallbackError, userProfile: IUser | null) => {
    if (err || !userProfile)
      return console.error(`Error getting user profile: ${err}`);
    if (userProfile) {
      defaultOkResponse(res, userProfile);
    } else defaultErrorResponse(res, "User not found", "user_not_found");
  });
});

router.post("/users/hand/update", (req: Request, res: Response) => {
  const { auth_id, hand } = req.body;
  const query = User.findOneAndUpdate({ auth_id }, { hand }, { new: true });
  query.exec((err: CallbackError, doc: IUser | null) => {
    if (err) return console.error(`Error updating user hand: ${err}`);
    if (doc) {
      defaultOkResponse(res, doc.hand);
    } else
      defaultErrorResponse(res, "Error updating user hand", "hand_not_updated");
  });
});

router.post("/users/owned_cards/add", (req: Request, res: Response) => {
  const { auth_id, new_card } = req.body;
  User.updateOne(
    { auth_id },
    { $push: { owned_cards: new_card } },
    { new: true, upsert: true }
  ).exec((err: CallbackError) => {
    if (err) return console.error(err);
    defaultOkResponse(res, new_card);
  });
});

router.post("/users/animal_purchase", (req, res) => {
  const { auth_id, new_card, price } = req.body;
  User.updateOne(
    { auth_id },
    { $push: { owned_cards: new_card }, $inc: { coins: -price } },
    { new: true, upsert: true }
  ).exec((err: CallbackError) => {
    if (err) return console.error(err);
    defaultOkResponse(res, { new_card: new_card });
  });
});

export default router;
