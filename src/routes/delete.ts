import express, { Request, Response } from "express";
import { Piece } from "../models/Piece";

const router = express.Router();

router.delete("/api/delete/:room", async (req: Request, res: Response) => {
  await Piece.deleteMany({ room: req.params.room });
  res.send({ status: "Deleted pieces" });
});

export { router as deleteRouter };
