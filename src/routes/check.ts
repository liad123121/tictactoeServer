import express, { Request, Response } from "express";
import { Piece, PieceAttr } from "../models/Piece";
import { addMiddleware } from "../middleware/add";

const router = express.Router();

router.post(
  "/api/check",
  addMiddleware,
  async (req: Request, res: Response) => {
    const { type, pos, room } = req.body as PieceAttr;

    let isWinning = await Piece.isWinningRow(pos, type, room);
    if (isWinning) {
      return res.send({ status: "win" });
    }

    isWinning = await Piece.isWinningCol(pos, type, room);
    if (isWinning) {
      return res.send({ status: "win" });
    }

    isWinning = await Piece.isWinningDiagLeft(pos, type, room);
    if (isWinning) {
      return res.send({ status: "win" });
    }

    isWinning = await Piece.isWinningDiagRight(pos, type, room);
    if (isWinning) {
      return res.send({ status: "win" });
    }

    const count = await Piece.find({ room });
    if (count.length === 9) {
      return res.send({ status: "draw" });
    }

    res.send({ status: false });
  }
);

export { router as checkRouter };
