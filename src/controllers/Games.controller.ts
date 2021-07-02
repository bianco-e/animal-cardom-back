import { Request, Response } from "express";
import { CallbackError, Error } from "mongoose";
import AnimalCard from "../models/AnimalCard";
import PlantCard from "../models/PlantCard";
import User from "../models/User";
import { GameModel as Game } from "../models/Game";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
import { campaignPcAnimals } from "../utils/constants";
import log from "../utils/logger";
import { IAnimal, IGame, IUser } from "../interfaces";

export class GamesController {
  static async getRandomGame(req: Request, res: Response) {
    AnimalCard.aggregate([{ $sample: { size: 10 } }]).exec(
      (animalsErr: CallbackError, animalsDocs: Document[]) => {
        if (animalsErr)
          return log.error(
            "Error getting random initial hands",
            JSON.stringify(animalsErr)
          );

        PlantCard.aggregate([{ $sample: { size: 6 } }]).exec(
          (plantsErr: CallbackError, plantsDocs: Document[]) => {
            if (plantsErr)
              return log.error(
                "Error getting random initial plants",
                JSON.stringify(plantsErr)
              );
            const response = {
              user: {
                animals: animalsDocs.slice(0, 5),
                plants: plantsDocs.slice(0, 3),
              },
              pc: {
                animals: animalsDocs.slice(5),
                plants: plantsDocs.slice(3),
              },
            };
            defaultOkResponse(res, response);
          }
        );
      }
    );
  }

  static async getNewCampaign(req: Request, res: Response) {
    const { xp, user_cards } = req.query;
    if ((xp !== undefined) !== undefined && user_cards) {
      const parsedXp: number = parseInt(xp!.toString());
      const userCards: string[] = user_cards.toString().split(";");
      PlantCard.aggregate([{ $sample: { size: 6 } }]).exec(
        (plantsErr: Error, plantsDocs: Document[]) => {
          if (plantsErr)
            return log.error(
              "Error getting random initial plants",
              JSON.stringify(plantsErr)
            );
          const pcFilteredAnimals = campaignPcAnimals[parsedXp]
            .filter((animal: string) => !userCards.includes(animal))
            .slice(0, 5);

          AnimalCard.find({
            name: { $in: pcFilteredAnimals },
          }).exec((pcAnimalsErr: CallbackError, pcAnimals: IAnimal[]) => {
            if (pcAnimalsErr)
              return log.error(
                "Error getting pc initial hand for campaign",
                JSON.stringify(pcAnimalsErr)
              );
            AnimalCard.find({
              name: { $in: userCards },
            }).exec((userAnimalsErr: CallbackError, userAnimals: IAnimal[]) => {
              if (userAnimalsErr)
                return log.error(
                  "Error getting pc initial hand for campaign",
                  JSON.stringify(userAnimalsErr)
                );
              const response = {
                user: {
                  animals: userAnimals,
                  plants: plantsDocs.slice(0, 3),
                },
                pc: {
                  animals: pcAnimals,
                  plants: plantsDocs.slice(3),
                },
              };
              defaultOkResponse(res, response);
            });
          });
        }
      );
    }
  }

  static async saveGame(req: Request, res: Response) {
    const { game, auth_id } = req.body;
    const { coins_earned, xp_earned, earned_animal } = game;
    if (coins_earned && xp_earned && earned_animal && auth_id) {
      Game.updateOne(
        { auth_id },
        { $push: { games: { ...game, created_at: new Date().getTime() } } },
        { new: true, upsert: true }
      ).exec((error: CallbackError) => {
        if (error)
          return log.error("Error saving last game", JSON.stringify(error));
        User.findOneAndUpdate(
          { auth_id },
          {
            $inc: { coins: coins_earned, xp: xp_earned },
            $push: { owned_cards: earned_animal },
          },
          { new: true }
        ).exec((err: CallbackError, userDoc: IUser | null) => {
          responseHandler(
            res,
            err,
            {
              xp: userDoc?.xp,
              earned_animal:
                userDoc?.owned_cards[userDoc.owned_cards.length - 1],
            },
            "Error saving game",
            "User does not exist"
          );
        });
      });
    }
  }

  static async getLastGames(req: Request, res: Response) {
    const { auth_id } = req.body;
    const quantity: string | undefined = req.query.quantity?.toString();
    const docsNumber = quantity ? parseInt(quantity) : 20;
    Game.aggregate([
      {
        $match: {
          auth_id,
        },
      },
      { $unwind: "$games" },
      {
        $sort: {
          "games.created_at": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          games: {
            $push: "$games",
          },
        },
      },
    ]).exec((err: CallbackError, docs: IGame[]) => {
      responseHandler(
        res,
        err,
        docs.length > 0 ? docs[0].games.slice(0, docsNumber) : [],
        "Error getting last games"
      );
    });
  }
}
