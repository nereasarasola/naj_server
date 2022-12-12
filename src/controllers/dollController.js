const dollService = require("../services/dollService");
require('dotenv').config();
const {STARTED, STATUS, MESSAGE} = require('../constants');



const createNewDoll = async (req, res) => {
     const newDoll = {
       missionStatus: STARTED,
       pieces:  [], 
     };
     try {
       
       const createdDoll = await dollService.createNewDoll(newDoll);
       res.send({  data: createdDoll });

     } catch (error) {
       res.status(error?.status || 500).send({
         status: STATUS,
         message: MESSAGE,
         data: { error: error?.message || error },
       });
     } 

}

const getDolls = async (req, res) => {
  try {
    const allDolls = await dollService.getDolls();
    res.send({  data: allDolls });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}



const patchDoll = async (req, res) => {
  const  {
    body
  } = req;
  try {
    const patchDoll = await dollService.patchDoll(body);
    res.send({  data: patchDoll });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}

const deleteDolls = async (req, res) => {
  try {
    const deleteDolls = await dollService.deleteDolls();
    res.send({  data: deleteDolls });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}


module.exports = {
    deleteDolls,
    createNewDoll,
    getDolls,
    patchDoll
}
