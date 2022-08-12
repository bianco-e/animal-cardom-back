import actionsRoutes from "./actions";
import animalsRoutes from "./animals";
import feedbackRoutes from "./feedback";
import gamesRoutes from "./games";
import plantsRoutes from "./plants";
import terrainsRoutes from "./terrains";
import usersRoutes from "./users";
import authRoutes from "./auth";
import { Router } from "express";

const router: Router = Router();
router.use("/animals", animalsRoutes);
router.use("/auth", authRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/games", gamesRoutes);
router.use("/plants", plantsRoutes);
router.use("/terrains", terrainsRoutes);
router.use("/actions", actionsRoutes);
router.use("/users", usersRoutes);

export default router;
