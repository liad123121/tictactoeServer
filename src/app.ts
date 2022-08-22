import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "express-async-errors";
import http from "http";
import { Server } from "socket.io";

import { checkRouter } from "./routes/check";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { deleteRouter } from "./routes/delete";
import { DBConnectionError } from "./errors/DBConnectionError";

const app = express();
const io = new Server(http.createServer(app));

app.use(express.json());
app.use(cors());

app.use(checkRouter);
app.use(deleteRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tictactoe");

    io.on("connection", (socket) => {
      console.log(`User connected ${socket.id}`);
    });
  } catch (error) {
    throw new DBConnectionError("Connection error to DB!");
  }

  app.listen(4000, () => {
    console.log("Server is up on port 4000!");
  });
};

start();
