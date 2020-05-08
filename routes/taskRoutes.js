const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/",taskController.index);
router.get("/create",taskController.create);
router.get("/:id",taskController.detail);
router.get("/modify/:id",taskController.modify);
router.post("/save",taskController.save);
router.put("/upload/:id",taskController.upload);
router.delete("/delete/:id",taskController.delete);

module.exports = router