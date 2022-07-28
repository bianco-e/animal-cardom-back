import { Router } from "express";
import { TerrainsController } from "../controllers/Terrains.controller";
import { validateAdmin } from "../utils/middlewares";
const terrainsRouter: Router = Router();

terrainsRouter.get("/all", TerrainsController.getAllTerrains);
terrainsRouter.get("/new", TerrainsController.getNewTerrain);

//ADMIN ROUTES
terrainsRouter.use(validateAdmin);
terrainsRouter.post("/create-many", TerrainsController.createManyTerrains);

export default terrainsRouter;
