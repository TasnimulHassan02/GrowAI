
import bcrypt from "bcryptjs";
import {
  findUserById,
  findUserWithPassword,
  updateUserProfile,
  updateUserPassword,
} from "../models/userModel.js";

import { fetchUserProfile } from "../models/userModel.js";

/* -------- GET PROFILE -------- */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const profile = await fetchUserProfile(userId);

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------- UPDATE PROFILE -------- */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await updateUserProfile(
      req.user.id,
      name,
      email
    );

    res.json(updatedUser);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* -------- CHANGE PASSWORD -------- */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await findUserWithPassword(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUserPassword(req.user.id, hashedPassword);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
