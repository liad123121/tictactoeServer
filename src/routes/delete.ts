import express, { Request, Response } from "express";
import { Piece } from "../models/Piece";

const router = express.Router();

router.post("/api/delete", async (req: Request, res: Response) => {
  await Piece.deleteMany({});
  res.send({ status: "Deleted pieces" });
});

export { router as deleteRouter };
