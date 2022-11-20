const Doll = require('../models/dollModel');
const Piece = require('../models/pieceModel');
const piecesData = require('../../assets/data');
require('dotenv').config();

const createDoll = async (newDoll) => {
    try {

        let dollToInsert = new Doll(newDoll);
        const createdDoll = await dollToInsert.save();

        piecesData.dollPieces.map(async (item) => {      
          let dollPiecesToInsert = new Piece(item);      
          const createdDollPiece = await dollPiecesToInsert.save(); 
          const filter = {missionStatus: 'started'};
          const update = {$push: { pieces: createdDollPiece._id }};   
          const doll = await Doll.findOneAndUpdate( filter, update, {
            new: true
         });   
    })
   
    } catch (error) {
        throw error;
    }
};


const getDolls = async()=>{
  const all = Doll.find().populate('pieces');
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
    getDolls,
    patchDoll,
};