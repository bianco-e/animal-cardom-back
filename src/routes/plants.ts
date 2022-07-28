import { Router } from "express";
import { PlantsController } from "../controllers/Plants.controller";
import { validateAdmin } from "../utils/middlewares";
const plantsRouter: Router = Router();

plantsRouter.get("/all", PlantsController.getAllPlants);

//ADMIN ROUTES
plantsRouter.use(validateAdmin);
plantsRouter.post("/create", PlantsController.createPlant);
plantsRouter.post("/create-many", PlantsController.createManyPlants);

export default plantsRouter;
