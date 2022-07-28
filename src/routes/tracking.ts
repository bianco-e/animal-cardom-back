import express, { Router } from "express";
import { TrackingController } from "../controllers/Tracking.controller";
const trackingRouter: Router = express.Router();

trackingRouter.post("/track_action", TrackingController.trackAction);
trackingRouter.get("/all_actions_stats", TrackingController.getAllActionsStats);

export default trackingRouter;
