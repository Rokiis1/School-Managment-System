import { pool } from "../db/postgresConnection.mjs";

const instructorsModel = {
  getInstructorById: async (instructorId) => {
    const client = await pool.connect();
    try {
      const query = `
            SELECT * FROM instructors
            WHERE instructor_id = $1;
          `;
      const values = [instructorId];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  createInstructor: async (instructorData) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
            INSERT INTO instructors (first_name, last_name, email, phone_number, hire_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
          `;

      const values = [
        instructorData.firstName,
        instructorData.lastName,
        instructorData.email,
        instructorData.phoneNumber,
        instructorData.hireDate,
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

export default instructorsModel;
