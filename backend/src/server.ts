import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db";
import authRoutes from './routes/auth';
import taskRoutes from "./routes/Task";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});