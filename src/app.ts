import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { checkRouter } from "./routes/check";

const app = express();

app.use(express.json());
app.use(cors());

app.use(checkRouter);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tictactoe");
  } catch (error) {
    throw new Error("Bad connection to DB");
  }

  app.listen(4000, () => {
    console.log("Server is up on port 4000!");
  });
};

start();
