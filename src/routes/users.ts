import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IUser } from "../interfaces";
import User from "../models/User";
import { responseHandler } from "../utils/defaultResponses";
const router: Router = express.Router();

router.post("/users/create", (req: Request, res: Response) => {
  const newUser = new User(req.body);
  newUser.save((err: CallbackError, createdUser: IUser) => {
    responseHandler(res, err, createdUser, "Error creating new user");
  });
});

router.post("/users/me", (req: Request, res: Response) => {
  const { auth_id } = req.body;
  User.findOne({ auth_id }, (err: CallbackError, userMe: IUser | null) => {
    responseHandler(
      res,
      err,
      userMe,
      "Error getting user data",
      "User not found"
    );
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
    responseHandler(
      res,
      err,
      userProfile,
      "Error getting user profile",
      "User not found"
    );
  });
});

router.post("/users/hand/update", (req: Request, res: Response) => {
  const { auth_id, hand } = req.body;
  const query = User.findOneAndUpdate({ auth_id }, { hand }, { new: true });
  query.exec((err: CallbackError, newUser: IUser | null) => {
    responseHandler(
      res,
      err,
      newUser?.hand,
      "Error updating user hand",
      "User to update not found"
    );
  });
});

router.post("/users/owned_cards/add", (req: Request, res: Response) => {
  const { auth_id, new_card } = req.body;
  User.updateOne(
    { auth_id },
    { $push: { owned_cards: new_card } },
    { new: true, upsert: true }
  ).exec((err: CallbackError) => {
    responseHandler(
      res,
      err,
      new_card,
      "Error adding new card",
      "User not found"
    );
  });
});

router.post("/users/animal_purchase", (req, res) => {
  const { auth_id, new_card, price } = req.body;
  User.updateOne(
    { auth_id },
    { $push: { owned_cards: new_card }, $inc: { coins: -price } },
    { new: true, upsert: true }
  ).exec((err: CallbackError) => {
    responseHandler(
      res,
      err,
      { new_card },
      "Error buying new card",
      "User not found"
    );
  });
});

router.post("/users/clean/owned_cards", (req: Request, res: Response) => {
  const { auth_id } = req.body;
  const query = User.findOne({ auth_id }).select(["owned_cards"]);
  query.exec((err: CallbackError, user: IUser | null) => {
    if (err) return console.error(err);
    if (!user) return console.error(err);
    const { owned_cards } = user;
    const filteredCards = owned_cards.reduce((acc: string[], curr: string) => {
      if (curr && !acc.includes(curr)) {
        return [...acc, curr];
      } else return acc;
    }, []);
    User.updateOne({ auth_id }, { owned_cards: filteredCards }).exec(
      (err: CallbackError) => {
        if (err) return console.error(err);
        res.send(filteredCards);
      }
    );
  });
});

export default router;
