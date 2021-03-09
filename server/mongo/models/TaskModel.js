const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  id: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
