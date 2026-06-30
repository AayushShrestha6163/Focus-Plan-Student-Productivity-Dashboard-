import express from "express";
import Task from "../models/Task";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * Create Task
 */
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const task = await Task.create({
  title: req.body.title,
  description: req.body.description,
  priority: req.body.priority,
  schedule: req.body.schedule,
  reminder: req.body.reminder,
  completed: req.body.completed,
  userId: req.user?.id,
});
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

/**
 * Get All Tasks of Logged-in User
 */
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user?.id,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

/**
 * Update Task
 */
router.put("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?.id,
      },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

/**
 * Delete Task
 */
router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;