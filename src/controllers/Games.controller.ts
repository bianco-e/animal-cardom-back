import { Request, Response } from "express";
import { CallbackError, Error, startSession } from "mongoose";
import AnimalCard from "../models/AnimalCard";
import PlantCard from "../models/PlantCard";
import User from "../models/User";
import { GameModel as Game } from "../models/Game";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
import { campaignPcAnimals } from "../utils/constants";
import log from "../utils/logger";
import { IAnimal, IGame, IUser } from "../interfaces";
import { getTimeStamp } from "../utils";

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
    if (xp !== undefined && user_cards) {
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
    const { coins_earned, xp_earned, earned_animal, usedAnimals, usedPlants } =
      game;
    if (
      auth_id &&
      xp_earned !== undefined &&
      coins_earned !== undefined &&
      usedAnimals &&
      usedPlants
    ) {
      const session = await startSession();
      try {
        let transactionResult = null;
        const transaction = await session.withTransaction(async () => {
          const abort = async (message: string) => {
            await session.abortTransaction();
            log.error(message);
            return;
          };
          try {
            await Game.updateOne(
              { auth_id },
              { $push: { games: { ...game, created_at: getTimeStamp() } } },
              { new: true, session, upsert: true }
            );

            const user = await User.findOne({ auth_id }).select("owned_cards");
            if (!user) throw new Error("User does not exist");
            const userOwnsCard =
              earned_animal && user?.owned_cards.includes(earned_animal);
            const updatedUser = await User.findOneAndUpdate(
              { auth_id },
              {
                $inc: { coins: coins_earned, xp: xp_earned },
                ...(!userOwnsCard
                  ? { $push: { owned_cards: earned_animal } }
                  : {}),
              },
              { new: true, session }
            );
            transactionResult = {
              xp: updatedUser?.xp,
              earned_animal,
            };
          } catch (e) {
            return abort(`Error saving last game ${JSON.stringify(e)}`);
          }
        });

        if (transaction && transactionResult) {
          res.status(200).send(transactionResult);
        } else {
          log.error(`Transaction intentionally aborted`);
          res
            .status(500)
            .send(`Transaction intentionally aborted. See error log`);
        }
      } catch (e) {
        log.error(`Transaction aborted due to an unexpected error: ${e}`);
        res.status(500).send(e);
      } finally {
        await session.endSession();
      }
    } else res.status(400).send("Not all required arguments were sent");
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
