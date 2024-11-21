import { Router } from "express";
import { AnimalsController } from "../controllers/Animals.controller";
import { validateAdmin } from "../utils/middlewares";

const animalsRouter: Router = Router();

animalsRouter.get("/", AnimalsController.getAllAnimals);
animalsRouter.get("/stats", AnimalsController.getAllAnimalsStats);
animalsRouter.get("/:id", AnimalsController.getAnimalById);

//ADMIN ROUTES
animalsRouter.use(validateAdmin);
animalsRouter.post("/", AnimalsController.createAnimal);

export default animalsRouter;