import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Router.js";

// setting the dotenv(setting env vars)
dotenv.config();

const app = express();

// getting the port
const port = process.env.PORT || 5000;

// * middle wares
// Enable CORS for all origins
app.use(cors({ origin: true }));
// Parse JSON request bodies(to read json objects)
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

// connecting to the database
mongoose.set("debug", true); // for debuginggit rm --cached .env
mongoose
   .connect(MONGO_URI)
   .then(
      console.log("🌟 you are connected with DB sucessfully!"),

      // listener
      app.listen(port, () => {
         console.log(`running on port ${port}. http://localhost:${port}/`);
      })
   )
   .catch((err) => console.log("some error is there check here:\n\t", err));

//  route middle ware
app.use("/", router);
