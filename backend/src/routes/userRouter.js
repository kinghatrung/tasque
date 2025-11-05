import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/me", userController.authMe);

export default router;
