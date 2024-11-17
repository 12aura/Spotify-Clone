import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express'
import { connectDB } from "./lib/db.js";
import fileUpload from "express-fileupload";
import path from "path";

import { initializeSocket } from "./lib/socket.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import { createServer } from "http";

dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer)

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));
app.use(express.json());

app.use(clerkMiddleware()); // Will add auth to req obj => req.auth.userId
app.use(fileUpload(
    {
        useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
    }
));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

app.use((err ,req, res, next) => 
{
    res.status(500).json({message: err.message});
});

httpServer.listen(PORT, () =>
{
    console.log("Server is running on port " + PORT);
    connectDB();
}
);

