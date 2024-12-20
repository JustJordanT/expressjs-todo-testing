const Todo = require("../model/todo.model");

exports.createTodo = async (req, rep, next) => {
  try {
    const createdModel = await Todo.create(req.body);
    rep.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, rep, next) => {
  try {
    const allTodos = await Todo.find({});
    rep.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, rep, next) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (todo) {
      rep.status(200).json(todo);
    } else {
      rep.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.putTodoById = async (req, rep, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (todo) {
      rep.status(204).json(todo);
    } else {
      rep.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteTodoById = async (req, rep, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    if (todo) {
      rep.status(204).json(todo);
    } else {
      rep.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
