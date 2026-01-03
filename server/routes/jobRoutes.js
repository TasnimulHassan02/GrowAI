import express from "express";
import { createJobRequest, getMyJobs, getJobById, getAllLabelingRequests, getMyLabelingTasks  } from "../controllers/jobController.js";
import { protect } from "../middleware/auth.js"; 

const router = express.Router();


router.post("/", protect, createJobRequest);

router.get("/all", getAllLabelingRequests);
router.get("/my", protect, getMyJobs);
router.get("/my-tasks", protect, getMyLabelingTasks);

router.get("/:id", getJobById);



export default router;