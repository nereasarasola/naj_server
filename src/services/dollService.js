const Map = require("../database/Doll");
require('dotenv').config();

const createNewDoll = async (newDoll) => {
    try {
        const createdDoll= Doll.createDoll(newDoll);
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
const patchDollArray = async(id)=>{
    try {
        const patchDollArray = Doll.patchDollArray(id);
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



module.exports = {createNewDoll,allDolls,patchDollArray,patchDoll}