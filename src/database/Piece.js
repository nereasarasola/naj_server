const Piece = require('../models/pieceModel');
require('dotenv').config();
const {ERROR404} = require('../constants')

const getAllPieces= async()=>{
  const all = Piece.find()
  return all;
}

const deletePiece = async()=>{
  const deletedPiece = Piece.deleteMany()
  return deletedPiece;
}

const onePiece= async(pieceName)=>{
  const one = Piece.findOne({ pieceName: pieceName });
  return one;
}

const patchPiece= async(pieceName,changes)=>{
  const piece = await Piece.findOne({ pieceName: pieceName });
  if(!piece) return ERROR404;
  else {
    const patchedPiece = await Piece.findOneAndUpdate({pieceName:pieceName},
      {$set: changes},
      {new:true}
    );
    return patchedPiece;
  }
}

const patchAllPiecesByName = async() => {
  try {
    const pieces = await Piece.updateMany(
      {},
      {isFound: false});
    return pieces;
  } catch(error) {
    throw error;
  }
}

module.exports = {
  deletePiece,
    onePiece,
    getAllPieces,
    patchPiece,
    patchAllPiecesByName
};