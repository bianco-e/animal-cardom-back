import express, { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
const authRouter: Router = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/token", AuthController.checkToken);

export default authRouter;
