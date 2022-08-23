import express, { Request, Response } from "express";
import { Piece } from "../models/Piece";

const router = express.Router();

router.get("/api/pieces/:room", async (req: Request, res: Response) => {
  const pieces = await Piece.find({ room: req.params.room });
  res.send(pieces);
});

export { router as piecesRouter };
