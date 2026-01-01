import express from "express";
import { getLabelers, registerLabeler } from "../controllers/labelerController.js";
import { protect } from "../middleware/auth.js";
import uploadLabelerPhoto from "../middleware/uploadLabelerPhoto.js";
import requireRole from "../middleware/authorization.js";

const router = express.Router();

router.get("/", protect, requireRole("buyer", "seller"), getLabelers);


router.post("/register", protect, requireRole("buyer", "seller"), uploadLabelerPhoto.single("profile_image"),registerLabeler);

export default router;


