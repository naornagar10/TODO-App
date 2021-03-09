import React, { useState } from "react";
import Spinner from "@material-ui/core/CircularProgress";
import "./NewTask.css";

const NewTask = (props) => {
  const [contentTask, setContentTask] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.addTask(contentTask);
      setContentTask("");
    }
  };

  return (
    <div className="NewTask">
      <input
        onKeyPress={handleKeyPress}
        value={contentTask}
        onChange={(event) => setContentTask(event.target.value)}
      ></input>
      <div className="Spinner">
        {props.isLoading ? (
          <Spinner style={{ width: "30px", height: "30px" }} />
        ) : null}
      </div>
    </div>
  );
};

export default NewTask;
