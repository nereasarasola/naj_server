const { application } = require("express");
const pieceService = require("../services/pieceService");
require("dotenv").config();


const insertPiece = async (req,res) => {
    const {} = req.body;
    const newPiece = {
      pieceName: currentPiece.pieceName,
      image: currentPiece.image,
    };
    try {
      const createdPiece = await pieceService.createNewPiece(newPiece);
      res.send({ data: createdPiece });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        message: "Failed making the req: ",
        data: { error: error?.message || error },
      });
    }
  };
  
const createAllPieces = async (req, res) => {
  array.map((currentPiece) => {
    insertPiece(req,res,currentPiece);
  });
};

const allPieces = async (req, res) => {
  try {
    const allPieces = await piecesService.allPieces();
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
    createAllPieces,
  allPieces,
  patchPiece,
};
