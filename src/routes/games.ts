import { Router } from "express";
import { GamesController } from "../controllers/Games.controller";

const gamesRouter: Router = Router();

gamesRouter.get("/", GamesController.random);
gamesRouter.get("/:user_id", GamesController.getGamesHistory);
gamesRouter.post("/campaign", GamesController.campaign);
gamesRouter.post("/save", GamesController.saveGame);

export default gamesRouter;