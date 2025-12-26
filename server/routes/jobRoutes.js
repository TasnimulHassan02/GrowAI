import express from "express";
import { createJobRequest, getMyJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/auth.js"; 

const router = express.Router();


router.post("/", protect, createJobRequest);


router.get("/my", protect, getMyJobs);

export default router;