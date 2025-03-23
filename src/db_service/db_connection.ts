import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined
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