import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js";
import { upload } from "../Middleware/multer.Middleware.js";
const router = Router();
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

export default router;
