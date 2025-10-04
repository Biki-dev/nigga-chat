import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
dotenv.config();
import { app, server } from "./lib/socket.js";


const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
server.listen(PORT, () => {
    console.log("server is runing")
    connectDB()
});