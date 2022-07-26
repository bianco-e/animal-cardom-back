import { Router } from "express";
import { AnimalsController } from "../controllers/Animals.controller";
const router: Router = Router();

router.get("/all", AnimalsController.getAllAnimals);
router.get("/:name", AnimalsController.getAnimalByName);
router.get("/all/statistics", AnimalsController.getAllAnimalsStatistics);
router.get("/newest", AnimalsController.getNewestAnimals);
router.get("/filter", AnimalsController.getFilteredAnimals);
router.post("/create", AnimalsController.createAnimal);
router.post("/create-many", AnimalsController.createManyAnimals);

export default router;
