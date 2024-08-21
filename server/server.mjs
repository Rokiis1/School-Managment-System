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
 */
app.get(`${BASE_PATH}/health`, (req, res) => {
  try {
    // res.json();
    // res.status(200).json();
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
 * Get a student by ID.
 * @route GET /api/v1/students/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} 200 - Student data
 * @returns {Object} 404 - Student not found
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
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} 201 - Student added successfully
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
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} 200 - Student updated successfully
 * @returns {Object} 404 - Student not found
 * @returns {Object} 400 - All fields are required
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

    // updateStudent.name = req.body.name;
    // updateStudent.age = req.body.age;
    // updateStudent.grade = req.body.grade;
    // updateStudent.email = req.body.email;
    // updateStudent.address = req.body.address;
    // updateStudent.phone = req.body.phone;
    // updateStudent.enrollmentDate = req.body.enrollmentDate;
    // updateStudent.courses = req.body.courses;

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
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} 200 - Student updated successfully
 * @returns {Object} 404 - Student not found
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

    // if (req.body.name !== undefined) updateSpecificValueStudent.name = req.body.name;
    // if (req.body.age !== undefined) updateSpecificValueStudent.age = req.body.age;
    // if (req.body.grade !== undefined) updateSpecificValueStudent.grade = req.body.grade;
    // if (req.body.email !== undefined) updateSpecificValueStudent.email = req.body.email;
    // if (req.body.address !== undefined) updateSpecificValueStudent.address = req.body.address;
    // if (req.body.phone !== undefined) updateSpecificValueStudent.phone = req.body.phone;
    // if (req.body.enrollmentDate !== undefined) updateSpecificValueStudent.enrollmentDate = req.body.enrollmentDate;
    // if (req.body.courses !== undefined) updateSpecificValueStudent.courses = req.body.courses;

    // const { name, age, grade, email, address, phone, enrollmentDate, courses } = req.body;

    // if (name !== undefined) updateSpecificValueStudent.name = name;
    // if (age !== undefined) updateSpecificValueStudent.age = age;
    // if (grade !== undefined) updateSpecificValueStudent.grade = grade;
    // if (email !== undefined) updateSpecificValueStudent.email = email;
    // if (address !== undefined) updateSpecificValueStudent.address = address;
    // if (phone !== undefined) updateSpecificValueStudent.phone = phone;
    // if (enrollmentDate !== undefined) updateSpecificValueStudent.enrollmentDate = enrollmentDate;
    // if (courses !== undefined) updateSpecificValueStudent.courses = courses;

    const updates = req.body;

    // for (const key in updates) {
    //   if (
    //     updates.hasOwnProperty(key) &&
    //     updateSpecificValueStudent.hasOwnProperty(key)
    //   ) {
    //     updateSpecificValueStudent[key] = updates[key];
    //   }
    // }

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
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} 200 - Student deleted successfully
 * @returns {Object} 404 - Student not found
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
