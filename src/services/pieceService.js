const Piece = require("../database/Piece");
require('dotenv').config();


const getAllPieces = async() =>{
    try {
        const allPieces = Piece.getAllPieces();
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

const patchAllPiecesByName = async() => {
    try {
        const pieces = Piece.patchAllPiecesByName();
        return pieces;
    } catch(error) {
        throw error;
    }
}

const deletePiece = async() =>{
    try {
        const deletePiece = Piece.deletePiece()
        return deletePiece;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPieces,
    patchPiece,
    patchAllPiecesByName,
    deletePiece,
}