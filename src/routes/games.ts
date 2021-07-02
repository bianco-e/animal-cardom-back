import { Router } from "express";
import { GamesController } from "../controllers/Games.controller";

const router: Router = Router();

router.get("/new-random", GamesController.getRandomGame);

router.get("/new-campaign", GamesController.getNewCampaign);

router.post("/save-game", GamesController.saveGame);

router.post("/last-games", GamesController.getLastGames);

export default router;
