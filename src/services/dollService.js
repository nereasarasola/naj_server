const Doll = require("../database/Doll");
const Piece = require("./pieceService")
require('dotenv').config();

const createNewDoll = async (newDoll) => {
    try {
        const createdDoll= Doll.createDoll(newDoll);
        return createdDoll;

    } catch (error) {
        throw error;
    }
};

const getDolls = async() =>{
    try {
        const allDolls = Doll.getDolls();
        return allDolls;
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
        const deletePiece = Piece.deletePiece();
        return deleteDolls;
    } catch (error) {
        throw error;
    }
}


module.exports = {createNewDoll,getDolls,patchDoll,deleteDolls}