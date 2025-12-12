import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

// POST /api/auth/register
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
    // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }
  try {
    // Check email already exists
    const checkResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );
    const newUser = result.rows[0];
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    return res.status(500).json({
      message: "Server error",
      // Send error details in development
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
    });
  }
};


// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};


// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Validation input
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }
  try {
    // Find user
    const result = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const user = result.rows[0];
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET,          
      { expiresIn: '7d' }               
    );
    // Success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};


// GET /api/profile/me 
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};