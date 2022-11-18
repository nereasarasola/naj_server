const express = require("express");
const pieceController = require("../controllers/pieceController");
const router = express.Router();

router.get("/",pieceController.allPieces);
router.patch("/:pieceName",pieceController.patchPiece);

module.exports = router;