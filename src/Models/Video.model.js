import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
