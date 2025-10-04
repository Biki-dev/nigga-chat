import express from "express";
import { getAllContacts,getMessagesByUserId,sendMessage,getChatPartners,markMessagesAsRead  } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/contacts",protectRoute, getAllContacts);
router.get("/chats",protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessagesByUserId);
router.post("/send/:id", protectRoute, sendMessage);
router.put("/mark-read/:senderId", protectRoute, markMessagesAsRead);
export default router;