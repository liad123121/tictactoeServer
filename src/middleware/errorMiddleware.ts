import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.sendMessage());
  }

  res.send(err.message);
};
