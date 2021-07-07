import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IAnimal } from "../interfaces";
import AnimalCard from "../models/AnimalCard";
import { getTimeStamp } from "../utils";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
import log from "../utils/logger";

export class AnimalsController {
  static async getAllAnimals(req: Request, res: Response) {
    AnimalCard.find({}).exec((err: CallbackError, animals: IAnimal[]) => {
      responseHandler(res, err, { animals }, "Error getting all animals");
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
    const parseStringToArray = (string: any): string[] =>
      string.toString().split(";");
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

  static async createAnimal(req: Request, res: Response) {
    const newCard = new AnimalCard({
      ...req.body,
      created_at: getTimeStamp(),
    });
    newCard.save((err: CallbackError, createdAnimalCard: IAnimal) => {
      responseHandler(
        res,
        err,
        createdAnimalCard,
        "Error creating new animal card"
      );
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
