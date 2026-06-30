import express from "express";
import Task from "../models/Task";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/stats", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const totalTasks = await Task.countDocuments({ userId });

    const completedTasks = await Task.countDocuments({
      userId,
      completed: true,
    });

    const pendingTasks = await Task.countDocuments({
      userId,
      completed: false,
    });

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
});

export default router;