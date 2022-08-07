import { Router } from "express";
import { AnimalsController } from "../controllers/Animals.controller";
import { validateAdmin } from "../utils/middlewares";
const animalsRouter: Router = Router();

animalsRouter.get("/all", AnimalsController.getAllAnimals);
animalsRouter.get("/name/:name", AnimalsController.getAnimalByName);
animalsRouter.get("/all/statistics", AnimalsController.getAllAnimalsStatistics);
animalsRouter.get("/newest", AnimalsController.getNewestAnimals);
animalsRouter.get("/filter", AnimalsController.getFilteredAnimals);

//ADMIN ROUTES
animalsRouter.use(validateAdmin);
animalsRouter.post("/create", AnimalsController.createAnimal);
animalsRouter.post("/create-many", AnimalsController.createManyAnimals);
//animalsRouter.post("/update-many", AnimalsController.updateManyAnimals);

export default animalsRouter;
