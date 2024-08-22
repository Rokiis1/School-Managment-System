import express from "express";

import { studentsController } from "../controllers/index.mjs";
// import studentsClassController from "../controllers/studentsClassBasedControllers.mjs";
// import { getStudents } from "../controllers/studentsFunctionBasedController.mjs";

const router = express.Router();

/**
 * Get all students.
 * @route GET /api/v1/students
 */
// router.get("/", getStudents);
// router.get("/", studentsClassController.getStudents);
router.get("/", studentsController.getStudents);

/**
 * Search students by name.
 * @route GET /api/v1/students/search
 */
router.get("/search", studentsController.getStudentsByName);

/**
 * Get paginated list of students.
 * @route GET /api/v1/students/paginated
 */
router.get("/paginated", studentsController.getPaginatedStudents);

/**
 * @route GET /students/sorted-by-grade
 * @description Get students sorted by grade from 1 to 10
 */
router.get("/sorted-by-grade", studentsController.getStudentsSortedByGrade);

/**
 * @route GET /students/filter-by-course
 * @description Get students filtered by course
 */
router.get("/filter-by-course", studentsController.getFilteredStudentsByCourse);

/**
 * Retrieve a student by ID.
 * @route GET /api/v1/students/:id
 */
router.get("/:id", studentsController.getStudentById);

/**
 * Add a new student.
 * @route POST /api/v1/students
 */
router.post("/", studentsController.addStudent);

/**
 * Update a student by ID.
 * @route PUT /api/v1/students/:id
 */
router.put("/:id", studentsController.updateStudent);

/**
 * Partially update a student by ID.
 * @route PATCH /api/v1/students/:id
 */
router.patch("/:id", studentsController.partiallyUpdateStudent);

/**
 * Delete a student by ID.
 * @route DELETE /api/v1/students/:id
 */
router.delete("/:id", studentsController.deleteStudent);

export default router;
