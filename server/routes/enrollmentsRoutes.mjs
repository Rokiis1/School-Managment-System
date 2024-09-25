import express from "express";
import { enrollmentsController } from "../controllers/index.mjs";

const router = express.Router();

router.post("/", enrollmentsController.createEnrollment);

export default router;
