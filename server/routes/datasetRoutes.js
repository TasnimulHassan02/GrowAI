import express from "express";
import {
  getDatasets,
  getDatasetDetails,
} from "../controllers/datasetController.js";
import { protect } from "../middleware/auth.js";


const router = express.Router();

router.get("/", protect, getDatasets);
router.get("/:id", protect, getDatasetDetails);

export default router;
