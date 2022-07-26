import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IAnimal } from "../interfaces";
import AnimalCard from "../models/AnimalCard";
import { getTimeStamp } from "../utils";
import {
  defaultErrorResponse,
  defaultOkResponse,
  responseHandler,
} from "../utils/defaultResponses";
import log from "../utils/logger";

export class AnimalsController {
  static async getAllAnimals(req: Request, res: Response) {
    AnimalCard.find({}).exec((err: CallbackError, animals: IAnimal[]) => {
      responseHandler(res, err, { animals }, "Error getting all animals");
    });
  }

  static async getAllAnimalsStatistics(req: Request, res: Response) {
    AnimalCard.find({}).exec((err: CallbackError, animals: IAnimal[]) => {
      const animalsBySpecies = animals.reduce(
        (
          acc: {
            [x: string]: {
              quantity: number;
              highestAttack?: { name: string; attack: number };
              highestLife?: { name: string; life: number };
            };
          },
          curr: IAnimal
        ) => {
          if (curr.species in acc) {
            const accSpecies = acc[curr.species];
            return {
              ...acc,
              [curr.species]: {
                ...accSpecies,
                quantity: accSpecies.quantity + 1,
                ...(!accSpecies.highestAttack ||
                accSpecies.highestAttack.attack < curr.attack.initial
                  ? {
                      highestAttack: {
                        name: curr.name,
                        attack: curr.attack.initial,
                      },
                    }
                  : {}),
                ...(!accSpecies.highestLife ||
                accSpecies.highestLife.life < curr.life.initial
                  ? {
                      highestLife: { name: curr.name, life: curr.life.initial },
                    }
                  : {}),
              },
            };
          } else return acc;
        },
        {
          "🐸": {
            quantity: 0,
            highestAttack: undefined,
            highestLife: undefined,
          },
          "🦅": {
            quantity: 0,
            highestAttack: undefined,
            highestLife: undefined,
          },
          "🦈": {
            quantity: 0,
            highestAttack: undefined,
            highestLife: undefined,
          },
          "🦂": {
            quantity: 0,
            highestAttack: undefined,
            highestLife: undefined,
          },
          "🐺": {
            quantity: 0,
            highestAttack: undefined,
            highestLife: undefined,
          },
          "🦎": {
            quantity: 0,
            highestAttack: undefined,
            highestLife: undefined,
          },
        }
      );
      responseHandler(
        res,
        err,
        { all: animals.length, ...animalsBySpecies },
        "Error getting all animals statistics"
      );
    });
  }

  static async getNewestAnimals(req: Request, res: Response) {
    AnimalCard.find({})
      .sort("-created_at")
      .limit(3)
      .exec((err: CallbackError, animals: IAnimal[]) => {
        responseHandler(res, err, { animals }, "Error getting newest animals");
      });
  }

  static async getFilteredAnimals(req: Request, res: Response) {
    const { species, owned, skill_type, owned_to_filter } = req.query;
    const parseStringToArray = (string: any): string[] => string.toString().split(";");
    AnimalCard.find({
      ...(owned
        ? { name: { $in: parseStringToArray(owned) } }
        : owned_to_filter
        ? { name: { $nin: parseStringToArray(owned_to_filter) } }
        : {}),
      ...(species ? { species: species.toString() } : {}),
      ...(skill_type ? { "skill.types": skill_type } : {}),
    }).exec((err: CallbackError, animals: IAnimal[]) => {
      responseHandler(res, err, { animals }, "Error getting filtered animals");
    });
  }

  static async getAnimalByName(req: Request, res: Response) {
    const { name } = req.params;
    if (!name) return defaultErrorResponse(res, "No animal received");
    AnimalCard.findOne({
      name: { $regex: name.toString(), $options: "i" },
    }).exec((err: CallbackError, animal: IAnimal | null) => {
      responseHandler(
        res,
        err,
        animal,
        `Error getting requested animal: ${req.query.name}`,
        "Animal does not exist"
      );
    });
  }

  static async createAnimal(req: Request, res: Response) {
    const newCard = new AnimalCard({
      ...req.body,
      created_at: getTimeStamp(),
    });
    newCard.save((err: CallbackError, createdAnimalCard: IAnimal) => {
      responseHandler(res, err, createdAnimalCard, "Error creating new animal card");
    });
  }

  static async createManyAnimals(req: Request, res: Response) {
    const cardsArray = req.body.map((card: IAnimal) => ({
      ...card,
      created_at: getTimeStamp(),
    }));
    AnimalCard.create(cardsArray)
      .then(() => {
        defaultOkResponse(res, `${cardsArray.length} cards created`);
      })
      .catch((err) =>
        log.error("Error creating many animals cards", JSON.stringify(err))
      );
  }
}
