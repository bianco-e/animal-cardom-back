import { Router } from "express";
import { PlantsController } from "../controllers/Plants.controller";
const router: Router = Router();

router.get("/all", PlantsController.getAllPlants);
router.post("/create", PlantsController.createPlant);
router.post("/create-many", PlantsController.createManyPlants);

export default router;
