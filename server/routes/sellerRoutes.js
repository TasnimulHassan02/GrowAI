import express from "express";
import { registerSeller } from "../controllers/sellerController.js";
import { protect } from "../middleware/auth.js";
import uploadSellerPhoto from "../middleware/uploadSellerPhoto.js";
import requireRole from "../middleware/authorization.js";

const router = express.Router();

router.post("/register", protect, requireRole("buyer", "labeler"),  uploadSellerPhoto.single("photo"), registerSeller);

export default router;

