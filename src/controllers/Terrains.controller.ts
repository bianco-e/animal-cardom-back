import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { ITerrain } from "../interfaces";
import Terrain from "../models/Terrain";
import { defaultOkResponse, responseHandler } from "../utils/defaultResponses";
import log from "../utils/logger";

export class TerrainsController {
  static async getAllTerrains(req: Request, res: Response) {
    Terrain.find({})
      .sort({ campaign_xp: "asc" })
      .exec((err: CallbackError, terrains: ITerrain[]) => {
        responseHandler(res, err, { terrains }, "Error getting all terrains");
      });
  }

  static async getNewTerrain(req: Request, res: Response) {
    const { name, xp } = req.query;
    if (!name && !xp)
      return Terrain.aggregate([{ $sample: { size: 1 } }]).exec(
        (randomErr: CallbackError, randomTerrainArray: ITerrain[]) => {
          responseHandler(
            res,
            randomErr,
            randomTerrainArray[0],
            `Error getting random terrain`
          );
        }
      );
    if (name) {
      const parsedName = name.toString();
      return Terrain.findOne({
        name: { $regex: parsedName, $options: "i" },
      }).exec((byNameErr: CallbackError, terrain: ITerrain | null) => {
        responseHandler(
          res,
          byNameErr,
          terrain,
          `Error getting ${req.query.name} terrain`,
          "Terrain does not match the name"
        );
      });
    }
    if (xp) {
      const parsedXp: number = parseInt(xp.toString());
      return Terrain.findOne({
        campaign_xp: { $in: parsedXp },
      }).exec((byNameErr: CallbackError, terrain: ITerrain | null) => {
        responseHandler(
          res,
          byNameErr,
          terrain,
          `Error getting ${req.query.name} terrain`,
          "Terrain does not match that xp"
        );
      });
    }
  }

  static async createManyTerrains(req: Request, res: Response) {
    const terrainsArray = req.body;
    Terrain.create(terrainsArray)
      .then(() => {
        defaultOkResponse(res, `${terrainsArray.length} terrains created`);
      })
      .catch((err) => log.error("Error creating many terrains", JSON.stringify(err)));
  }
}
