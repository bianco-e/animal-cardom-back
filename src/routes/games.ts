import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import AnimalCard from "../models/AnimalCard";
import PlantCard from "../models/PlantCard";
import User from "../models/User";
import { GameModel as Game } from "../models/Game";
import { defaultOkResponse } from "../utils/defaultResponses";
import { campaignPcAnimals } from "../utils/constants";
import { IAnimal, IGame, IUser } from "../interfaces";
const router: Router = express.Router();

//refactor this query
router.get("/games/new-random", (req: Request, res: Response) => {
  AnimalCard.aggregate([{ $sample: { size: 10 } }]).exec(
    (animalsErr: CallbackError, animalsDocs: Document[]) => {
      if (animalsErr)
        return console.error("Error getting random initial hands", animalsErr);
      PlantCard.aggregate([{ $sample: { size: 6 } }]).exec(
        (plantsErr: CallbackError, plantsDocs: Document[]) => {
          if (plantsErr)
            return console.error(
              "Error getting random initial hands",
              plantsErr
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
});

//refactor this query
router.get("/games/new-campaign", (req: Request, res: Response) => {
  const { xp, user_cards } = req.query;
  if ((xp !== undefined) !== undefined && user_cards) {
    const parsedXp: number = parseInt(xp!.toString());
    const userCards: string[] = user_cards.toString().split(";");
    PlantCard.aggregate([{ $sample: { size: 6 } }]).exec(
      (plantsErr: Error, plantsDocs: Document[]) => {
        if (plantsErr)
          return console.error(
            "Error getting random initial plants",
            plantsErr
          );
        const pcFilteredAnimals = campaignPcAnimals[parsedXp]
          .filter((animal: string) => !userCards.includes(animal))
          .slice(0, 5);

        AnimalCard.find({
          name: { $in: pcFilteredAnimals },
        }).exec((pcAnimalsErr: CallbackError, pcAnimals: IAnimal[]) => {
          if (pcAnimalsErr)
            return console.error(
              "Error getting pc initial hand for campaign",
              pcAnimalsErr
            );
          AnimalCard.find({
            name: { $in: userCards },
          }).exec((userAnimalsErr: CallbackError, userAnimals: IAnimal[]) => {
            if (userAnimalsErr)
              return console.error(
                "Error getting pc initial hand for campaign",
                userAnimalsErr
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
});

router.post("/games/save-game", (req: Request, res: Response) => {
  const { game, auth_id } = req.body;
  const { coins_earned, xp_earned, earned_animal } = game;
  if (coins_earned && xp_earned && earned_animal && auth_id) {
    Game.updateOne(
      { auth_id },
      { $push: { games: { ...game, created_at: new Date().getTime() } } },
      { new: true, upsert: true }
    ).exec((error: CallbackError) => {
      if (error) return console.error(error);
      User.findOneAndUpdate(
        { auth_id },
        {
          $inc: { coins: coins_earned, xp: xp_earned },
          $push: { owned_cards: earned_animal },
        },
        { new: true }
      ).exec((err: CallbackError, userDoc: IUser | null) => {
        if (err || !userDoc) return console.error(err);
        defaultOkResponse(res, {
          xp: userDoc.xp,
          earned_animal: userDoc.owned_cards[userDoc.owned_cards.length - 1],
        });
      });
    });
  }
});

router.post("/games/last-games", (req: Request, res: Response) => {
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
    if (err) return console.error(err);
    defaultOkResponse(
      res,
      docs.length > 0 ? docs[0].games.slice(0, docsNumber) : []
    );
  });
});

export default router;
