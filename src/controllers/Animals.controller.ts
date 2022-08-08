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

const getAnimalsBy = (animals: IAnimal[], by: "habitat" | "species") => {
  return animals.reduce(
    (
      acc: {
        [x: string]: {
          count: number;
          highest_attack?: { name: string; attack: number };
          highest_life?: { name: string; life: number };
        };
      },
      currentAnimal: IAnimal
    ) => {
      const currElement = acc[currentAnimal[by]];
      const addHighestAttack =
        !currElement ||
        !currElement.highest_attack ||
        currElement.highest_attack.attack < currentAnimal.attack.initial;
      const addHighestLife =
        !currElement ||
        !currElement.highest_life ||
        currElement.highest_life.life < currentAnimal.life.initial;

      return {
        ...acc,
        [currentAnimal[by]]: {
          ...currElement,
          count: (currElement ? currElement.count : 0) + 1,
          ...(addHighestAttack
            ? {
                highest_attack: {
                  name: currentAnimal.name,
                  attack: currentAnimal.attack.initial,
                },
              }
            : {}),
          ...(addHighestLife
            ? {
                highest_life: { name: currentAnimal.name, life: currentAnimal.life.initial },
              }
            : {}),
        },
      };
    },
    {}
  );
};

export class AnimalsController {
  static async getAllAnimals(req: Request, res: Response) {
    AnimalCard.find({}).exec((err: CallbackError, animals: IAnimal[]) => {
      responseHandler(res, err, { animals }, "Error getting all animals");
    });
  }

  static async getAllAnimalsStatistics(req: Request, res: Response) {
    AnimalCard.find({}).exec((err: CallbackError, animals: IAnimal[]) => {
      const animalsBySpecies = getAnimalsBy(animals, "species");
      const animalsByHabitat = getAnimalsBy(animals, "habitat");
      responseHandler(
        res,
        err,
        { count: animals.length, species: animalsBySpecies, habitat: animalsByHabitat },
        "Error getting animals statistics"
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
      sell_price: Math.ceil(req.body.price / 2),
      created_at: getTimeStamp(),
    });
    newCard.save((err: CallbackError, createdAnimalCard: IAnimal) => {
      responseHandler(res, err, createdAnimalCard, "Error creating new animal card");
    });
  }

  static async createManyAnimals(req: Request, res: Response) {
    const cardsArray = req.body.map((card: IAnimal) => ({
      ...card,
      sell_price: Math.ceil(req.body.price / 2),
      created_at: getTimeStamp(),
    }));
    AnimalCard.create(cardsArray)
      .then(() => {
        defaultOkResponse(res, `${cardsArray.length} cards created`);
      })
      .catch((err) => log.error("Error creating many animals cards", JSON.stringify(err)));
  }

  /*   static async updateManyAnimals(req: Request, res: Response) {
    const animals = await AnimalCard.find({}).select(["name", "price"]);
    if (!animals) return;
    await AnimalCard.bulkWrite(
      animals.map((a) => {
        return {
          updateOne: {
            filter: { name: a.name },
            update: { $set: { sell_price: Math.ceil(a.price / 2) || 0 } },
            options: { multi: true },
          },
        };
      })
    );
    res.status(200).send("OK");
  } */
}
