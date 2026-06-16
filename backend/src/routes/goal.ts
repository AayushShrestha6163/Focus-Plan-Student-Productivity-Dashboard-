import express from "express";
import Goal from "../models/Goal";
import authMiddleware, {
  AuthRequest,
} from "../middleware/authMiddleware";

const router = express.Router();


// CREATE GOAL
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res) => {

    try {

      const goal = await Goal.create({
        title: req.body.title,
        description: req.body.description,
        targetValue: req.body.targetValue,
        currentValue: 0,
        userId: req.user?.id,
      });


      res.status(201).json(goal);


    } catch (error) {

      res.status(500).json({
        message: "Failed to create goal"
      });

    }

  }
);



export default router;