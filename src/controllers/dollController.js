const { application } = require("express");
const dollService = require("../services/dollService");
require('dotenv').config();



const createNewDoll = async (req, res) => {
    const {} = req.body;
     const newDoll = {
       missionStatus: started,
       pieces:  [],
     };
     try {
       const createdDoll = await dollService.createNewDoll(newDoll);
       res.send({  data: createdDoll });
     } catch (error) {
       res.status(error?.status || 500).send({
         status: "FAILED",
         message: "Failed making the req: ",
         data: { error: error?.message || error },
       });
     } 
}

const allDolls = async (req, res) => {
  try {
    const allDolls = await dollsService.allDolls();
    res.send({  data: allDolls });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
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
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
}
module.exports = {
    createNewDoll,
    allDolls,
    patchDoll
}
