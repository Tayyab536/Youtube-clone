import {connectDB}  from "./DB/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });


connectDB();
