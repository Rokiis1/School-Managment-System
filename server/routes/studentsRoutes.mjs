import express from "express";
// import { validationResult, checkSchema } from "express-validator";

import { studentsController } from "../controllers/index.mjs";
import { validate } from "../middleware/schemaValidator.mjs";
import { studentValidationSchema } from "../validation/index.mjs";

const router = express.Router();

// export const validate = (schema) => {
//   return async (req, res, next) => {
//     await Promise.all(schema.map((validation) => validation.run(req)));

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     next();
//   };
// };

// const searchStudents = checkSchema({
//   name: {
//     in: ["query"],
//     isString: {
//       errorMessage: "Name must be a string",
//     },
//     notEmpty: {
//       errorMessage: "Name cannot be empty",
//     },
//   },
// });

// router.get(
//     '/search',
//     [
//
//       check('name').isString().withMessage('Name must be a string'),
//       check('name').notEmpty().withMessage('Name is required'),
//     ],
//     (req, res, next) => {
//
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//     },
//     studentsController.getStudentsByName,
//   );

/**
 * Get all students.
 * @route GET /api/v1/students
 */
router.get("/", studentsController.getStudents);

/**
 * Search students by name.
 * @route GET /api/v1/students/search
 */
router.get(
  "/search",
  validate(studentValidationSchema.searchStudents),
  studentsController.getStudentsByName,
);

/**
 * Get paginated list of students.
 * @route GET /api/v1/students/paginated
 */
router.get(
  "/paginated",
  validate(studentValidationSchema.getPaginatedStudents),
  studentsController.getPaginatedStudents,
);

/**
 * @route GET /students/sorted-by-grade
 * @description Get students sorted by grade from 1 to 10
 */
router.get(
  "/sorted-by-grade",
  validate(studentValidationSchema.getStudentsSortedByGrade),
  studentsController.getStudentsSortedByGrade,
);

/**
 * @route GET /students/filter-by-course
 * @description Get students filtered by course
 */
router.get(
  "/filter-by-course",
  validate(studentValidationSchema.getFilteredStudentsByCourse),
  studentsController.getFilteredStudentsByCourse,
);

/**
 * Retrieve a student by ID.
 * @route GET /api/v1/students/:id
 */
router.get(
  "/:id",
  validate(studentValidationSchema.getStudentById),
  studentsController.getStudentById,
);

/**
 * Add a new student.
 * @route POST /api/v1/students
 */
router.post(
  "/",
  validate(studentValidationSchema.addStudent),
  studentsController.addStudent,
);

/**
 * Update a student by ID.
 * @route PUT /api/v1/students/:id
 */
router.put(
  "/:id",
  validate(studentValidationSchema.updateStudent),
  studentsController.updateStudent,
);

/**
 * Partially update a student by ID.
 * @route PATCH /api/v1/students/:id
 */
router.patch(
  "/:id",
  validate(studentValidationSchema.partiallyUpdateStudent),
  studentsController.partiallyUpdateStudent,
);

/**
 * Delete a student by ID.
 * @route DELETE /api/v1/students/:id
 */
router.delete(
  "/:id",
  validate(studentValidationSchema.getStudentById),
  studentsController.deleteStudent,
);

export default router;
