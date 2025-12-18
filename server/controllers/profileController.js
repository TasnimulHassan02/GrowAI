import { findUserById } from "../models/userModel.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
  console.error("Get profile error:", error);
  res.status(500).json({ message: "Server error" });
}
};
