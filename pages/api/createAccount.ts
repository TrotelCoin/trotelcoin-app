import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import bcrypt from "bcrypt";

// Create a new pool using the database connection string from environment variables
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use the environment variable set by Vercel for database connection
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Extract data from the request body
    const { email, username, password } = req.body;

    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the database
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
        [email, username, hashedPassword]
      );

      // Release the client back to the pool
      client.release();

      // If the insertion is successful, send a success response
      if (result.rowCount === 1) {
        return res.status(200).json({
          message: "Account created successfully",
          account: result.rows[0],
        });
      } else {
        return res.status(500).json({ error: "Account creation failed" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Account creation failed" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
