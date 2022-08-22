import express, { Request, Response } from "express";
import { Piece, PieceAttr } from "../models/Piece";
import { addMiddleware } from "../middleware/add";

const router = express.Router();

router.post(
  "/api/check",
  addMiddleware,
  async (req: Request, res: Response) => {
    const { type, pos } = req.body as PieceAttr;

    let isWinning = await Piece.isWinningRow(pos, type);
    if (isWinning) {
      return res.send(isWinning);
    }

    isWinning = await Piece.isWinningCol(pos, type);
    if (isWinning) {
      return res.send(isWinning);
    }

    isWinning = await Piece.isWinningDiagLeft(pos, type);
    if (isWinning) {
      return res.send(isWinning);
    }

    isWinning = await Piece.isWinningDiagRight(pos, type);
    if (isWinning) {
      return res.send(isWinning);
    }

    res.send(false);
  }
);

export { router as checkRouter };
