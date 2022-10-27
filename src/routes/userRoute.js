const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/",userController.createNewUser);
router.post("/:email",userController.cryptEntry);
router.get("/",userController.allActiveUsers);

module.exports = router;