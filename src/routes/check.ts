import express, { Request, Response } from "express";
import { addMiddleware } from "../middleware/add";

const router = express.Router();

router.post("/api/check", addMiddleware, (req: Request, res: Response) => {});

export { router as checkRouter };
