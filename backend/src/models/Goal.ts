import mongoose from "mongoose";


const goalSchema = new mongoose.Schema(
{
 title:{
  type:String,
  required:true
 },


 description:{
  type:String,
  default:""
 },


 targetValue:{
  type:Number,
  required:true
 },


 currentValue:{
  type:Number,
  default:0
 },


 completed:{
  type:Boolean,
  default:false
 },


 userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
 }

},
{
 timestamps:true
});


export default mongoose.model(
 "Goal",
 goalSchema
);