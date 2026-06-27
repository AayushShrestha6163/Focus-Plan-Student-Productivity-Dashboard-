import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db";
import authRoutes from './routes/auth';
import taskRoutes from "./routes/Task";
import dashboardRoutes from "./routes/dashboard";
import goalRoutes from "./routes/goal";
import sessionRoutes from "./routes/session";
import notificationRoutes from "./routes/notification";
import analyticsRoutes from "./routes/analytics";
import eventRoutes from "./routes/event";
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/events",eventRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});