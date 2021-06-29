import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { ITerrain } from "../interfaces";
const router: Router = express.Router();
import Terrain from "../models/Terrain";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";

router.get("/terrains/all", (req: Request, res: Response) => {
  Terrain.find({}).exec((err: CallbackError, terrains: ITerrain[]) => {
    responseHandler(res, err, { terrains }, "Error getting all terrains");
  });
});

router.get("/terrains/new", (req: Request, res: Response) => {
  const { name } = req.query;
  if (name) {
    const parsedName = name.toString();
    Terrain.findOne({ name: { $regex: parsedName, $options: "i" } }).exec(
      (byNameErr: CallbackError, terrain: ITerrain | null) => {
        responseHandler(
          res,
          byNameErr,
          terrain,
          `Error getting ${req.query.name} terrain`,
          "Terrain does not exist"
        );
      }
    );
  } else {
    Terrain.aggregate([{ $sample: { size: 1 } }]).exec(
      (randomErr: CallbackError, randomTerrain: ITerrain[]) => {
        responseHandler(
          res,
          randomErr,
          randomTerrain,
          `Error getting random terrain`
        );
      }
    );
  }
});

router.post("/terrains/create-many", (req: Request, res: Response) => {
  const terrainsArray = req.body;
  Terrain.create(terrainsArray)
    .then(() => {
      defaultOkResponse(res, `${terrainsArray.length} terrains created`);
    })
    .catch((err) => console.error("Error creating many terrains", err));
});

export default router;
