import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      unique: true, // creates a unique index
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // creates a unique index
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Passward is required"],
      minlength: 3, // you can adjust
    },
    role: {
      type: String,
      enum: ["user", "admin"], // restrict roles
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String, // store image URL (e.g., Cloudinary link)
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.password.isModifed()) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.commparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// Prevent model overwrite in dev / hot reload (e.g., Next.js)
export const User = mongoose.models.User || mongoose.model("User", userSchema);
