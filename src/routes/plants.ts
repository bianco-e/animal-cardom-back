import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IPlant } from "../interfaces";
import PlantCard from "../models/PlantCard";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
const router: Router = express.Router();

router.get("/plants/all", (req: Request, res: Response) => {
  PlantCard.find({}).exec((err: CallbackError, plants: IPlant[]) => {
    responseHandler(res, err, { plants }, "Error getting all plants");
  });
});

router.post("/plants/create", (req: Request, res: Response) => {
  const newPlant = new PlantCard(req.body);
  newPlant.save((err: CallbackError, createdPlantCard: IPlant) => {
    responseHandler(
      res,
      err,
      createdPlantCard,
      "Error creating new plant card"
    );
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
