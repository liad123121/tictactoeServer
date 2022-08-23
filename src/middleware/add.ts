import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/ValidationError";
import { Piece, PieceAttr } from "../models/Piece";

const addMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, pos, room } = req.body as PieceAttr;
  const isExists = await Piece.findOne({ pos });

  if (isExists) {
    throw new ValidationError("There's already a piece in this place");
  }

  const piece = Piece.build({
    type,
    pos,
    room,
  });

  await piece.save();

  next();
};

export { addMiddleware };
