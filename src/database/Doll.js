const Doll = require('../models/dollModel');
const Piece = require('../models/pieceModel');
const piecesData = require('../../assets/data');
require('dotenv').config();
const {STARTED, ERROR404} = require('../constants');

const createDoll = async (newDoll) => {
    try {

        let dollToInsert = new Doll(newDoll);
        const createdDoll = await dollToInsert.save();

        piecesData.dollPieces.map(async (item) => {      
          let dollPiecesToInsert = new Piece(item);      
          const createdDollPiece = await dollPiecesToInsert.save(); 
          const filter = {missionStatus: STARTED};
          const update = {$push: { pieces: createdDollPiece._id }};   
          const doll = await Doll.findOneAndUpdate( filter, update, {
            new: true
         });   
    })

    return createdDoll;
   
    } catch (error) {
        throw error;
    }
};


const getDolls = async()=> {
  const doll = Doll.findOne({name: 'Doll'});
<<<<<<< HEAD
  if (!doll) {return 'Error 404'}
=======
  if (!doll) {return ERROR404}
>>>>>>> 7da30ebcfc3adf7d9a7faac23b09489e753b4268
  else {
    const result = Doll.find().populate('pieces');
    return result;
  }
}

const deleteDolls = async()=>{
  const deletedDoll = Doll.deleteMany()
  return deletedDoll;
}

const patchDollArray = async(pieceNames)=>{
  const doll = await Doll.find();
  if(!doll){
  return ERROR404}
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
  return ERROR404}
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