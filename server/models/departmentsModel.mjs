import { pool } from "../db/postgresConnection.mjs";

const departmentsModel = {
  createDepartment: async (departmentData) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        INSERT INTO departments (department_name, department_head)
        VALUES ($1, $2)
        RETURNING *;
      `;

      const values = [
        departmentData.departmentName,
        departmentData.departmentHead,
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

  getDepartmentById: async (departmentId) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM departments
        WHERE department_id = $1;
      `;
      const values = [departmentId];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  },
};

export default departmentsModel;
