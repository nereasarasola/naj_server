const express = require("express");
const dollController = require("../controllers/dollController");
const router = express.Router();
const jwt = require("../middleWare/jwtValidation");

router.post("/",dollController.createNewDoll);
router.get("/",jwt.authenticateToken,dollController.getDolls);
router.patch("/",dollController.patchDoll);
router.delete("/",dollController.deleteDolls);

module.exports = router;