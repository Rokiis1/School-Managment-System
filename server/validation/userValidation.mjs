import { checkSchema } from "express-validator";
import { userModel } from "../models/userModel.js";

export const userValidationSchema = {
  userValidationSchema: checkSchema({
    first_name: {
      isLength: {
        options: { max: 50 },
        errorMessage: "First name must be at most 50 characters",
      },
      notEmpty: {
        errorMessage: "First name cannot be empty",
      },
      isString: {
        errorMessage: "First name must be a string",
      },
    },
    last_name: {
      isLength: {
        options: { max: 50 },
        errorMessage: "Last name must be at most 50 characters",
      },
      notEmpty: {
        errorMessage: "Last name cannot be empty",
      },
      isString: {
        errorMessage: "Last name must be a string",
      },
    },
    email: {
      isEmail: {
        errorMessage: "Email must be valid",
      },
      isLength: {
        options: { max: 100 },
        errorMessage: "Email must be at most 100 characters",
      },
      notEmpty: {
        errorMessage: "Email cannot be empty",
      },
      custom: {
        options: async (value) => {
          const existingUser = await userModel.getUserByEmail({ email: value });
          if (existingUser) {
            throw new Error("Email already exists.");
          }
        },
      },
    },
  }),

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
