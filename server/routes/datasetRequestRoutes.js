import express from "express";
import { submitDatasetRequest, fetchAllRequests } from "../controllers/datasetRequestController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, submitDatasetRequest);

router.get("/", fetchAllRequests);

export default router;
