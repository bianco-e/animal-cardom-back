import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IPlant } from "../interfaces";
import PlantCard from "../models/PlantCard";
import { defaultOkResponse } from "../utils/defaultResponses";
const router: Router = express.Router();

router.get("/plants/all", (req: Request, res: Response) => {
  PlantCard.find({}).exec((err: CallbackError, plants: IPlant[]) => {
    if (err) return console.error("Error getting all animals", err);
    defaultOkResponse(res, { plants });
  });
});

router.post("/plants/create", (req: Request, res: Response) => {
  const newPlant = new PlantCard(req.body);
  newPlant.save((err: CallbackError, createdPlantCard: IPlant) => {
    if (err) return console.error("Error creating new plant card", err);
    defaultOkResponse(res, `New card created: ${createdPlantCard}`);
  });
});

router.post("/plants/create-many", (req: Request, res: Response) => {
  const plantsCardsArray = req.body;
  PlantCard.create(plantsCardsArray)
    .then(() => {
      defaultOkResponse(res, `${plantsCardsArray.length} plants created`);
    })
    .catch((err) => console.error("Error creating many plants cards", err));
});

export default router;
