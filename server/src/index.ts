import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user"
import { productRouter } from "./routes/product";

const app = express(); // holds api

app.use(express.json()); // when data comes in, make it json format
app.use(cors()); // just necessary



app.use("/user", userRouter); // for login and register
app.use("/product", productRouter); // to get the products

mongoose.connect(
  "mongodb+srv://samsreither:ecompassword@ecom.z4jyd.mongodb.net/ecom"
).then(() => {console.log('mongoDB connected')}).catch((err) => console.error("mongoDB connection error:", err));

app.listen(3001, () => console.log("server started"));
