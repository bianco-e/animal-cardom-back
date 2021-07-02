import { Router } from "express";
import { FeedbackControllers } from "../controllers/Feedback.controller";
const router: Router = Router();

router.post("/give", FeedbackControllers.giveFeedback);

export default router;
