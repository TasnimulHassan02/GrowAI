import {
  createOrGetConversation,
  getUserConversations,
  getConversationById,
  updateConversationLastMessage,
} from "../models/conversationModel.js";
import { createMessage, getConversationMessages, getUnreadMessageCount } from "../models/messageModel.js";
import { findUserById } from "../models/userModel.js";
import { sendNotification } from "./notificationController.js";

// Get all conversations for a user
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const conversations = await getUserConversations(userId);

    res.status(200).json({
      conversations,
      count: conversations.length,
    });
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
};

// Get a specific conversation with messages
export const getConversation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const conversation = await getConversationById(id, userId);
    
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = await getConversationMessages(id, userId, limit, offset);

    res.status(200).json({
      conversation,
      messages,
      count: messages.length,
    });
  } catch (error) {
    console.error("Get conversation error:", error);
    if (error.message === "Unauthorized access to conversation") {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to fetch conversation" });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { conversationId, message, sellerId, datasetId, jobId, subject } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let conversation;
    
    // If conversationId is provided, use it; otherwise create/find conversation
    if (conversationId) {
      conversation = await getConversationById(conversationId, userId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    } else if (sellerId) {
      // Determine buyer and seller
      const buyerId = userId;
      conversation = await createOrGetConversation(buyerId, sellerId, datasetId, jobId, subject);
    } else {
      return res.status(400).json({ message: "Either conversationId or sellerId is required" });
    }

    // Create message
    const newMessage = await createMessage(conversation.id, userId, message.trim());
    
    // Update conversation's last message time
    await updateConversationLastMessage(conversation.id);

    // Determine the recipient
    const recipientId = conversation.buyer_id === userId ? conversation.seller_id : conversation.buyer_id;
    
    // Send notification to recipient
    try {
      await sendNotification(
        recipientId,
        "message",
        "New Message",
        `You have a new message from ${req.user.name}`,
        conversation.id,
        "conversation"
      );
    } catch (notifError) {
      console.error("Failed to send notification:", notifError);
      // Don't fail the message send if notification fails
    }

    // Get sender info
    const sender = await findUserById(userId);

    res.status(201).json({
      message: "Message sent successfully",
      messageData: {
        ...newMessage,
        sender_name: sender.name,
        sender_email: sender.email,
      },
      conversation,
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// Get unread message count
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const count = await getUnreadMessageCount(userId);

    res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error("Get unread message count error:", error);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};

// <StartConversationButton
//   sellerId={seller.id}
//   sellerName={seller.name}
//   datasetId={dataset.id}