var Todo = require("../models/todoModel");

const addTodo = async (req, res) => {
  console.log(req.body);
  try {
    const todo = new Todo({
      title: req.body.title,
      todoList: req.body.todoList,
    });
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = addTodo;
