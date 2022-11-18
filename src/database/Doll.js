const Doll = require('../models/dollModel');
const Piece = require('../models/pieceModel');
require('dotenv').config();

const createDoll = async (newDoll) => {
    try {
   
        let dollToInsert = new Doll(newDoll);
        const createdDoll = await dollToInsert.save();
        return createdDoll;
      
    } catch (error) {
        throw error;
    }
};


  const allDolls = async()=>{
    const all = Doll.find()
    return all;
  }

  const deleteDolls = async()=>{
    const deletedDoll = Doll.deleteMany()
    return deletedDoll;
  }

  const patchDollArray = async(pieceNames)=>{
    const doll = await Doll.find();
    if(!doll){
    return "Error 404"}
    else {
      const patchedDoll = await Doll.update({},
        {$push: {pieces: pieceNames}},
        {new:true}
      );
      return patchedDoll;
    }
  }

  const patchDoll= async(changes)=>{

    const doll = await Doll.find();
    if(!doll){
    return "Error 404"}
    else {
      const patchedDoll = await Doll.findOneAndUpdate({},
        {$set: changes},
        {new:true}
      );
      return patchedDoll;
    }
  }



module.exports = {
    deleteDolls,
    patchDollArray,
    createDoll,
    allDolls,
    patchDoll,
};