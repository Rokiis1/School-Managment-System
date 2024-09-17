import { departmentsModel, instructorsModel } from "../models/index.mjs";

const departamentsController = {
  createDepartment: async (req, res) => {
    try {
      const { departmentName, departmentHead } = req.body;

      const instructor =
        await instructorsModel.getInstructorById(departmentHead);

      if (!instructor) {
        return res.status(400).json({
          status: "error",
          message: "Instructor not found",
        });
      }

      const newDepartment = await departmentsModel.createDepartment({
        departmentName,
        departmentHead,
      });
      res.status(201).json({
        status: "success",
        message: "Department added successfully",
        data: newDepartment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default departamentsController;
