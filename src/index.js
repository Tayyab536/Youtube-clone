import { connectDB } from "./DB/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || "4000", () => {
      console.log("app is working.....Port "+process.env.PORT);
    });
  })
  .catch((e) => {
    throw e;
  });
