import express from "express";
import {
  getDatasets,
  getDatasetDetails,
  searchDatasets,
  downloadDataset
} from "../controllers/datasetController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadDataset } from "../controllers/datasetController.js";
import pool from "../config/db.js";


const router = express.Router();

  router.get("/search", searchDatasets);

router.get("/", protect, getDatasets);

router.get("/:id", getDatasetDetails);

router.post("/", protect, upload.fields([
    { name: "file_path", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]), uploadDataset); //require role seller




// routes/datasetRoutes.js
router.get('/download/:id', downloadDataset);

export default router;
