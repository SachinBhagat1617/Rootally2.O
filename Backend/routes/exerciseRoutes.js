const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");


router.get("/programs", exerciseController.getPrograms);
router.post("/programs/add", exerciseController.saveProgram);
router.delete("/programs/:id", exerciseController.deleteProgram);

module.exports = router;
