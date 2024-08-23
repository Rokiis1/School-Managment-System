import { checkSchema } from "express-validator";

// const studentValidationRules = {
//   addStudent: [
//     body("name").notEmpty().withMessage("Name is required"),
//     body("age").isInt({ min: 1 }).withMessage("Age must be a positive integer"),
//     // other validation rules...
//   ],
//   // other validation schemas...
// };

// export const studentRegistrationValidationSchema = checkSchema({});
// export const loginValidationSchema = checkSchema({});

export const studentValidationSchema = {
  addStudent: checkSchema({
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
    },
    age: {
      isInt: {
        options: { min: 1 },
        errorMessage: "Age must be a positive integer",
      },
      notEmpty: {
        errorMessage: "Age is required",
      },
    },
    grade: {
      isFloat: {
        options: { min: 0 },
        errorMessage: "Grade must be a positive number",
      },
      notEmpty: {
        errorMessage: "Grade is required",
      },
    },
    email: {
      isEmail: {
        errorMessage: "Valid email is required",
      },
      notEmpty: {
        errorMessage: "Email is required",
      },
    },
    address: {
      notEmpty: {
        errorMessage: "Address is required",
      },
    },
    phone: {
      notEmpty: {
        errorMessage: "Phone number is required",
      },
    },
    enrollmentDate: {
      isISO8601: {
        errorMessage: "Valid enrollment date is required",
      },
      notEmpty: {
        errorMessage: "Enrollment date is required",
      },
    },
    courses: {
      isArray: {
        errorMessage: "Courses must be an array",
      },
      notEmpty: {
        errorMessage: "Courses are required",
      },
    },
  }),
  updateStudent: checkSchema({
    id: {
      in: ["params"],
      isInt: {
        errorMessage: "Student ID must be an integer",
      },
    },
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
    },
    age: {
      isInt: {
        options: { min: 1 },
        errorMessage: "Age must be a positive integer",
      },
      notEmpty: {
        errorMessage: "Age is required",
      },
    },
    grade: {
      isFloat: {
        options: { min: 0 },
        errorMessage: "Grade must be a positive number",
      },
      notEmpty: {
        errorMessage: "Grade is required",
      },
    },
    email: {
      isEmail: {
        errorMessage: "Valid email is required",
      },
      notEmpty: {
        errorMessage: "Email is required",
      },
    },
    address: {
      notEmpty: {
        errorMessage: "Address is required",
      },
    },
    phone: {
      notEmpty: {
        errorMessage: "Phone number is required",
      },
    },
    enrollmentDate: {
      isISO8601: {
        errorMessage: "Valid enrollment date is required",
      },
      notEmpty: {
        errorMessage: "Enrollment date is required",
      },
    },
    courses: {
      isArray: {
        errorMessage: "Courses must be an array",
      },
      notEmpty: {
        errorMessage: "Courses are required",
      },
    },
  }),
  partiallyUpdateStudent: checkSchema({
    firstName: {
      in: ["body"],
      optional: true,
      isString: {
        errorMessage: "First name must be a string",
      },
      notEmpty: {
        errorMessage: "First name cannot be empty",
      },
    },
    lastName: {
      in: ["body"],
      optional: true,
      isString: {
        errorMessage: "Last name must be a string",
      },
      notEmpty: {
        errorMessage: "Last name cannot be empty",
      },
    },
    dateOfBirth: {
      in: ["body"],
      optional: true,
      isDate: {
        errorMessage: "Date of birth must be a valid date",
      },
    },
    email: {
      in: ["body"],
      optional: true,
      isEmail: {
        errorMessage: "Email must be a valid email address",
      },
    },
    phoneNumber: {
      in: ["body"],
      optional: true,
      isMobilePhone: {
        errorMessage: "Phone number must be a valid phone number",
      },
    },
    address: {
      in: ["body"],
      optional: true,
      isString: {
        errorMessage: "Address must be a string",
      },
      notEmpty: {
        errorMessage: "Address cannot be empty",
      },
    },
  }),
  getStudentById: checkSchema({
    id: {
      in: ["params"],
      isInt: {
        errorMessage: "Student ID must be an integer",
      },
    },
  }),
  searchStudents: checkSchema({
    name: {
      in: ["query"],
      isString: {
        errorMessage: "Name must be a string",
      },
      notEmpty: {
        errorMessage: "Name cannot be empty",
      },
    },
  }),
  getStudentsSortedByGrade: checkSchema({
    sortOrder: {
      in: ["query"],
      optional: true,
      isIn: {
        options: [["asc", "desc"]],
        errorMessage: "Sort order must be either asc or desc",
      },
    },
  }),
  getFilteredStudentsByCourse: checkSchema({
    course: {
      in: ["query"],
      notEmpty: {
        errorMessage: "Course query parameter is required",
      },
    },
  }),
  getPaginatedStudents: checkSchema({
    page: {
      in: ["query"],
      isInt: {
        options: { min: 1 },
        errorMessage: "Page must be an integer greater than 0",
      },
      toInt: true,
    },
    limit: {
      in: ["query"],
      isInt: {
        options: { min: 1 },
        errorMessage: "Limit must be an integer greater than 0",
      },
      toInt: true,
    },
  }),
};
