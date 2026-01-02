import express from "express";
import { protect } from "../middleware/auth.js";

import requireRole from "../middleware/authorization.js";
import {
  getAdminStats,
  updateApprovalStatus,
  getPendingApprovals

} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect);
router.use(requireRole("admin"));

router.get("/stats", getAdminStats);

router.get("/approvals/pending", getPendingApprovals);

router.patch("/:type/:id/:action", updateApprovalStatus);

export default router;