const express = require("express");
const pieceController = require("../controllers/pieceController");
const router = express.Router();

router.get("/",pieceController.getAllPieces);
router.patch("/update/:pieceName",pieceController.patchPiece);
router.patch("/update/", pieceController.patchAllPiecesByName);


module.exports = router;