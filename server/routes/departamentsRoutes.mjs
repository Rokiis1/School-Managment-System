import express from "express";

import {
  departamentsController,
  coursesController,
} from "../controllers/index.mjs";

const router = express.Router();

router.post("/", departamentsController.createDepartment);

router.get(
  "/:departmentId/courses",
  coursesController.getCoursesByDepartmentId,
);

export default router;
