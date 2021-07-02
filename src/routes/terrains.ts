import { Router } from "express";
import { TerrainsController } from "../controllers/Terrains.controller";
const router: Router = Router();

router.get("/all", TerrainsController.getAllTerrains);
router.get("/new", TerrainsController.getNewTerrain);
router.post("/create-many", TerrainsController.createManyTerrains);

export default router;
