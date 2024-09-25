import {
  enrollmentsModel,
  studentsModel,
  coursesModel,
} from "../models/index.mjs";

const enrollmentsController = {
  createEnrollment: async (req, res) => {
    try {
      const { studentId, courseId, grade } = req.body;

      const student = await studentsModel.getStudentById(studentId);
      if (!student) {
        return res.status(400).json({
          status: "error",
          message: "Student not found",
        });
      }

      const course = await coursesModel.getCourseById(courseId);
      if (!course) {
        return res.status(400).json({
          status: "error",
          message: "Course not found",
        });
      }

      const newEnrollment = await enrollmentsModel.createEnrollment({
        studentId,
        courseId,
        grade,
      });
      res.status(201).json({
        status: "success",
        message: "Enrollment added successfully",
        data: newEnrollment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default enrollmentsController;
