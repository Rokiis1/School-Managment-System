import express from "express";

import { usersController, studentsController } from "../controllers/index.mjs";
import {
  userValidationSchema,
  studentValidationSchema,
} from "../validation/index.mjs";
import { validate } from "../middleware/schemaValidator.mjs";

const router = express.Router();

router.get("/", usersController.getUsers);

router.get(
  "/search",
  validate(userValidationSchema.searchUserByName),
  usersController.getUserByName,
);

router.post("/register", usersController.registerUser);

router.delete(
  "/:userId",
  validate(userValidationSchema.getUserById),
  usersController.deleteStudent,
);

router.post(
  "/:userId/students",
  validate(studentValidationSchema.createStudent),
  studentsController.createStudent,
);

router.get(
  "/:userId/students/:studentId",
  // validate(studentValidationSchema.getStudentById),
  studentsController.getStudentById,
);

router.put(
  "/:userId/students/:studentId",
  // validate(studentValidationSchema.updateStudent),
  studentsController.updateStudent,
);

router.patch(
  "/:userId/students/:studentId",
  // validate(studentValidationSchema.partiallyUpdateStudent),
  studentsController.partiallyUpdateStudent,
);

export default router;
