const express = require("express");
const userController = require("../controllers/userController");
const middleWare = require("../middleWare/tokenAuth");
const router = express.Router();

router.get("/", userController.getActiveAcolites);
router.get("/:email", userController.getUserByEmail);
router.post("/", middleWare.verifyIdToken, userController.createNewUser);
router.patch("/cryptEntry/:email",userController.cryptEntry);
router.patch("/update/:email",userController.patchUser);

module.exports = router;