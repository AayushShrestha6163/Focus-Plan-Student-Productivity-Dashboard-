import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model(
  "Session",
  sessionSchema
);