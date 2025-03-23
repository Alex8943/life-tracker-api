import express from 'express';
import pool from '../db_service/db_connection';
const router = express.Router();
router.use(express.json());

router.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
})

export const getUsers = async () => {
    
    const query = 'SELECT * FROM users';
    const [rows] = await pool
        .execute(query);
    return rows;
    
}

export default router;