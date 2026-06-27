import express from "express";

import Task from "../models/Task";
import Goal from "../models/Goal";
import Session from "../models/Session";

import authMiddleware, {
  AuthRequest
} from "../middleware/authMiddleware";


const router = express.Router();


// OVERALL ANALYTICS

router.get(
"/summary",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const userId = req.user?.id;


// TASK COUNT

const totalTasks =
await Task.countDocuments({
 userId
});


const completedTasks =
await Task.countDocuments({
 userId,
 completed:true
});



// GOALS

const totalGoals =
await Goal.countDocuments({
 userId
});


const completedGoals =
await Goal.countDocuments({
 userId,
 completed:true
});



// STUDY HOURS

const sessions =
await Session.find({
 userId
});


const totalStudyMinutes =
sessions.reduce(
(sum,item)=> sum + item.duration,
0
);



res.json({

tasks:{
 total:totalTasks,
 completed:completedTasks
},


goals:{
 total:totalGoals,
 completed:completedGoals
},


study:{
 minutes:totalStudyMinutes,
 hours:
 Math.round(totalStudyMinutes / 60)
}

});


}catch(error){

res.status(500).json({
message:"Analytics failed"
});

}


});





// STUDY LINE GRAPH DATA

router.get(
"/study-progress",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const sessions =
await Session.find({
userId:req.user?.id
})
.sort({
createdAt:1
});



const data =
sessions.map(item=>({

date:
item.createdAt,

duration:
item.duration,

subject:
item.subject

}));



res.json(data);



}catch(error){

res.status(500).json({
message:"Failed to get progress"
});

}


});



export default router;