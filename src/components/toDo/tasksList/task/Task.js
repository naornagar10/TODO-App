import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import "./Task.css";

const Task = (props) => {
  const taskStyle = {
    border: "1px solid #eee",
    boxShadow: "0 2px 3px #ccc",
    width: "100%",
    marginTop: "10px",
    position: "relative",
    display: "flex",
    cursor: "pointer",
  };

  const deleteStyle = {
    width: "40px",
    padding: "20px 0",
    textAlign: "center",
    borderRadius: "200px",
    display: "flex",
  };

  if (props.data.completed) {
    taskStyle.backgroundColor = "rgba(0, 0, 0, 0.85)";
    deleteStyle.color = "white";
  }

  return (
    <div style={taskStyle}>
      <div className="Text" onClick={() => props.onClick(props.data.id)}>
        <span>{props.data.content}</span>
      </div>
      <div style={deleteStyle} onClick={() => props.deleteTask(props.data.id)}>
        <DeleteIcon />
      </div>
      {props.data.completed ? (
        <div className="Completed" onClick={() => props.onClick(props.data.id)}>
          <span>Completed</span>
          <DoneIcon />
        </div>
      ) : null}
    </div>
  );
};

export default Task;
