const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/",userController.createNewUser);
router.patch("/cryptEntry/:email",userController.cryptEntry);
router.get("/",userController.allActiveUsers);
router.patch("/:email",userController.patchUser);

module.exports = router;