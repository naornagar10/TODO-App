import React from "react";
import Task from "./task/Task";
import "./TasksList.css";

const TasksList = (props) => {
  return (
    <div className="TasksList">
      <div className="List">
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            data={task}
            deleteTask={props.deleteTask}
            onClick={props.onTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
