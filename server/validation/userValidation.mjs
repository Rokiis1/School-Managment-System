import { checkSchema } from "express-validator";

export const userValidationSchema = {
  searchUserByName: checkSchema({
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

  getUserById: checkSchema({
    userId: {
      in: ["params"],
      isInt: {
        errorMessage: "Student ID must be an integer",
      },
    },
  }),
};
