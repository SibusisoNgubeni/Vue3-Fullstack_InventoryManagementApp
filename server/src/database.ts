import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a new pool instance to manage connections to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Connects to the PostgreSQL database.
 * 
 * This function attempts to establish a connection to the database 
 * using the connection pool. If the connection is successful, it logs
 * a message indicating the connection status. If it fails, it logs
 * the error and exits the process.
 * 
 * @async
 * @function connectToDatabase
 * @throws {Error} Throws an error if the connection to the database fails.
 */
export const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); 
  }
};
