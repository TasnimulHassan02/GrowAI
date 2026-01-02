import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
