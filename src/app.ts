import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import stationRoutes from "./routes/station.routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);
app.get("/api/health", (_req, res) => { res.json({ status: "ok" }); });

export default app;