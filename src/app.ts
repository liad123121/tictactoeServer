import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "express-async-errors";
import http from "http";

import { checkRouter } from "./routes/check";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { deleteRouter } from "./routes/delete";
import { DBConnectionError } from "./errors/DBConnectionError";
import { SocketMessages } from "./socket/messages";
import { piecesRouter } from "./routes/pieces";

const app = express();
const httpserver = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use(checkRouter);
app.use(deleteRouter);
app.use(piecesRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tictactoe");
    new SocketMessages().connect(httpserver);
  } catch (error) {
    throw new DBConnectionError("Connection error to DB!");
  }

  httpserver.listen(4000, () => {
    console.log("Server is up on port 4000!");
  });
};

start();
