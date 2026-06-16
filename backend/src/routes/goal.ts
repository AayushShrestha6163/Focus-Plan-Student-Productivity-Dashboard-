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

// GET ALL GOALS

router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res) => {

    try {

      const goals = await Goal.find({
        userId: req.user?.id
      });


      res.status(200).json(goals);


    } catch (error) {

      res.status(500).json({
        message:"Failed to fetch goals"
      });

    }

  }
);

// UPDATE GOAL

router.put(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res) => {

    try {

      const goal = await Goal.findOneAndUpdate(
        {
          _id:req.params.id,
          userId:req.user?.id
        },
        req.body,
        {
          new:true
        }
      );


      if(!goal){
        return res.status(404).json({
          message:"Goal not found"
        });
      }


      res.status(200).json(goal);


    } catch(error){

      res.status(500).json({
        message:"Failed to update goal"
      });

    }

  }
);

// DELETE GOAL

router.delete(
  "/:id",
  authMiddleware,
  async (req:AuthRequest,res)=>{


    try{


      const goal = await Goal.findOneAndDelete({
        _id:req.params.id,
        userId:req.user?.id
      });



      if(!goal){
        return res.status(404).json({
          message:"Goal not found"
        });
      }



      res.json({
        message:"Goal deleted successfully"
      });



    }catch(error){

      res.status(500).json({
        message:"Failed to delete goal"
      });

    }


  }
);


export default router;