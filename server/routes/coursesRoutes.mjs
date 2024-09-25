import express from "express";

import { coursesController } from "../controllers/index.mjs";

const router = express.Router();

router.post("/", coursesController.createCourse);

export default router;
