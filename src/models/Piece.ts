import mongoose from "mongoose";

interface PieceAttr {
  type: string;
  pos: [[number, number]];
}

interface PieceDoc extends mongoose.Document {
  type: string;
}

interface PieceModel extends mongoose.Model<PieceDoc> {
  build(attrs: PieceAttr): PieceDoc;
}

const pieceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  pos: {
    type: [[Number, Number]],
    required: true,
  },
});

pieceSchema.statics.build = (attrs: PieceAttr) => {
  return new Piece(attrs);
};

export const Piece = mongoose.model<PieceDoc, PieceModel>("Piece", pieceSchema);
