import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import TasksList from "./tasksList/TasksList";
import NewTask from "./newTask/NewTask";
import axios from "../../axios-todo";
import Spinner from "@material-ui/core/CircularProgress";
import "./ToDo.css";

const ToDo = () => {
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAct, setIsLoadingAct] = useState(false);

  const handleAddTask = (task) => {
    setIsLoadingAct(true);
    axios
      .post("tasks", {
        content: task,
      })
      .then((res) => {
        const list = [...tasksList];
        list.push({ id: res.data, content: task, completed: false });
        setTasksList(list);
        setIsLoadingAct(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingAct(false);
      });
  };

  const handleDeleteTask = (id) => {
    setIsLoadingAct(true);
    axios
      .delete("tasks/" + id)
      .then((res) => {
        console.log(res.data);
        const list = [...tasksList];
        const indexToDelete = list.findIndex((task) => task.id === id);
        list.splice(indexToDelete, 1);
        setTasksList(list);
        setIsLoadingAct(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingAct(false);
      });
  };

  const completeToggle = (id) => {
    setIsLoadingAct(true);
    axios
      .get("tasks/" + id)
      .then((res) => {
        console.log(res.data);
        const list = [...tasksList];
        const toggledIndex = list.findIndex((task) => task.id === id);
        list[toggledIndex].completed = !list[toggledIndex].completed;
        setTasksList(list);
        setIsLoadingAct(false);
      })
      .catch(() => setIsLoadingAct(false));
  };

  useEffect(() => {
    axios
      .get("tasks")
      .then((res) => {
        setTasksList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="ToDo">
      <Header />
      {isLoading ? (
        <div
          style={{
            height: "80%",
            textAlign: "center",
            borderBottom: "1px solid black",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <TasksList
          tasks={tasksList}
          deleteTask={handleDeleteTask}
          onTaskClick={completeToggle}
        />
      )}
      <NewTask addTask={handleAddTask} isLoading={isLoadingAct} />
    </div>
  );
};

export default ToDo;
