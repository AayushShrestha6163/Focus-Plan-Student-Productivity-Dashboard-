import express from "express";
import Session from "../models/Session";

import authMiddleware, {
  AuthRequest
} from "../middleware/authMiddleware";


const router = express.Router();


// CREATE STUDY SESSION

router.post(
  "/",
  authMiddleware,
  async(req:AuthRequest,res)=>{


    try{

      const session = await Session.create({

        subject:req.body.subject,

        duration:req.body.duration,

        userId:req.user?.id

      });


      res.status(201).json(session);


    }catch(error){

      res.status(500).json({
        message:"Failed to create session"
      });

    }

  }
);



// GET SESSIONS

router.get(
"/",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const sessions = await Session.find({
 userId:req.user?.id
});


res.json(sessions);


}catch(error){

res.status(500).json({
 message:"Failed to fetch sessions"
});

}


});


export default router;