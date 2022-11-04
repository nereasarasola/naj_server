const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/",userController.createNewUser);
router.patch("/cryptEntry/:email",userController.cryptEntry);
router.get("/",userController.allActiveUsers);
router.patch("/moneyLife/:email",userController.updateMoneyandLife);

module.exports = router;