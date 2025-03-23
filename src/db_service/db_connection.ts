import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined
});

export async function testConnection() {
    try {
        await pool.getConnection();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
    }
}

export default pool;