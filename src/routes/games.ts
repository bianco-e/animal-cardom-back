import { Router } from "express";
import { GamesController } from "../controllers/Games.controller";

const gamesRouter: Router = Router();

gamesRouter.get("/", GamesController.random);
gamesRouter.post("/campaign", GamesController.campaign);

export default gamesRouter;