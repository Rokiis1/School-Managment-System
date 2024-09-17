import { coursesModel, departmentsModel } from "../models/index.mjs";

const coursesController = {
  getCoursesByDepartmentId: async (req, res) => {
    try {
      const { departmentId } = req.params;

      const courses = await coursesModel.getCoursesByDepartmentId(departmentId);
      if (courses.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No courses found for the specified department",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Courses retrieved successfully",
        data: courses,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  createCourse: async (req, res) => {
    try {
      const { courseName, courseDescription, credits, departmentId } = req.body;

      const department = await departmentsModel.getDepartmentById(departmentId);
      if (!department) {
        return res.status(400).json({
          status: "error",
          message: "Department not found",
        });
      }

      const newCourse = await coursesModel.createCourse({
        courseName,
        courseDescription,
        credits,
        departmentId,
      });
      res.status(201).json({
        status: "success",
        message: "Course added successfully",
        data: newCourse,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default coursesController;
