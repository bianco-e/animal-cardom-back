import express, { Router } from "express";
import { TrackingController } from "../controllers/Tracking.controller";
const router: Router = express.Router();

router.get("/all_actions_stats", TrackingController.getAllActionsStats);
router.post("/track_action", TrackingController.trackAction);

export default router;
