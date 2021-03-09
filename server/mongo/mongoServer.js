const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const TasksRoute = require("./routes/TaskRoute");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/tasks", TasksRoute);

mongoose.connect(
  process.env.DB_CONNECTION_MONGO,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB!");
  }
);

app.listen(5000);
