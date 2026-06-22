import express from "express";
import Notification from "../models/Notification";

import authMiddleware, {
  AuthRequest
} from "../middleware/authMiddleware";


const router = express.Router();


// CREATE NOTIFICATION

router.post(
"/",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const notification = await Notification.create({

title:req.body.title,

message:req.body.message,

type:req.body.type,

userId:req.user?.id

});


res.status(201).json(notification);



}catch(error){

res.status(500).json({
message:"Failed to create notification"
});

}


});



// GET USER NOTIFICATIONS

router.get(
"/",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const notifications =
await Notification.find({
userId:req.user?.id
})
.sort({
createdAt:-1
});


res.json(notifications);



}catch(error){

res.status(500).json({
message:"Failed to fetch notifications"
});

}


});




// MARK AS READ

router.put(
"/:id/read",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const notification =
await Notification.findOneAndUpdate(

{
_id:req.params.id,
userId:req.user?.id
},

{
read:true
},

{
new:true
}

);


res.json(notification);



}catch(error){

res.status(500).json({
message:"Failed to update notification"
});

}


});



// DELETE NOTIFICATION

router.delete(
"/:id",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


await Notification.findOneAndDelete({

_id:req.params.id,

userId:req.user?.id

});


res.json({

message:"Notification deleted"

});



}catch(error){

res.status(500).json({
message:"Failed to delete notification"
});

}


});


export default router;