const express = require("express");
const router = express.Router();

const {
  getTasks,
  addTask,
  deleteTask,
  changeCompletedTask,
} = require("../controllers/task.controller");

router.get("/", getTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.get("/:id", changeCompletedTask);

module.exports = router;
