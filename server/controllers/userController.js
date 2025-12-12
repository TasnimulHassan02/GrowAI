import { query } from '../config/db.js';

export const createUser = async (req, res) => {
    // Logic to create a new user
    res.status(201).send('User created');
};


export const getUsers = async (req, res) => {
    try {
        const result = await query('SELECT * FROM users');
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};