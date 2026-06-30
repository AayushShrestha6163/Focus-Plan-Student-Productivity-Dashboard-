import express from "express";

import Event from "../models/Event";

import authMiddleware,{
    AuthRequest
} from "../middleware/authMiddleware";


const router = express.Router();



// CREATE EVENT

router.post(
"/",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const event = await Event.create({

title:req.body.title,

description:req.body.description,

startDate:req.body.startDate,

endDate:req.body.endDate,

type:req.body.type,

userId:req.user?.id

});


res.status(201).json(event);



}catch(error){

res.status(500).json({
message:"Failed to create event"
});

}


});





// GET EVENTS

router.get(
"/",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const events =
await Event.find({
userId:req.user?.id
})
.sort({
startDate:1
});


res.json(events);



}catch(error){

res.status(500).json({
message:"Failed to fetch events"
});

}


});






// UPDATE EVENT


router.put(
"/:id",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


const event =
await Event.findOneAndUpdate(

{
_id:req.params.id,
userId:req.user?.id
},

req.body,

{
new:true
}

);


res.json(event);



}catch(error){

res.status(500).json({
message:"Failed to update event"
});

}


});





// DELETE EVENT


router.delete(
"/:id",
authMiddleware,
async(req:AuthRequest,res)=>{


try{


await Event.findOneAndDelete({

_id:req.params.id,

userId:req.user?.id

});


res.json({
message:"Event deleted"
});



}catch(error){

res.status(500).json({
message:"Failed to delete event"
});

}


});



export default router;