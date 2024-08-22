import express from "express";

import studentsRoutes from "./studentsRoutes.mjs";

const router = express.Router();

router.use("/students", studentsRoutes);

export default router;
