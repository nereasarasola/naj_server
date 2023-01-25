const express = require("express");
const userController = require("../controllers/userController");
const tokenAuth = require("../middleWare/tokenAuth");
const jwt = require("../middleWare/jwtValidation");
const router = express.Router();

router.get("/", jwt.authenticateToken,userController.getActiveAcolites);
router.get("/:email",jwt.authenticateToken, userController.getUserByEmail);
router.post("/", tokenAuth.verifyIdToken, userController.createNewUser);
router.patch("/cryptEntry/:email",userController.cryptEntry);
router.patch("/update/:email",userController.patchUser);

module.exports = router;