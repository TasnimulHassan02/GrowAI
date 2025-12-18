import express from "express";
import { getLabelers } from "../controllers/labelerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getLabelers);

export default router;
