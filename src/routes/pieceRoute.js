const express = require("express");
const pieceController = require("../controllers/pieceController");
const middleWare = require("../middleWare/tokenAuth");
const router = express.Router();

router.post("/:pieceName",pieceController.createNewPiece);
router.get("/",pieceController.allPieces);
router.patch("/:pieceName",pieceController.patcPiece);

module.exports = router;