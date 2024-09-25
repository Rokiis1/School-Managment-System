import { usersModel } from "../models/index.mjs";

const usersController = {
  getUsers: async (req, res) => {
    try {
      const users = await usersModel.getUsers();

      res.status(200).json({
        status: "success",
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  getUserByName: async (req, res) => {
    const { name } = req.query;
    try {
      const user = await usersModel.getUserByName(name);

      res.status(200).json({
        status: "success",
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  registerUser: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const registeredUser = await usersModel.registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: registeredUser,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error registering user",
        error: error.message,
      });
    }
  },

  deleteStudent: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await usersModel.deleteUser(userId);

      if (deletedUser === -1) {
        return res.status(404).json({
          status: "error",
          message: "Student not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Student deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },
};

export default usersController;
