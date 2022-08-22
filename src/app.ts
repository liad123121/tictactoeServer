import express from "express";
import cors from "cors";
import { checkRouter } from "./routes/check";

const app = express();

app.use(express.json());
app.use(cors());

app.use(checkRouter);

app.listen(4000, () => {
  console.log("Server is up on port 4000!");
});
