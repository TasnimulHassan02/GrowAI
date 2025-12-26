import express from "express";
import {
  getConversations,
  getConversation,
  sendMessage,
  getUnreadCount,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/conversations", protect, getConversations);
router.get("/conversations/:id", protect, getConversation);
router.post("/send", protect, sendMessage);
router.get("/unread-count", protect, getUnreadCount);

export default router;

