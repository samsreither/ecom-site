import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express(); // holds api

app.use(express.json()); // when data comes in, make it json format
app.use(cors()); // just necessary

mongoose.connect(
  "mongodb+srv://samsreither:ecompassword@ecom.z4jyd.mongodb.net/ecom"
);

app.listen(3001, () => console.log("server started"));
