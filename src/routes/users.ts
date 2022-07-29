import { Router } from "express";
import { UsersController } from "../controllers/Users.controller";
import { validateAdmin, validateToken } from "../utils/middlewares";
const userRouter: Router = Router();

userRouter.post("/create", UsersController.createUser);

//TOKEN REQ ROUTES
userRouter.use(validateToken);
userRouter.post("/me", UsersController.getUserMe);
userRouter.post("/profile", UsersController.getUserProfile);
userRouter.post("/animal_purchase", UsersController.purchaseAnimal);
userRouter.post("/hand/update", UsersController.updateUserHand);

//ADMIN ROUTES
userRouter.use(validateAdmin);
userRouter.post("/reset", UsersController.resetUser);
userRouter.post("/owned_cards/add", UsersController.addCardToUserOwnedCards);

export default userRouter;
