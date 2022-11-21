const Piece = require("../database/Piece");
const Doll = require("../database/Doll");
require('dotenv').config();
const data = require("../../assets/data")


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
    deletePiece,
}