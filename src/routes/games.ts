import { Router } from "express";
import { GamesController } from "../controllers/Games.controller";
import { validateToken } from "../utils/middlewares";

const gamesRouter: Router = Router();

gamesRouter.get("/new-random", GamesController.getRandomGame);

//TOKEN REQ ROUTES
gamesRouter.use(validateToken);
gamesRouter.post("/new-campaign", GamesController.getNewCampaign);
gamesRouter.post("/save-game", GamesController.saveGame);
gamesRouter.post("/last-games", GamesController.getLastGames);

export default gamesRouter;
