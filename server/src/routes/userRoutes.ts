import {Router} from "express";
import userController from "../controllers/userController";
import {isLoggedIn} from "../utils/isAuthenticated";
const router = Router();

router.get("/", isLoggedIn, userController.getUser)


export const userRoutes = router;