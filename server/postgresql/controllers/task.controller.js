const pool = require("../db");

const getTasks = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ error: "Can't save this task" });
  }
};

const addTask = async (req, res) => {
  try {
    const id = new Date();
    const { content } = req.body;
    await pool.query("INSERT INTO tasks (id, content) VALUES($1, $2)", [
      id,
      content,
    ]);

    res.json(id);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: "Can't save this task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
    res.status(200).send("The task removed successfully");
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Can't remove this task");
  }
};

const changeCompletedTask = async (req, res) => {
  try {
    const currTask = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    const completed = !currTask.rows[0].completed;
    await pool.query("UPDATE tasks SET completed = $1 WHERE id = $2", [
      completed,
      req.params.id,
    ]);
    res.status(200).send("The task updated successfully");
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ error: "Can't update this task" });
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  changeCompletedTask,
};
