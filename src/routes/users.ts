import { Router } from "express";
import { UsersController } from "../controllers/Users.controller";
const router: Router = Router();

router.post("/create", UsersController.createUser);
router.post("/me", UsersController.getUserMe);
router.post("/profile", UsersController.getUserProfile);
router.post("/hand/update", UsersController.updateUserHand);
router.post("/owned_cards/add", UsersController.addCardToUserOwnedCards);
router.post("/animal_purchase", UsersController.purchaseAnimal);

export default router;
