import express from "express";

import { instructorsController } from "../controllers/index.mjs";

const router = express.Router();

router.post("/", instructorsController.createInstructor);

export default router;
