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
// app.use("/api/payments/create-session", jobRoutes);
app.use("/api/dataset_requests", datasetRequestRoutes);
app.use("/api/requests", datasetRequestRoutes);


export default app;
