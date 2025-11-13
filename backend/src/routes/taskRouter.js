import { Router } from "express";

import taskController from "../controllers/taskController.js";

const router = Router();

router.get("/", taskController.getTasks);
router.post("/task", taskController.createTask);

export default router;
