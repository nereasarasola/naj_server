const doll = require('../models/dollModel');
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


  const patchDollArray = async()=>{
    const doll = await Doll.find();
    if(!doll){
    return "Error 404"}
    else {
      console.log(dollName);
      const patchedDoll = await Doll.Update({},
        {$push: {pieces: _id}},
        {new:true}
      );
      return patchedDoll;
    }
  }

  const patchDoll= async(changes)=>{
    const piece = await Piece.find();
    if(!piece){
    return "Error 404"}
    else {
      const patchedDoll = await Doll.Update({},
        {$set: changes},
        {new:true}
      );
      return patchedDoll;
    }
  }

module.exports = {
    patchDollArray,
    createDoll,
    allDolls,
    patchDoll,
};