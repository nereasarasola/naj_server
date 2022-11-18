const Doll = require("../database/Doll");
const Piece = require("./pieceService")
require('dotenv').config();

const createNewDoll = async (newDoll) => {
    try {
        const createdDoll= Doll.createDoll(newDoll);
        Piece.createAllPieces()


        return createdDoll;
    } catch (error) {
        throw error;
    }
};

const allDolls = async() =>{
    try {
        const allDolls = Doll.allDolls();
        return allDolls;
    } catch (error) {
        throw error;
    }
}
const patchDollArray = async(pieceName)=>{
    try {
        const patchDollArray = Doll.patchDollArray(pieceName);
        return patchDollArray;
    } catch (error) {
        throw error;
    }
}

const patchDoll = async(changes)=>{
    try {
        const patchDoll = Doll.patchDoll(changes);
        return patchDoll;
    } catch (error) {
        throw error;
    }
}

const deleteDolls = async() =>{
    try {
        const deleteDolls = Doll.deleteDolls();
        const deletePiece = Piece.deletePiece()
        return deleteDolls;
    } catch (error) {
        throw error;
    }
}

module.exports = {createNewDoll,allDolls,patchDollArray,patchDoll,deleteDolls}