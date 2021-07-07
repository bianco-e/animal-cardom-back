import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IUser } from "../interfaces";
import User from "../models/User";
import { NEW_USER_TEMPLATE } from "../utils/constants";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
import log from "../utils/logger";

export class UsersController {
  static async createUser(req: Request, res: Response) {
    const newUser = new User({ ...req.body, ...NEW_USER_TEMPLATE });
    newUser.save((err: CallbackError, createdUser: IUser) => {
      responseHandler(res, err, createdUser, "Error creating new user");
    });
  }

  static async getUserMe(req: Request, res: Response) {
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
  }

  static async getUserProfile(req: Request, res: Response) {
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
  }

  static async updateUserHand(req: Request, res: Response) {
    const { auth_id, hand } = req.body;
    User.findOneAndUpdate({ auth_id }, { hand }, { new: true }).exec(
      (err: CallbackError, newUser: IUser | null) => {
        responseHandler(
          res,
          err,
          newUser?.hand,
          "Error updating user hand",
          "User to update not found"
        );
      }
    );
  }

  static async addCardToUserOwnedCards(req: Request, res: Response) {
    const { auth_id, new_card } = req.body;
    if (new_card) {
      User.findOneAndUpdate(
        { auth_id, owned_cards: { $nin: new_card } },
        { $push: { owned_cards: new_card } }
      ).exec((err: CallbackError, newUser: IUser | null) => {
        responseHandler(
          res,
          err,
          newUser,
          "Error adding new card",
          "User does not exist or already has this card"
        );
      });
    }
  }

  static async purchaseAnimal(req: Request, res: Response) {
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
  }
}
