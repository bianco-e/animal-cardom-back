import { Router } from "express";
import { HabitatsController } from "../controllers/Habitats.controller";
import { validateAdmin } from "../utils/middlewares";
const habitatsRouter: Router = Router();

habitatsRouter.get("/", HabitatsController.getAllHabitats);
habitatsRouter.get("/:id", HabitatsController.getHabitatById);

//ADMIN ROUTES
habitatsRouter.use(validateAdmin);
habitatsRouter.post("/", HabitatsController.createHabitat);

export default habitatsRouter;