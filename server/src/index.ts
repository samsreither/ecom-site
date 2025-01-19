import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user"

const app = express(); // holds api

app.use(express.json()); // when data comes in, make it json format
app.use(cors()); // just necessary



app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://samsreither:ecompassword@ecom.z4jyd.mongodb.net/ecom"
).then(() => {console.log('mongoDB connected')}).catch((err) => console.error("mongoDB connection error:", err));

app.listen(3001, () => console.log("server started"));
