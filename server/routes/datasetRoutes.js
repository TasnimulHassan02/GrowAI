import express from "express";
import {
  getDatasets,
  getDatasetDetails,
  searchDatasets
} from "../controllers/datasetController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadDataset } from "../controllers/datasetController.js";


const router = express.Router();

  router.get("/search", searchDatasets);

router.get("/", protect, getDatasets);

router.get("/:id", getDatasetDetails);

router.post("/", protect, upload.fields([
    { name: "file_path", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]), uploadDataset); //require role seller



export default router;
