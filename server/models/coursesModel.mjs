import { pool } from "../db/postgresConnection.mjs";

const coursesModel = {
  getCoursesByDepartmentId: async (departmentId) => {
    const client = await pool.connect();
    try {
      const query = `
            SELECT * FROM courses
            WHERE department_id = $1;
          `;
      const values = [departmentId];
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  },

  createCourse: async (courseData) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        INSERT INTO courses (course_name, course_description, credits, department_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const values = [
        courseData.courseName,
        courseData.courseDescription,
        courseData.credits,
        courseData.departmentId,
      ];

      const result = await client.query(query, values);

      await client.query("COMMIT");

      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  getCourseById: async (courseId) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM courses
        WHERE course_id = $1;
      `;
      const values = [courseId];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  },
};

export default coursesModel;
