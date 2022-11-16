const Map = require("../database/Piece");
require('dotenv').config();

const createNewPiece = async (newPiece) => {
    try {
        const createdPiece = Piece.createPiece( newPiece);
        return createdPiece;
    } catch (error) {
        throw error;
    }
};

const allPieces = async() =>{
    try {
        const allPieces = Piece.allPieces();
        return allPieces;
    } catch (error) {
        throw error;
    }
}
const patchPiece = async(pieceName,changes)=>{
    try {
        const patchPiece = Piece.patchPiece(pieceName,changes);
        return patchPiece;
    } catch (error) {
        throw error;
    }
}


module.exports = {createNewPiece,allPieces,patchPiece}