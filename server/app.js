import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import labelerRoutes from "./routes/labelerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import datasetRequestRoutes from "./routes/datasetRequestRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import sellerRoutes  from "./routes/sellerRoutes.js"
import path from "path";
import adminRoutes from "./routes/adminRoutes.js"
import datasetRoutes from "./routes/datasetRoutes.js"



const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/labelers", labelerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/dataset_requests", datasetRequestRoutes);
app.use("/api/requests", datasetRequestRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/admin", adminRoutes)
app.use("/api/datasets", datasetRoutes);



export default app;
