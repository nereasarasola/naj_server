const express = require("express");
const dollController = require("../controllers/dollController");
const router = express.Router();

router.post("/",dollController.createNewDoll);
router.get("/",dollController.allDolls);
router.patch("/:",dollController.patchDoll);

module.exports = router;