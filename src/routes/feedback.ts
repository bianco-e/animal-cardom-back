import { Router } from "express";
import { FeedbackControllers } from "../controllers/Feedback.controller";
const feedbackRouter: Router = Router();

feedbackRouter.post("/give", FeedbackControllers.giveFeedback);

export default feedbackRouter;
