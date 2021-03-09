const Task = require("../models/TaskModel");

const getTasks = (req, res) =>
  Task.find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err.message);
      res.status(404).send({ error: "can't load the tasks" });
    });

const addTask = (req, res) => {
  const key = new Date().getTime();
  const task = new Task({
    id: key,
    content: req.body.content,
  });

  task
    .save()
    .then(() => res.json(key))
    .catch((err) => {
      console.log(err.message);
      res.status(404).send({ error: "Can't save this task" });
    });
};

const deleteTask = (req, res) => {
  Task.deleteOne()
    .where("id")
    .equals(req.params.id)
    .then(() => {
      res.status(200).send("The task removed successfully");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(404).send("Can't remove this task");
    });
};

const changeCompletedTask = async (req, res) => {
  const task = await Task.findOne().where("id").equals(req.params.id);
  task.completed = !task.completed;
  task
    .save()
    .then(() => res.status(200).send("The task updated successfully"))
    .catch((err) => {
      console.log(err.message);
      res.status(404).send({ error: "Can't update this task" });
    });
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  changeCompletedTask,
};
