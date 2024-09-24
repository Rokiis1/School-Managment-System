import { pool } from "../db/postgresConnection.mjs";

const usersModel = {
  getUsers: async () => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          user_id, 
          first_name, 
          last_name, 
          email, 
          role, 
          created_at
        FROM 
          users;
      `;
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  },

  getUserByEmail: async (email) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          user_id, 
          first_name, 
          last_name, 
          email, 
          role, 
          created_at
        FROM 
          users
        WHERE 
          email = $1;
      `;
      const values = [email];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  getUserById: async (userId) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM users WHERE user_id = $1;
      `;

      const values = [userId];

      const result = await client.query(query, values);

      return result.rows[0];
    } finally {
      client.release();
    }
  },

  getUserByName: async (name) => {
    const client = await pool.connect();
    try {
      const query = `
      SELECT 
        user_id, 
        first_name, 
        last_name, 
        email, 
        role, 
        created_at
      FROM 
        users
      WHERE 
        first_name ILIKE $1;
      `;
      const values = [`%${name}%`];
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  },

  registerUser: async (user) => {
    const { firstName, lastName, email, password } = user;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertUserQuery = `
        INSERT INTO users (first_name, last_name, email)
        VALUES ($1, $2, $3)
        RETURNING user_id, first_name, last_name, email, role, created_at;
        `;

      const values = [firstName, lastName, email];

      const userResult = await client.query(insertUserQuery, values);

      const registeredUser = userResult.rows[0];

      const insertCredentialsQuery = `
        INSERT INTO user_credentials (user_id, password)
        VALUES ($1, $2);
    `;

      await client.query(insertCredentialsQuery, [
        registeredUser.user_id,
        password,
      ]);

      await client.query("COMMIT");

      return registeredUser;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  deleteUser: async (userId) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const deleteUserQuery = `
        DELETE FROM users
        WHERE user_id = $1
        RETURNING user_id, first_name, last_name, email, role, created_at;
      `;

      const values = [userId];

      const result = await client.query(deleteUserQuery, values);

      await client.query("COMMIT");

      if (result.rowCount === 0) {
        throw new Error("User not found");
      }

      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

export default usersModel;
