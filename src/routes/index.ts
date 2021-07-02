import animalsRoutes from "./animals";
import feedbackRoutes from "./feedback";
import gamesRoutes from "./games";
import plantsRoutes from "./plants";
import terrainsRoutes from "./terrains";
import trackingRoutes from "./tracking";
import usersRoutes from "./users";
import { Router } from "express";

const router: Router = Router();
router.use("/games", gamesRoutes);
router.use("/plants", plantsRoutes);
router.use("/animals", animalsRoutes);
router.use("/terrains", terrainsRoutes);
router.use("/tracking", trackingRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/users", usersRoutes);

export default router;
