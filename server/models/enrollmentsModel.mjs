import { pool } from "../db/postgresConnection.mjs";

const enrollmentsModel = {
  createEnrollment: async (enrollmentData) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
            INSERT INTO enrollments (student_id, course_id, grade)
            VALUES ($1, $2, $3)
            RETURNING *;
          `;

      const values = [
        enrollmentData.studentId,
        enrollmentData.courseId,
        enrollmentData.grade,
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
};

export default enrollmentsModel;
