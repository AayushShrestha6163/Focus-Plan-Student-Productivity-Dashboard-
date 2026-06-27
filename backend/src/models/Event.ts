import mongoose from "mongoose";


const eventSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },


    startDate:{
        type:Date,
        required:true
    },


    endDate:{
        type:Date
    },


    type:{
        type:String,
        enum:[
            "task",
            "exam",
            "study",
            "meeting",
            "other"
        ],
        default:"other"
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
    "Event",
    eventSchema
);