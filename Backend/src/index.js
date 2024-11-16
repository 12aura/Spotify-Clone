import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express'
import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(clerkMiddleware()); // Add will auth to req obj => req.auth.userId

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () =>
{
    console.log("Server is running on port " + PORT);
    connectDB();
}
);