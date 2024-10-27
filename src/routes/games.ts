import { Router } from "express";
import { GamesController } from "../controllers/Games.controller";

const gamesRouter: Router = Router();

gamesRouter.get("/", GamesController.random);

export default gamesRouter;