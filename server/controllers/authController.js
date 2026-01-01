import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, updateUser, createGoogleUser, assignRoleToUser } from "../models/userModel.js";
import { validatePassword } from "../utils/validatePassword.js";
import { OAuth2Client } from "google-auth-library";
import pool from "../config/db.js";


const saltRounds = 10;

//register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await createUser(name, email, hashedPassword);
    await assignRoleToUser(user.id, "buyer");

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "No User Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });


    const rolesResult = await pool.query("SELECT r.name FROM user_roles ur JOIN roles r ON r.id = ur.role_id WHERE ur.user_id = $1", [user.id]);
    
    const roles = rolesResult.rows.map(r => r.name);
    
    const token = jwt.sign(
      {
        id: user.id,
        role: roles, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: roles,
      },
    });


  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//google OAuth
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Google credential required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user  = await findUserByEmail(email)

    if (user && !user.google_id) {
      user = await updateUser(googleId, email)
    }

    if (!user) {
      user  = await createGoogleUser(name, email, googleId)
      await assignRoleToUser(user.id, "buyer");

    }
  

  const rolesResult = await pool.query(
  "SELECT r.name FROM user_roles ur JOIN roles r ON r.id = ur.role_id WHERE ur.user_id = $1",
  [user.id]
  );  
  const roles = rolesResult.rows.map(r => r.name);

  


  const token = jwt.sign(
    {
      id: user.id,
      role: roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      role: roles,
    },
  });

  } catch (error) {
    res.status(402).json({ message: "Invalid Google token", error });
  }
};



// import { sendNotification } from "../controllers/notificationController.js";
// sendNotification(
//   21,
//   "purchase",  // type
//   "Purchase Successful",  // title
//   "Your purchase was successful",  // message
//   1,  // relatedId 
//   "dataset"   // relatedType
// ).catch(err => console.error("Notification error:", err));



// import { sendNotification } from "../controllers/notificationController.js";
// sendNotification(
//   19,
//   "upload_approval",  // type
//   "upload_approval Successful",  // title
//   "Your upload_approval was successful",  // message
//   2,  // relatedId 
//   "dataset"   // relatedType
// ).catch(err => console.error("Notification error:", err));


// import { sendNotification } from "../controllers/notificationController.js";
// sendNotification(
//   19,
//   "upload_rejected",  // type
//   "upload_approval rejected",  // title
//   "Your upload_approval was rejected",  // message
//   2,  // relatedId 
//   "dataset"   // relatedType
// ).catch(err => console.error("Notification error:", err));

// import { sendNotification } from "../controllers/notificationController.js";
// sendNotification(
//   17,
//   "message",
//   "New Message",
//   `You have a new message from GrowAI`,
//   12,
//   "conversation"
// );


