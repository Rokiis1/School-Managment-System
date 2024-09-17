import { instructorsModel } from "../models/index.mjs";

const instructorsController = {
  createInstructor: async (req, res) => {
    const instructorData = req.body;
    try {
      const newInstructor =
        await instructorsModel.createInstructor(instructorData);
      res.status(201).json({
        status: "success",
        message: "Instructor created successfully",
        data: newInstructor,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },
};

export default instructorsController;
