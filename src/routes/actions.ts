import express, { Router } from "express";
import { TrackingController } from "../controllers/Actions.controller";
const actionsRouter: Router = express.Router();

actionsRouter.post("/create", TrackingController.trackAction);
actionsRouter.get("/all", TrackingController.getAllActionsStats);

export default actionsRouter;
