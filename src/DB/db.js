import mongoose from "mongoose";
import { dbName } from "../constants.js";

async function connectDB() {
  try {
    console.log(dbName);
    
    console.log(process.env.MONOGO_URL);
    await mongoose.connect(`${process.env.MONOGO_URL}/${dbName}`);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

export {connectDB}