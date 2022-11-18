const Piece = require("../database/Piece");
const Doll = require("../database/Doll");
require('dotenv').config();
const data = require("../../assets/data")


const createAllPieces = async () => {
    try{
        let names =  []
    data.dollPieces.map((currentPiece) => {

        const newPiece = {
            pieceName:currentPiece.pieceName,
            image:currentPiece.image,
            isFound: false,
            position: { 
              latitude: null,
              longitude: null,
              latitudeDelta: null,
              LongitudeDelta: null,
            }
            };

        const createdPiece = Piece.createPiece(newPiece);
        Doll.patchDollArray(currentPiece.pieceName)
    });
    
} catch (error) {
        throw error;
  };

}
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

const deletePiece = async() =>{
    try {
        const deletePiece = Piece.deletePiece()
        return deletePiece;
    } catch (error) {
        throw error;
    }
}

module.exports = {allPieces,patchPiece,createAllPieces,deletePiece}