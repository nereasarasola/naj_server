const express = require("express");
const userController = require("../controllers/userController");
const tokenAuth = require("../middleWare/tokenAuth");
const accesToken = require("../middleWare/jwtAccesToken");
const refreshToken = require("../middleWare/jwtRefreshToken");
const permanent = require("../jwt");
const router = express.Router();

router.get("/", accesToken.authenticateToken,userController.getActiveAcolites);
router.get("/:email",accesToken.authenticateToken, userController.getUserByEmail);
router.post("/refresh", refreshToken.authenticateRefreshToken);
router.post("/permanentToken", permanent.generatePermanentToken)
router.post("/", tokenAuth.verifyIdToken, userController.createNewUser);
router.patch("/cryptEntry/:email",userController.cryptEntry);
router.patch("/update/:email",userController.patchUser);


module.exports = router;