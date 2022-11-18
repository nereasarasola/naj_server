const { application } = require("express");
const pieceService = require("../services/pieceService");
const dollService = require("../services/dollService")
require("dotenv").config();


const insertPiece = async (req,res,currentPiece) => {
    const {} = req.body;
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
    try {
      const piecesArray = await pieceService.createNewPiece(newPiece);
      console.log(piecesArray)

      piecesArray.map((currentPiece) => {
        console.log(currentPiece)
        dollService.patchDollArray(currentPiece)

      })
      
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        message: "Failed making the req: ",
        data: { error: error?.message || error },
      });
    }
  };



const allPieces = async (req, res) => {
  try {
    const allPieces = await pieceService.allPieces();
    res.send({ data: allPieces });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

const patchPiece = async (req, res) => {
  const {
    body,
    params: { pieceName },
  } = req;
  try {
    const patchPiece = await pieceService.patchPiece(pieceName, body);
    res.send({ data: patchPiece });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};
module.exports = {
  insertPiece,
  allPieces,
  patchPiece,
};
