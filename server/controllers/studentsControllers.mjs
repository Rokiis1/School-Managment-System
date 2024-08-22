import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const studentsFilePath = path.join(__dirname, "../models/students.json");

/**
 * Controller for handling student-related operations.
 * @namespace studentsController
 */
const studentsController = {
  /**
   * Retrieves all students from the JSON file and sends them in the response.
   */
  getStudents: (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      res.status(200).json({
        status: "success",
        message: "Students retrieved successfully",
        data: students,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Retrieves students by name from the JSON file and sends them in the response.
   */
  getStudentsByName: (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const { name } = req.query;

      if (!name) {
        return res.status(400).json({
          status: "error",
          message: "Name query parameter is required",
        });
      }

      const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(name.toLowerCase()),
      );

      res.status(200).json({
        status: "success",
        message: "Students retrieved successfully",
        data: filteredStudents,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Retrieves paginated students from the JSON file and sends them in the response.
   */
  getPaginatedStudents: (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      let { page, limit } = req.query;

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedStudents = students.slice(startIndex, endIndex);

      const totalPages = Math.ceil(students.length / limit);

      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
      const links = [];

      if (page > 1) {
        links.push(`<${baseUrl}?page=1&limit=${limit}>; rel="first"`);
        links.push(`<${baseUrl}?page=${page - 1}&limit=${limit}>; rel="prev"`);
      }
      if (page < totalPages) {
        links.push(`<${baseUrl}?page=${page + 1}&limit=${limit}>; rel="next"`);
        links.push(
          `<${baseUrl}?page=${totalPages}&limit=${limit}>; rel="last"`,
        );
      }

      res.set("Link", links.join(", "));

      res.status(200).json({
        status: "success",
        message: "Students retrieved successfully",
        data: paginatedStudents,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(students.length / limit),
          totalStudents: students.length,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Retrieves students sorted by grade from the JSON file and sends them in the response.
   */
  getStudentsSortedByGrade: (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const { sortOrder = "asc" } = req.query;

      if (!["asc", "desc"].includes(sortOrder)) {
        return res.status(400).json({
          status: "error",
          message:
            "Invalid sortOrder query parameter. Must be 'asc' or 'desc'.",
        });
      }

      const sortedStudents = students.sort((a, b) => {
        return sortOrder === "asc" ? a.grade - b.grade : b.grade - a.grade;
      });

      res.status(200).json({
        status: "success",
        message: "Students sorted by grade successfully",
        data: sortedStudents,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Retrieves students filtered by course from the JSON file and sends them in the response.
   */
  getFilteredStudentsByCourse: (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const { course } = req.query;

      if (!course) {
        return res.status(400).json({
          status: "error",
          message: "Course query parameter is required",
        });
      }

      const filteredStudents = students.filter((student) =>
        student.courses.includes(course),
      );

      res.status(200).json({
        status: "success",
        message: "Students filtered by course successfully",
        data: filteredStudents,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Retrieves a student by ID from the JSON file and sends it in the response.
   */
  getStudentById: (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const getStudent = students.find(
        (student) => student.id === parseInt(req.params.id),
      );

      if (!getStudent) {
        return res.status(404).json({
          status: "error",
          message: "Student not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Student retrieved successfully",
        data: getStudent,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Adds a new student to the JSON file.
   */
  addStudent: async (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        enrollmentDate: req.body.enrollmentDate,
        courses: req.body.courses || [],
      };

      students.push(newStudent);

      await fs.promises.writeFile(
        studentsFilePath,
        JSON.stringify(students, null, 2),
      );

      res.status(201).json({
        status: "success",
        message: "Student added successfully",
        data: newStudent,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Updates a student by ID in the JSON file.
   */
  updateStudent: async (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const updateStudent = students.find(
        (student) => student.id === parseInt(req.params.id),
      );

      if (!updateStudent) {
        return res.status(404).json({
          status: "error",
          message: "Student not found",
        });
      }

      const {
        name,
        age,
        grade,
        email,
        address,
        phone,
        enrollmentDate,
        courses,
      } = req.body;

      if (
        !name ||
        !age ||
        !grade ||
        !email ||
        !address ||
        !phone ||
        !enrollmentDate ||
        !courses
      ) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required",
        });
      }

      Object.assign(updateStudent, {
        name,
        age,
        grade,
        email,
        address,
        phone,
        enrollmentDate,
        courses,
      });

      await fs.promises.writeFile(
        studentsFilePath,
        JSON.stringify(students, null, 2),
      );

      res.status(200).json({
        status: "success",
        message: "Student updated successfully",
        data: updateStudent,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Partially updates a student by ID in the JSON file.
   */
  partiallyUpdateStudent: async (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const updateSpecificValueStudent = students.find(
        (student) => student.id === parseInt(req.params.id),
      );

      if (!updateSpecificValueStudent) {
        return res.status(404).json({
          status: "error",
          message: "Student not found",
        });
      }

      const updates = req.body;

      for (const key in updates) {
        if (
          Object.prototype.hasOwnProperty.call(updates, key) &&
          Object.prototype.hasOwnProperty.call(updateSpecificValueStudent, key)
        ) {
          updateSpecificValueStudent[key] = updates[key];
        }
      }

      await fs.promises.writeFile(
        studentsFilePath,
        JSON.stringify(students, null, 2),
      );

      res.status(200).json({
        status: "success",
        message: "Student updated successfully",
        data: updateSpecificValueStudent,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error, ${error}`,
      });
    }
  },

  /**
   * Deletes a student by ID from the JSON file.
   */
  deleteStudent: async (req, res) => {
    try {
      const students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
      const deleteStudentIndex = students.findIndex(
        (student) => student.id === parseInt(req.params.id),
      );

      if (deleteStudentIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Student not found",
        });
      }

      students.splice(deleteStudentIndex, 1);

      await fs.promises.writeFile(
        studentsFilePath,
        JSON.stringify(students, null, 2),
      );

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

export default studentsController;
