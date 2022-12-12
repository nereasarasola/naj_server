const pieceService = require("../services/pieceService");
require("dotenv").config();
const {STATUS, MESSAGE} = require('../constants');



const getAllPieces = async (req, res) => {
  try {
    const allPieces = await pieceService.getAllPieces();
    res.send({ data: allPieces });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
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
    const patchPiece = await pieceService.patchPiece(pieceName,body);
    res.send({ data: patchPiece });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
};
module.exports = {
  getAllPieces,
  patchPiece,
};
