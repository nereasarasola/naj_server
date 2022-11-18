const Piece = require('../models/pieceModel');
require('dotenv').config();

const createPiece = async (newPiece) => {
    try {
   
        let pieceToInsert = new Piece(newPiece);
        const createdPiece = await pieceToInsert.save();
        return createdPiece;
      
    } catch (error) {
        throw error;
    }
};


  const allPieces= async()=>{
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
    if(!piece)
    return "Error 404"
    else {
      console.log(pieceName);
      const patchedPiece = await Piece.findOneAndUpdate({pieceName:pieceName},
        {$set: changes},
        {new:true}
      );
      return patchedPiece;
    }
  }

module.exports = {
  deletePiece,
    onePiece,
    createPiece,
    allPieces,
    patchPiece
};