import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup", signup)

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => {
    res.status(200).json({ message: "Authorized" })
});

// Add this route to get current user's profile
router.get("/me", protectRoute, (req, res) => {
    // Assuming req.user is set by protectRoute middleware
    res.status(200).json({ user: req.user });
});

export default router;