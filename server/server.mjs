import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const studentsFilePath = path.join(__dirname, "data/students.json");
let students = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));

const app = express();
const PORT = 3000;
const BASE_PATH = "/api/v1";

app.use(express.json());

/**
 * Health check endpoint.
 * @route GET /api/v1/health
 * @returns {Object} 200 - Server health status
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/health`, (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Server is healthy",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Internal Server Error, ${error}`,
    });
  }
});

/**
 * Get all students.
 * @route GET /api/v1/students
 * @returns {Object} 200 - List of students
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/students`, (req, res) => {
  try {
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
});

/**
 * Search students by name.
 * @route GET /api/v1/students/search
 * @param {string} req.query.name - Name to search for
 * @returns {Object} 200 - List of students matching the search criteria
 * @returns {Object} 400 - Name query parameter is required
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/students/search`, (req, res) => {
  try {
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
});

/**
 * Get paginated list of students.
 * @route GET /api/v1/students/paginated
 * @param {number} [req.query.page=1] - Page number
 * @param {number} [req.query.limit=10] - Number of students per page
 * @returns {Object} 200 - Paginated list of students
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/students/paginated`, (req, res) => {
  try {
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
      links.push(`<${baseUrl}?page=${totalPages}&limit=${limit}>; rel="last"`);
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
});

/**
 * @route GET /students/sorted-by-grade
 * @description Get students sorted by grade from 1 to 10
 * @param {string} [req.query.sortOrder=asc] - Sort order, either 'asc' or 'desc'
 * @returns {Object} 200 - An array of students sorted by grade
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/students/sorted-by-grade`, (req, res) => {
  try {
    const { sortOrder = "asc" } = req.query;

    if (!["asc", "desc"].includes(sortOrder)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid sortOrder query parameter. Must be 'asc' or 'desc'.",
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
});

/**
 * @route GET /students/filter-by-course
 * @description Get students filtered by course
 * @param {string} req.query.course - Course name to filter by
 * @returns {Object} 200 - An array of students filtered by course
 * @returns {Object} 400 - Course query parameter is required
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/students/filter-by-course`, (req, res) => {
  try {
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
});

/**
 * Retrieve a student by ID.
 * @route GET /api/v1/students/:id
 * @returns {Object} 200 - Student retrieved successfully
 * @returns {Object} 404 - Student not found
 * @returns {Object} 500 - Internal Server Error
 */
app.get(`${BASE_PATH}/students/:id`, (req, res) => {
  try {
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
});

/**
 * Add a new student.
 * @route POST /api/v1/students
 * @param {Object} req.body - Body of the request
 * @returns {Object} 201 - Student added successfully
 * @returns {Object} 500 - Internal Server Error
 */
app.post(`${BASE_PATH}/students`, async (req, res) => {
  try {
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
});

/**
 * Update a student by ID.
 * @route PUT /api/v1/students/:id
 * @param {Object} req.body - Body of the request
 * @returns {Object} 200 - Student updated successfully
 * @returns {Object} 400 - All fields are required
 * @returns {Object} 404 - Student not found
 * @returns {Object} 500 - Internal Server Error
 */
app.put(`${BASE_PATH}/students/:id`, async (req, res) => {
  try {
    const updateStudent = students.find(
      (student) => student.id === parseInt(req.params.id),
    );

    if (!updateStudent) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }

    const { name, age, grade, email, address, phone, enrollmentDate, courses } =
      req.body;

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
});

/**
 * Partially update a student by ID.
 * @route PATCH /api/v1/students/:id
 * @param {Object} req.body - Body of the request
 * @returns {Object} 200 - Student updated successfully
 * @returns {Object} 404 - Student not found
 * @returns {Object} 500 - Internal Server Error
 */
app.patch(`${BASE_PATH}/students/:id`, async (req, res) => {
  try {
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
});

/**
 * Delete a student by ID.
 * @route DELETE /api/v1/students/:id
 * @returns {Object} 200 - Student deleted successfully
 * @returns {Object} 404 - Student not found
 * @returns {Object} 500 - Internal Server Error
 */
app.delete(`${BASE_PATH}/students/:id`, async (req, res) => {
  try {
    const deleteStudent = students.findIndex(
      (student) => student.id === parseInt(req.params.id),
    );

    if (deleteStudent === -1) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }

    students.splice(deleteStudent, 1);

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
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
