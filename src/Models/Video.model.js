import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoName: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublish: {
      type: Boolean,
      default: false,
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
