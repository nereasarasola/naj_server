const express = require("express");
const pieceController = require("../controllers/dollController");
const middleWare = require("../middleWare/tokenAuth");
const router = express.Router();

router.post("/",dollController.createNewDoll);
router.get("/",dollController.allDolls);
router.patch("/:",dollController.patchDoll);

module.exports = router;