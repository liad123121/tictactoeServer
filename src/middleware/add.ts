import { Request, Response, NextFunction } from "express";
import { Piece, PieceAttr } from "../models/Piece";

const addMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, pos } = req.body as PieceAttr;
  const isExists = await Piece.findOne({ pos });

  if (isExists) {
    throw new Error("There's already a piece in this place");
  }

  const piece = Piece.build({
    type,
    pos,
  });

  await piece.save();

  next();
};

export { addMiddleware };
