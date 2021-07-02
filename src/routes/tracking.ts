import express, { Router } from "express";
import { TrackingController } from "../controllers/Tracking.controller";
const router: Router = express.Router();

router.post("/track_action", TrackingController.trackAction);

export default router;
