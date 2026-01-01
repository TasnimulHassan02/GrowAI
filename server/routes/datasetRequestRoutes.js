import express from "express";
import { submitDatasetRequest, fetchAllRequests } from "../controllers/datasetRequestController.js";
import { protect } from "../middleware/auth.js";
import requireRole from "../middleware/authorization.js"

const router = express.Router();

router.post("/", protect, submitDatasetRequest);

router.get("/", protect, requireRole("seller"), fetchAllRequests);

export default router;
