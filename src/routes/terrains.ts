import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { ITerrain } from "../interfaces";
const router: Router = express.Router();
import Terrain from "../models/Terrain";
import { defaultOkResponse } from "../utils/defaultResponses";

router.get("/terrains/all", (req: Request, res: Response) => {
  Terrain.find({}).exec((err, docs) => {
    if (err) return console.error("Error getting all terrains", err);
    defaultOkResponse(res, { terrains: docs });
  });
});

router.get("/terrains/new", (req: Request, res: Response) => {
  const { name } = req.query;
  if (name) {
    const parsedName = name.toString();
    Terrain.findOne({ name: { $regex: parsedName, $options: "i" } }).exec(
      (err: CallbackError, terrain: ITerrain | null) => {
        if (err || !terrain)
          return console.error(`Error getting ${req.query.name} terrain`, err);
        defaultOkResponse(res, terrain);
      }
    );
  } else {
    Terrain.aggregate([{ $sample: { size: 1 } }]).exec(
      (err: CallbackError, terrain: ITerrain[]) => {
        if (err) return console.error("Error getting random terrain", err);
        defaultOkResponse(res, terrain[0]);
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
