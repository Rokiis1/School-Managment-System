import express from "express";

import studentsRoutes from "./studentsRoutes.mjs";
import usersRoutes from "./usersRoutes.mjs";
import instructorsRoutes from "./instructorsRoutes.mjs";
import departmentsRoutes from "./departamentsRoutes.mjs";
import coursesRoutes from "./coursesRoutes.mjs";
import enrollmentsRoutes from "./enrollmentsRoutes.mjs";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/students", studentsRoutes);
router.use("/instructors", instructorsRoutes);
router.use("/departments", departmentsRoutes);
router.use("/courses", coursesRoutes);
router.use("/enrollments", enrollmentsRoutes);

export default router;
