const express = require("express");
const userController = require("../controllers/userController");
const middleWare = require("../middleWare/tokenAuth");
const router = express.Router();

router.post("/",middleWare.verify,userController.createNewUser);
router.patch("/cryptEntry/:email",userController.cryptEntry);
router.get("/",userController.allActiveUsers);
router.patch("/:email",userController.patchUser);

module.exports = router;