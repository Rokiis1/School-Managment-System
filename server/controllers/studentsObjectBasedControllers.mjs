import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const studentsFilePath = path.join(__dirname, "../models/students.json");

const studentsController = {
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
};

export default studentsController;
