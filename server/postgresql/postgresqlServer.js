require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const TasksRoute = require("./routes/TaskRoute");

app.use(cors());
app.use(express.json());
app.use("/tasks", TasksRoute);

app.listen(5000);
