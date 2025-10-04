import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id:userToChatId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { id: receiverId } = req.params;
        const { text, image } = req.body;

        if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

        let ImageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            ImageUrl = uploadResponse.secure_url;
        }       

        const newMessage = new Message({
            senderId,
            receiverId, 
            text,
            image: ImageUrl
        });
        await newMessage.save();

        // Notify the receiver via socket
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Emit unread count update to receiver
        if (receiverSocketId) {
            const unreadCount = await Message.countDocuments({
                senderId: senderId,
                receiverId: receiverId,
                isRead: false
            });
            io.to(receiverSocketId).emit("unreadCountUpdate", {
                senderId: senderId,
                unreadCount: unreadCount
            });
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartnersIds = [...new Set(messages.map(msg =>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        ))];

        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");

        // Add unread count for each chat partner
        const chatPartnersWithUnreadCount = await Promise.all(
            chatPartners.map(async (partner) => {
                const unreadCount = await Message.countDocuments({
                    senderId: partner._id,
                    receiverId: loggedInUserId,
                    isRead: false
                });
                
                return {
                    ...partner.toObject(),
                    unreadCount
                };
            })
        );

        res.status(200).json(chatPartnersWithUnreadCount); 
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const markMessagesAsRead = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { senderId } = req.params;

        // Mark all messages from this sender as read
        await Message.updateMany(
            {
                senderId: senderId,
                receiverId: loggedInUserId,
                isRead: false
            },
            {
                isRead: true
            }
        );

        res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};