import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a new PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Connection string for the database, loaded from environment variables
});

/**
 * The database instance using Drizzle ORM.
 * 
 * @constant {ReturnType<typeof drizzle>} db - The Drizzle ORM instance connected to the PostgreSQL database.
 */
export const db = drizzle(pool);
