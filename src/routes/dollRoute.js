const express = require("express");
const dollController = require("../controllers/dollController");
const router = express.Router();
const accesToken = require("../middleWare/jwtAccesToken");
const refreshToken = require("../middleWare/jwtRefreshToken");

router.post("/",dollController.createNewDoll);
router.get("/",accesToken.authenticateToken,dollController.getDolls);
router.post("/refresh", refreshToken.authenticateRefreshToken);
router.patch("/",dollController.patchDoll);
router.delete("/",dollController.deleteDolls);

module.exports = router;