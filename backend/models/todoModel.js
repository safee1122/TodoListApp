const mongoose = require("mongoose");

const todoScehma = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todoList: [
    {
      name: String,
      default: "",
    },
  ],
});

const Todo = mongoose.model("Todo", todoScehma);
module.exports = Todo;
