import mongoose from "mongoose";

export interface PieceAttr {
  type: string;
  pos: [number, number];
}

interface PieceDoc extends mongoose.Document {
  type: string;
}

interface PieceModel extends mongoose.Model<PieceDoc> {
  build(attrs: PieceAttr): PieceDoc;
  isWinningRow(pos: number[], type: string): Promise<boolean>;
  isWinningCol(pos: number[], type: string): Promise<boolean>;
  isWinningDiagLeft(pos: number[], type: string): Promise<boolean>;
  isWinningDiagRight(pos: number[], type: string): Promise<boolean>;
}

const pieceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  pos: {
    type: [Number, Number],
    required: true,
  },
});

pieceSchema.statics.build = (attrs: PieceAttr) => {
  return new Piece(attrs);
};

pieceSchema.statics.isWinningRow = async (
  pos: number[],
  type: string
): Promise<boolean> => {
  const [row, col] = pos;
  let piece;
  for (let i = 0; i < 3; i++) {
    piece = await Piece.findOne({ pos: [row, i] });

    if (!piece || piece.type !== type) {
      return false;
    }
  }

  return true;
};

pieceSchema.statics.isWinningCol = async (
  pos: number[],
  type: string
): Promise<boolean> => {
  const [row, col] = pos;
  let piece;
  for (let i = 0; i < 3; i++) {
    piece = await Piece.findOne({ pos: [i, col] });

    if (!piece || piece.type !== type) {
      return false;
    }
  }

  return true;
};

pieceSchema.statics.isWinningDiagLeft = async (
  pos: number[],
  type: string
): Promise<boolean> => {
  let piece;
  for (let i = 0; i < 3; i++) {
    piece = await Piece.findOne({ pos: [i, i] });
    if (!piece || piece.type !== type) {
      return false;
    }
  }

  return true;
};

pieceSchema.statics.isWinningDiagRight = async (
  pos: number[],
  type: string
): Promise<boolean> => {
  let piece,
    col = 2;
  for (let i = 0; i < 3; i++) {
    piece = await Piece.findOne({ pos: [i, col] });
    if (!piece || piece.type !== type) {
      return false;
    }
    col--;
  }

  return true;
};

export const Piece = mongoose.model<PieceDoc, PieceModel>("Piece", pieceSchema);
