import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IPlant } from "../interfaces";
import PlantCard from "../models/PlantCard";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
import log from "../utils/logger";

export class PlantsController {
  static async getAllPlants(req: Request, res: Response) {
    PlantCard.find({}).exec((err: CallbackError, plants: IPlant[]) => {
      responseHandler(res, err, { plants }, "Error getting all plants");
    });
  }

  static async createPlant(req: Request, res: Response) {
    const newPlant = new PlantCard(req.body);
    newPlant.save((err: CallbackError, createdPlantCard: IPlant) => {
      responseHandler(
        res,
        err,
        createdPlantCard,
        "Error creating new plant card"
      );
    });
  }

  static async createManyPlants(req: Request, res: Response) {
    const plantsCardsArray = req.body;
    PlantCard.create(plantsCardsArray)
      .then(() => {
        defaultOkResponse(res, `${plantsCardsArray.length} plants created`);
      })
      .catch((err) =>
        log.error("Error creating many plants cards", JSON.stringify(err))
      );
  }
}
