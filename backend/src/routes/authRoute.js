import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.delete("/signout", authController.signOut);

export default router;
